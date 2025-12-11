"""
Profile management endpoints
"""

from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from uuid import UUID
from typing import List

from app.dependencies import get_supabase, get_current_user
from app.models.profile import ProfileResponse, ProfileUpdate, ProfileCreate, ProfileCompletionResponse

router = APIRouter()


def calculate_completion_percentage(profile_data: dict) -> int:
    """Calculate profile completion percentage"""
    required_fields = [
        'first_name', 'last_name', 'date_of_birth', 'nationality',
        'mobile_number', 'highest_qualification', 'field_of_study',
        'institution_name', 'cgpa_percentage', 'graduation_year',
        'english_test_type', 'english_score', 'preferred_intake',
        'study_level', 'preferred_program'
    ]
    
    completed = sum(1 for field in required_fields if profile_data.get(field))
    return int((completed / len(required_fields)) * 100)


@router.get("/me", response_model=ProfileResponse)
async def get_my_profile(
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Get current user's profile"""
    response = supabase.table("profiles").select("*").eq("user_id", str(current_user.id)).execute()
    
    if not response.data:
        # Create empty profile if doesn't exist
        new_profile = {
            "user_id": str(current_user.id),
            "completion_percentage": 0
        }
        created = supabase.table("profiles").insert(new_profile).execute()
        return ProfileResponse(**created.data[0])
    
    return ProfileResponse(**response.data[0])


@router.put("/me", response_model=ProfileResponse)
async def update_my_profile(
    profile_update: ProfileUpdate,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Update current user's profile"""
    update_data = profile_update.dict(exclude_unset=True)
    
    if not update_data:
        return await get_my_profile(current_user, supabase)
    
    # Get current profile
    response = supabase.table("profiles").select("*").eq("user_id", str(current_user.id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    current_profile = response.data[0]
    
    # Merge updates
    updated_profile = {**current_profile, **update_data}
    
    # Recalculate completion percentage
    updated_profile['completion_percentage'] = calculate_completion_percentage(updated_profile)
    
    # Update in database
    result = supabase.table("profiles").update(updated_profile).eq("user_id", str(current_user.id)).execute()
    
    return ProfileResponse(**result.data[0])


@router.get("/me/completion", response_model=ProfileCompletionResponse)
async def get_profile_completion(
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Get profile completion status"""
    response = supabase.table("profiles").select("*").eq("user_id", str(current_user.id)).execute()
    
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









