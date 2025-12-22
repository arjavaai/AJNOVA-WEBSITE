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


@router.get("/counsellors")
async def get_counsellors(
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Get list of available counsellors"""
    response = supabase.table("users").select("id, name, email").eq("role", "counsellor").execute()

    counsellors = [{
        "id": c["id"],
        "name": c["name"] or c["email"].split("@")[0],
        "email": c["email"],
        "expertise": ["General Counselling", "Germany Studies"],
        "availability": []
    } for c in response.data]

    return {"counsellors": counsellors}


@router.get("/slots")
async def get_available_slots(
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Get available time slots for consultations"""
    from datetime import datetime, timedelta

    # Get all counsellors
    counsellors = supabase.table("users").select("id").eq("role", "counsellor").execute()

    # Generate slots for next 30 days (9 AM to 5 PM, weekdays only)
    slots = []
    start_date = datetime.now()

    for day_offset in range(30):
        current_date = start_date + timedelta(days=day_offset)

        # Skip weekends
        if current_date.weekday() >= 5:
            continue

        # Generate time slots (9 AM to 5 PM)
        for hour in range(9, 17):
            for counsellor in counsellors.data:
                slot_date = current_date.replace(hour=hour, minute=0, second=0, microsecond=0)

                # Check if slot is already booked
                existing = supabase.table("consultations")\
                    .select("id")\
                    .eq("counsellor_id", counsellor["id"])\
                    .gte("scheduled_at", slot_date.isoformat())\
                    .lt("scheduled_at", (slot_date + timedelta(hours=1)).isoformat())\
                    .execute()

                slots.append({
                    "date": slot_date.isoformat(),
                    "time": f"{hour:02d}:00",
                    "counsellorId": counsellor["id"],
                    "available": len(existing.data) == 0
                })

    return {"slots": slots[:100]}  # Limit to 100 slots


@router.get("")
async def get_consultations(
    type: Optional[str] = None,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Get consultations for current user"""
    from datetime import datetime

    query = supabase.table("consultations").select("*, counsellor:users!consultations_counsellor_id_fkey(name, email)")

    if current_user.role == "student":
        query = query.eq("student_id", str(current_user.id))
    elif current_user.role in ["counsellor", "admin"]:
        if type == "upcoming":
            query = query.eq("status", "scheduled")
        # Counsellors see all consultations or their assigned ones

    # Filter by type
    now = datetime.now().isoformat()
    if type == "upcoming":
        query = query.gte("scheduled_at", now).eq("status", "scheduled")
    elif type == "history":
        query = query.lt("scheduled_at", now)

    response = query.order("scheduled_at", desc=False).execute()

    # Format consultations to match frontend expectations
    consultations = []
    for c in response.data:
        # Extract counsellor name from joined data
        counsellor_name = "Unassigned"
        if c.get("counsellor"):
            counsellor_name = c["counsellor"].get("name") or c["counsellor"].get("email", "").split("@")[0]

        # Create consultation dict with counsellor_name field
        consultation_dict = {
            "id": c["id"],
            "student_id": c["student_id"],
            "counsellor_id": c.get("counsellor_id"),
            "counsellor_name": counsellor_name,
            "consultation_type": c.get("consultation_type", "INITIAL"),
            "scheduled_at": c["scheduled_at"],
            "duration_minutes": c.get("duration_minutes", 30),
            "status": c.get("status", "scheduled"),
            "meeting_link": c.get("meeting_link"),
            "notes": c.get("notes"),
            "created_at": c["created_at"],
            "updated_at": c["updated_at"]
        }

        consultations.append(consultation_dict)

    return {
        "consultations": consultations,
        "total": len(consultations)
    }


@router.post("")
async def book_consultation(
    consultation: ConsultationCreate,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Book a consultation"""
    # Transform frontend data to backend format
    consultation_data = {
        "student_id": str(current_user.id),
        "counsellor_id": str(consultation.counsellor_id),
        "scheduled_at": consultation.scheduled_date.isoformat(),
        "duration_minutes": consultation.duration_minutes,
        "consultation_type": consultation.consultation_type,
        "notes": consultation.notes,
        "status": "scheduled"
    }

    response = supabase.table("consultations").insert(consultation_data).execute()

    # Get counsellor name
    counsellor = supabase.table("users").select("name, email").eq("id", str(consultation.counsellor_id)).execute()
    counsellor_name = "Unassigned"
    if counsellor.data:
        counsellor_name = counsellor.data[0].get("name") or counsellor.data[0].get("email", "").split("@")[0]

    # Send notification
    notification_service = NotificationService(supabase)
    await notification_service.notify_consultation_scheduled(
        user_id=current_user.id,
        scheduled_at=str(consultation.scheduled_date),
        consultation_id=UUID(response.data[0]["id"])
    )

    # Add counsellor_name to response
    result = response.data[0]
    result["counsellor_name"] = counsellor_name

    return result


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




















