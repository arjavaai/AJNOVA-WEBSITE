"""
University application tracking endpoints
"""

from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from uuid import UUID
from typing import Optional

from app.dependencies import get_supabase, get_current_user, require_counsellor
from app.models.application import (
    ApplicationResponse, ApplicationCreate, ApplicationUpdate, ApplicationListResponse
)

router = APIRouter()


@router.get("", response_model=ApplicationListResponse)
async def get_applications(
    stats: bool = False,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Get all applications for current user"""
    response = supabase.table("applications").select("*").eq(
        "student_id", str(current_user.id)
    ).order("created_at", desc=True).execute()
    
    applications = [ApplicationResponse(**app) for app in response.data]
    
    # Calculate stats if requested
    stats_data = None
    if stats:
        status_counts = {}
        for app in applications:
            status_counts[app.status] = status_counts.get(app.status, 0) + 1
        stats_data = status_counts
    
    return ApplicationListResponse(
        applications=applications,
        total=len(applications),
        stats=stats_data
    )


@router.post("", response_model=ApplicationResponse)
async def create_application(
    application: ApplicationCreate,
    current_user = Depends(require_counsellor),
    supabase: Client = Depends(get_supabase)
):
    """Create new application (counsellor/admin only)"""
    application_data = application.dict()
    
    response = supabase.table("applications").insert(application_data).execute()
    
    return ApplicationResponse(**response.data[0])


@router.get("/{application_id}", response_model=ApplicationResponse)
async def get_application(
    application_id: UUID,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Get specific application"""
    response = supabase.table("applications").select("*").eq("id", str(application_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Application not found")
    
    application = response.data[0]
    
    # Check access
    if application["student_id"] != str(current_user.id) and current_user.role not in ["counsellor", "admin"]:
        raise HTTPException(status_code=403, detail="Access denied")
    
    return ApplicationResponse(**application)


@router.put("/{application_id}", response_model=ApplicationResponse)
async def update_application(
    application_id: UUID,
    update: ApplicationUpdate,
    current_user = Depends(require_counsellor),
    supabase: Client = Depends(get_supabase)
):
    """Update application status (counsellor/admin only)"""
    update_data = update.dict(exclude_unset=True)
    
    response = supabase.table("applications").update(update_data).eq("id", str(application_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Send notification
    from app.services.notification_service import NotificationService
    
    application = response.data[0]
    notification_service = NotificationService(supabase)
    
    await notification_service.notify_application_update(
        user_id=UUID(application["student_id"]),
        university=application["university_name"],
        status=application["status"],
        application_id=application_id
    )
    
    return ApplicationResponse(**application)


@router.delete("/{application_id}")
async def delete_application(
    application_id: UUID,
    current_user = Depends(require_counsellor),
    supabase: Client = Depends(get_supabase)
):
    """Delete application (admin only)"""
    supabase.table("applications").delete().eq("id", str(application_id)).execute()
    
    return {"message": "Application deleted successfully"}














