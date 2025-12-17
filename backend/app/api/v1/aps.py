"""
APS form submission endpoints
"""

from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from uuid import UUID

from app.dependencies import get_supabase, get_current_user, require_counsellor
from app.models.aps import APSSubmissionResponse, APSSubmissionCreate, APSSubmissionUpdate

router = APIRouter()


@router.get("/me", response_model=APSSubmissionResponse)
async def get_my_aps_submission(
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Get current user's APS submission"""
    response = supabase.table("aps_submissions").select("*").eq(
        "student_id", str(current_user.id)
    ).order("submitted_at", desc=True).limit(1).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="No APS submission found")
    
    return APSSubmissionResponse(**response.data[0])


@router.post("/me", response_model=APSSubmissionResponse)
async def submit_aps_form(
    submission: APSSubmissionCreate,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Submit APS form"""
    submission_data = {
        "student_id": str(current_user.id),
        "form_data": submission.form_data,
        "status": "submitted"
    }
    
    response = supabase.table("aps_submissions").insert(submission_data).execute()
    
    return APSSubmissionResponse(**response.data[0])


@router.put("/me", response_model=APSSubmissionResponse)
async def update_aps_submission(
    update: APSSubmissionUpdate,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Update APS submission"""
    # Get existing submission
    existing = supabase.table("aps_submissions").select("*").eq(
        "student_id", str(current_user.id)
    ).order("submitted_at", desc=True).limit(1).execute()
    
    if not existing.data:
        raise HTTPException(status_code=404, detail="No APS submission found")
    
    submission_id = existing.data[0]["id"]
    update_data = update.dict(exclude_unset=True)
    
    response = supabase.table("aps_submissions").update(update_data).eq("id", submission_id).execute()
    
    return APSSubmissionResponse(**response.data[0])


@router.post("/{submission_id}/verify", response_model=APSSubmissionResponse)
async def verify_aps_submission(
    submission_id: UUID,
    verification_comments: str,
    status: str,
    current_user = Depends(require_counsellor),
    supabase: Client = Depends(get_supabase)
):
    """Verify APS submission (counsellor only)"""
    from datetime import datetime
    
    update_data = {
        "status": status,
        "verification_comments": verification_comments,
        "counsellor_id": str(current_user.id),
        "verified_at": datetime.utcnow().isoformat()
    }
    
    response = supabase.table("aps_submissions").update(update_data).eq("id", str(submission_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Submission not found")
    
    return APSSubmissionResponse(**response.data[0])


















