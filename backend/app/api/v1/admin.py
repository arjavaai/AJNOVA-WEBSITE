"""
Admin dashboard endpoints
"""

from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from typing import List, Dict, Any

from app.dependencies import get_supabase, require_admin, require_counsellor
from app.models.user import UserResponse
from app.models.document import DocumentResponse
from app.models.application import ApplicationResponse

router = APIRouter()


@router.get("/users", response_model=List[UserResponse])
async def get_all_users(
    role: str = None,
    current_user = Depends(require_admin),
    supabase: Client = Depends(get_supabase)
):
    """Get all users (admin only)"""
    query = supabase.table("users").select("*")
    
    if role:
        query = query.eq("role", role)
    
    response = query.order("created_at", desc=True).execute()
    
    return [UserResponse(**user) for user in response.data]


@router.get("/students", response_model=List[Dict[str, Any]])
async def get_all_students(
    current_user = Depends(require_counsellor),
    supabase: Client = Depends(get_supabase)
):
    """Get all students with profiles (counsellor/admin)"""
    # Get students
    users_response = supabase.table("users").select("*").eq("role", "student").execute()
    
    students = []
    for user in users_response.data:
        # Get profile for each student
        profile_response = supabase.table("profiles").select("*").eq("user_id", user["id"]).execute()
        
        student_data = {
            **user,
            "profile": profile_response.data[0] if profile_response.data else None
        }
        students.append(student_data)
    
    return students


@router.get("/reviews", response_model=List[DocumentResponse])
async def get_review_queue(
    current_user = Depends(require_counsellor),
    supabase: Client = Depends(get_supabase)
):
    """Get documents awaiting review (counsellor/admin)"""
    response = supabase.table("documents").select("*").eq(
        "status", "submitted"
    ).order("submitted_at", desc=False).execute()
    
    return [DocumentResponse(**doc) for doc in response.data]


@router.get("/leads")
async def get_leads(
    current_user = Depends(require_admin),
    supabase: Client = Depends(get_supabase)
):
    """Get leads/contacts"""
    response = supabase.table("leads").select("*").order("created_at", desc=True).execute()
    
    return {"leads": response.data, "total": len(response.data)}


@router.get("/analytics")
async def get_analytics(
    current_user = Depends(require_admin),
    supabase: Client = Depends(get_supabase)
):
    """Get platform analytics"""
    # Total users
    users_count = supabase.table("users").select("id", count="exact").execute()
    
    # Students count
    students_count = supabase.table("users").select("id", count="exact").eq("role", "student").execute()
    
    # Documents count by status
    documents = supabase.table("documents").select("status").execute()
    doc_stats = {}
    for doc in documents.data:
        status = doc["status"]
        doc_stats[status] = doc_stats.get(status, 0) + 1
    
    # Applications count by status
    applications = supabase.table("applications").select("status").execute()
    app_stats = {}
    for app in applications.data:
        status = app["status"]
        app_stats[status] = app_stats.get(status, 0) + 1
    
    # Consultations count
    consultations_count = supabase.table("consultations").select("id", count="exact").execute()
    
    return {
        "total_users": users_count.count,
        "total_students": students_count.count,
        "document_stats": doc_stats,
        "application_stats": app_stats,
        "total_consultations": consultations_count.count,
    }


















