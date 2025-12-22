"""
APS form submission endpoints
"""

from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from uuid import UUID

from app.dependencies import get_supabase, get_supabase_admin, get_current_user, require_counsellor
from app.models.aps import APSSubmissionResponse, APSSubmissionCreate, APSSubmissionUpdate

router = APIRouter()


def transform_aps_response(db_row: dict) -> dict:
    """Transform database row to frontend format by flattening form_data"""
    if not db_row:
        return None

    # Extract form_data and merge with metadata
    form_data = db_row.get("form_data", {})
    transformed = {
        "id": db_row.get("id"),
        "studentId": db_row.get("student_id"),
        "status": db_row.get("status"),
        "submittedAt": db_row.get("submitted_at"),
        "verifiedAt": db_row.get("verified_at"),
        "createdAt": db_row.get("submitted_at"),  # Use submitted_at as createdAt
        "updatedAt": db_row.get("updated_at"),
        "counsellorComments": db_row.get("verification_comments"),
        # Merge all form_data fields
        **form_data
    }

    # Calculate completion percentage if not present
    if "completionPercentage" not in transformed:
        transformed["completionPercentage"] = 0

    return transformed


@router.get("/me")
async def get_my_aps_submission(
    current_user = Depends(get_current_user),
    supabase_admin: Client = Depends(get_supabase_admin)
):
    """Get current user's APS submission"""
    response = supabase_admin.table("aps_submissions").select("*").eq(
        "student_id", str(current_user.id)
    ).order("submitted_at", desc=True).limit(1).execute()

    if not response.data:
        # Return null form instead of 404 when no submission exists
        return {"form": None}

    return {"form": transform_aps_response(response.data[0])}


@router.post("/me")
async def submit_aps_form(
    submission: APSSubmissionCreate,
    current_user = Depends(get_current_user),
    supabase_admin: Client = Depends(get_supabase_admin)
):
    """Submit APS form"""
    submission_data = {
        "student_id": str(current_user.id),
        "form_data": submission.form_data,
        "status": "submitted"
    }

    response = supabase_admin.table("aps_submissions").insert(submission_data).execute()

    return {"form": transform_aps_response(response.data[0])}


@router.put("/me")
async def update_aps_submission(
    update: APSSubmissionUpdate,
    current_user = Depends(get_current_user),
    supabase_admin: Client = Depends(get_supabase_admin)
):
    """Update APS submission"""
    try:
        print(f"[DEBUG] APS Update: user_id={current_user.id}, status={update.status}")

        # Get existing submission
        existing = supabase_admin.table("aps_submissions").select("*").eq(
            "student_id", str(current_user.id)
        ).order("submitted_at", desc=True).limit(1).execute()

        if not existing.data:
            # If no submission exists, create a new one
            print(f"[DEBUG] APS: No existing submission, creating new one")
            submission_data = {
                "student_id": str(current_user.id),
                "form_data": update.form_data or {},
                "status": update.status or "draft"
            }
            response = supabase_admin.table("aps_submissions").insert(submission_data).execute()
            print(f"[DEBUG] APS: Created submission with id={response.data[0]['id']}")
            return {"form": transform_aps_response(response.data[0])}

        submission_id = existing.data[0]["id"]
        print(f"[DEBUG] APS: Updating existing submission id={submission_id}")
        update_data = update.model_dump(exclude_unset=True)

        response = supabase_admin.table("aps_submissions").update(update_data).eq("id", submission_id).execute()
        print(f"[DEBUG] APS: Update successful")

        return {"form": transform_aps_response(response.data[0])}
    except Exception as e:
        print(f"[ERROR] APS Update failed: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{submission_id}/verify", response_model=APSSubmissionResponse)
async def verify_aps_submission(
    submission_id: UUID,
    verification_comments: str,
    status: str,
    current_user = Depends(require_counsellor),
    supabase_admin: Client = Depends(get_supabase_admin)
):
    """Verify APS submission (counsellor only)"""
    from datetime import datetime
    
    update_data = {
        "status": status,
        "verification_comments": verification_comments,
        "counsellor_id": str(current_user.id),
        "verified_at": datetime.utcnow().isoformat()
    }
    
    response = supabase_admin.table("aps_submissions").update(update_data).eq("id", str(submission_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Submission not found")
    
    return APSSubmissionResponse(**response.data[0])




















