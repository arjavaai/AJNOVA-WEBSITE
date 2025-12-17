"""
Consultation scheduling endpoints
"""

from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from uuid import UUID
from typing import Optional

from app.dependencies import get_supabase, get_current_user, require_counsellor
from app.models.consultation import (
    ConsultationResponse, ConsultationCreate, ConsultationUpdate, ConsultationListResponse
)
from app.services.notification_service import NotificationService

router = APIRouter()


@router.get("", response_model=ConsultationListResponse)
async def get_consultations(
    type: Optional[str] = None,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Get consultations for current user"""
    query = supabase.table("consultations").select("*")
    
    if current_user.role == "student":
        query = query.eq("student_id", str(current_user.id))
    elif current_user.role in ["counsellor", "admin"]:
        if type == "upcoming":
            query = query.eq("status", "scheduled")
        # Counsellors see all consultations or their assigned ones
    
    response = query.order("scheduled_at", desc=False).execute()
    
    consultations = [ConsultationResponse(**c) for c in response.data]
    
    return ConsultationListResponse(
        consultations=consultations,
        total=len(consultations)
    )


@router.post("", response_model=ConsultationResponse)
async def book_consultation(
    consultation: ConsultationCreate,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Book a consultation"""
    consultation_data = consultation.dict()
    consultation_data["student_id"] = str(current_user.id)
    
    response = supabase.table("consultations").insert(consultation_data).execute()
    
    # Send notification
    notification_service = NotificationService(supabase)
    await notification_service.notify_consultation_scheduled(
        user_id=current_user.id,
        scheduled_at=str(consultation.scheduled_at),
        consultation_id=UUID(response.data[0]["id"])
    )
    
    return ConsultationResponse(**response.data[0])


@router.get("/{consultation_id}", response_model=ConsultationResponse)
async def get_consultation(
    consultation_id: UUID,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Get specific consultation"""
    response = supabase.table("consultations").select("*").eq("id", str(consultation_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Consultation not found")
    
    consultation = response.data[0]
    
    # Check access
    if consultation["student_id"] != str(current_user.id) and current_user.role not in ["counsellor", "admin"]:
        raise HTTPException(status_code=403, detail="Access denied")
    
    return ConsultationResponse(**consultation)


@router.put("/{consultation_id}", response_model=ConsultationResponse)
async def update_consultation(
    consultation_id: UUID,
    update: ConsultationUpdate,
    current_user = Depends(require_counsellor),
    supabase: Client = Depends(get_supabase)
):
    """Update consultation (counsellor/admin only)"""
    update_data = update.dict(exclude_unset=True)
    
    response = supabase.table("consultations").update(update_data).eq("id", str(consultation_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Consultation not found")
    
    return ConsultationResponse(**response.data[0])


@router.delete("/{consultation_id}")
async def cancel_consultation(
    consultation_id: UUID,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Cancel consultation"""
    # Get consultation
    response = supabase.table("consultations").select("*").eq("id", str(consultation_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Consultation not found")
    
    consultation = response.data[0]
    
    # Check ownership
    if consultation["student_id"] != str(current_user.id) and current_user.role not in ["counsellor", "admin"]:
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Update status to cancelled
    supabase.table("consultations").update({"status": "cancelled"}).eq("id", str(consultation_id)).execute()
    
    return {"message": "Consultation cancelled successfully"}


















