"""
Profile management endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.responses import JSONResponse
from supabase import Client
from uuid import UUID
from typing import List
from datetime import date, datetime

from app.dependencies import get_supabase, get_current_user, get_supabase_admin
from app.models.profile import ProfileResponse, ProfileUpdate, ProfileCreate, ProfileCompletionResponse

router = APIRouter()


def serialize_dates(payload: dict) -> dict:
    """
    Convert date and datetime objects to ISO string format for JSON serialization
    """
    serialized = {}
    for k, v in payload.items():
        if isinstance(v, (date, datetime)):
            serialized[k] = v.isoformat()  # e.g. "2002-04-23"
        elif isinstance(v, dict):
            serialized[k] = serialize_dates(v)  # Recursively serialize nested dicts
        elif isinstance(v, list):
            serialized[k] = [serialize_dates(item) if isinstance(item, dict) else item for item in v]
        else:
            serialized[k] = v
    return serialized


def calculate_completion_percentage(profile_data: dict) -> int:
    """
    Calculate profile completion percentage based on PROFILE CREATION.MD spec

    Sections:
    A. Personal Information (6 fields)
    B. Academic Background (5 fields)
    C. Language & Tests (2 main fields)
    D. Contact & Preferences (5 fields)
    """
    total_fields = 0
    completed_fields = 0

    # A. Personal Information (required fields)
    personal_fields = ['first_name', 'last_name', 'date_of_birth', 'gender', 'nationality', 'country_of_residence']
    for field in personal_fields:
        total_fields += 1
        if profile_data.get(field):
            completed_fields += 1

    # B. Academic Background (can use either simple or complex format)
    # If education array exists and has data, use that
    if profile_data.get('education') and len(profile_data['education']) > 0:
        edu = profile_data['education'][0]  # Check first education entry
        academic_fields = ['level', 'fieldOfStudy', 'institution', 'graduationYear', 'score']
        for field in academic_fields:
            total_fields += 1
            if edu.get(field):
                completed_fields += 1
    else:
        # Fallback to simple fields
        academic_fields = ['highest_qualification', 'field_of_study', 'institution_name', 'graduation_year', 'cgpa_percentage']
        for field in academic_fields:
            total_fields += 1
            if profile_data.get(field):
                completed_fields += 1

    # C. Language & Tests (English and German)
    language_fields = ['english_test_type', 'german_level']
    for field in language_fields:
        total_fields += 1
        if profile_data.get(field):
            completed_fields += 1

    # D. Contact & Preferences
    contact_fields = ['email', 'phone', 'preferred_intake', 'study_level', 'preferred_program']
    for field in contact_fields:
        total_fields += 1
        if profile_data.get(field) or profile_data.get('mobile_number' if field == 'phone' else field):
            completed_fields += 1

    if total_fields == 0:
        return 0

    return int((completed_fields / total_fields) * 100)


@router.get("/me")
async def get_my_profile(
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Get current user's profile"""
    print("[DEBUG] GET_PROFILE: get_my_profile called")
    
    # Use admin client to bypass RLS
    supabase_admin = get_supabase_admin()
    
    db_response = supabase_admin.table("profiles").select("*").eq("user_id", str(current_user.id)).execute()

    if not db_response.data:
        # Create empty profile if doesn't exist (using admin client to bypass RLS)
        new_profile = {
            "user_id": str(current_user.id),
            "completion_percentage": 0
        }
        # Serialize dates before sending to Supabase
        serialized_profile = serialize_dates(new_profile)
        created = supabase_admin.table("profiles").insert(serialized_profile).execute()
        profile = ProfileResponse(**created.data[0])
    else:
        profile = ProfileResponse(**db_response.data[0])

    print("[DEBUG] GET_PROFILE: Returning profile")
    # Return profile wrapped in object for consistent API response format
    return {"profile": profile.model_dump()}


@router.put("/me")
async def update_my_profile(
    profile_update: ProfileUpdate,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Update current user's profile"""
    print(f"[DEBUG] UPDATE_PROFILE: update_my_profile called for user: {current_user.id}")
    
    # Use admin client to bypass RLS
    supabase_admin = get_supabase_admin()
    
    update_data = profile_update.dict(exclude_unset=True, exclude_none=True)

    # Clean empty strings from update_data
    cleaned_data = {}
    for key, value in update_data.items():
        if isinstance(value, str) and value.strip() == '':
            continue  # Skip empty strings
        cleaned_data[key] = value

    update_data = cleaned_data
    print(f"[DEBUG] update_data (after cleaning): {update_data}")

    if not update_data:
        print("[DEBUG] No update data, returning current profile")
        return await get_my_profile(current_user, supabase)

    # Get current profile (using admin client)
    print(f"[DEBUG] Checking if profile exists for user: {current_user.id}")
    response_data = supabase_admin.table("profiles").select("*").eq("user_id", str(current_user.id)).execute()
    print(f"[DEBUG] Profile query response: {response_data.data}")

    if not response_data.data:
        print("[DEBUG] Profile not found, creating new profile")
        # Create profile if it doesn't exist
        new_profile = {
            "user_id": str(current_user.id),
            "completion_percentage": 0,
            **update_data
        }
        # Recalculate completion percentage
        new_profile['completion_percentage'] = calculate_completion_percentage(new_profile)
        print(f"[DEBUG] Creating profile with data: {new_profile}")

        try:
            print(f"[DEBUG] Attempting to create profile with data: {new_profile}")
            # Serialize dates before sending to Supabase
            serialized_profile = serialize_dates(new_profile)
            created = supabase_admin.table("profiles").insert(serialized_profile).execute()
            print(f"[DEBUG] Profile creation result: {created}")
            print(f"[DEBUG] Profile created successfully: {created.data[0] if created.data else 'No data'}")
            if created.data:
                print(f"[DEBUG] Created profile keys: {list(created.data[0].keys())}")
                profile = ProfileResponse(**created.data[0])
            else:
                print("[ERROR] No data returned from profile creation")
                raise HTTPException(status_code=500, detail="Failed to create profile")
        except Exception as e:
            print(f"[ERROR] Failed to create profile: {type(e).__name__}: {e}")
            import traceback
            print(f"[ERROR] Traceback: {traceback.format_exc()}")
            raise

    else:
        print("[DEBUG] Profile found, updating existing profile")
        current_profile = response_data.data[0]

        # Get list of valid columns from current profile (what exists in DB)
        valid_columns = set(current_profile.keys())
        print(f"[DEBUG] Valid columns in database: {valid_columns}")

        # Filter update_data to only include columns that exist in DB
        filtered_update_data = {k: v for k, v in update_data.items() if k in valid_columns}
        invalid_columns = set(update_data.keys()) - valid_columns
        if invalid_columns:
            print(f"[DEBUG] Skipping invalid columns: {invalid_columns}")

        # Merge updates
        updated_profile = {**current_profile, **filtered_update_data}

        # Recalculate completion percentage
        updated_profile['completion_percentage'] = calculate_completion_percentage(updated_profile)

        # Update in database (using admin client)
        print(f"[DEBUG] Updating profile with data: {updated_profile}")
        try:
            # Serialize dates before sending to Supabase
            serialized_profile = serialize_dates(updated_profile)
            print(f"[DEBUG] Serialized profile (after date conversion): {serialized_profile}")

            result = supabase_admin.table("profiles").update(serialized_profile).eq("user_id", str(current_user.id)).execute()
            print(f"[DEBUG] Profile update result: {result}")
            print(f"[DEBUG] Profile updated successfully: {result.data[0] if result.data else 'No data'}")
            if result.data:
                print(f"[DEBUG] Updated profile keys: {list(result.data[0].keys())}")
                profile = ProfileResponse(**result.data[0])
            else:
                print("[ERROR] No data returned from profile update")
                raise HTTPException(status_code=500, detail="Failed to update profile")
        except Exception as e:
            print(f"[ERROR] Failed to update profile: {type(e).__name__}: {e}")
            import traceback
            print(f"[ERROR] Traceback: {traceback.format_exc()}")
            raise

    # Return profile (CORS middleware will add headers automatically)
    return profile


@router.get("/me/completion", response_model=ProfileCompletionResponse)
async def get_profile_completion(
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Get profile completion status"""
    # Use admin client to bypass RLS
    supabase_admin = get_supabase_admin()
    
    response = supabase_admin.table("profiles").select("*").eq("user_id", str(current_user.id)).execute()
    
    if not response.data:
        return ProfileCompletionResponse(
            completion_percentage=0,
            missing_fields=["All fields"],
            completed_sections=[]
        )
    
    profile = response.data[0]
    completion = calculate_completion_percentage(profile)
    
    required_fields = [
        'first_name', 'last_name', 'date_of_birth', 'nationality',
        'mobile_number', 'highest_qualification', 'field_of_study',
        'institution_name', 'cgpa_percentage', 'graduation_year',
        'english_test_type', 'english_score', 'preferred_intake',
        'study_level', 'preferred_program'
    ]
    
    missing = [field for field in required_fields if not profile.get(field)]
    completed = [field for field in required_fields if profile.get(field)]
    
    return ProfileCompletionResponse(
        completion_percentage=completion,
        missing_fields=missing,
        completed_sections=completed
    )


# OPTIONS handler removed - CORS middleware in main_working.py handles this globally
















