"""
Document management and AI generation endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from supabase import Client
from uuid import UUID
from typing import List
from datetime import datetime

from app.dependencies import get_supabase, get_current_user, require_counsellor
from app.models.document import (
    DocumentResponse, DocumentCreate, DocumentUpdate,
    DocumentGenerateRequest, DocumentReviewRequest, DocumentListResponse
)
from app.models.profile import ProfileInDB
from app.services.ai_service import AIService
from app.services.storage_service import StorageService
from app.services.notification_service import NotificationService
from app.services.email_service import EmailService

router = APIRouter()


@router.get("", response_model=DocumentListResponse)
async def get_documents(
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Get all documents for current user"""
    response = supabase.table("documents").select("*").eq("student_id", str(current_user.id)).order("created_at", desc=True).execute()
    
    return DocumentListResponse(
        documents=[DocumentResponse(**doc) for doc in response.data],
        total=len(response.data)
    )


@router.post("/generate", response_model=DocumentResponse)
async def generate_document(
    request: DocumentGenerateRequest,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Generate AI-powered document"""
    # Get user profile
    profile_response = supabase.table("profiles").select("*").eq("user_id", str(current_user.id)).execute()
    
    if not profile_response.data:
        raise HTTPException(status_code=400, detail="Please complete your profile first")
    
    profile = ProfileInDB(**profile_response.data[0])
    
    # Check profile completion
    if profile.completion_percentage < 80:
        raise HTTPException(
            status_code=400,
            detail=f"Profile must be at least 80% complete to generate documents. Current: {profile.completion_percentage}%"
        )
    
    # Generate document with AI
    ai_service = AIService()
    
    try:
        content = await ai_service.generate_document(
            document_type=request.type,
            profile=profile,
            university=request.university,
            program=request.program,
            additional_info=request.additional_info
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI generation failed: {str(e)}")
    
    # Save document to database
    document_data = {
        "student_id": str(current_user.id),
        "type": request.type,
        "title": f"{request.type.upper()} - {request.university}",
        "content": content,
        "status": "draft",
        "version": 1
    }
    
    created = supabase.table("documents").insert(document_data).execute()
    
    return DocumentResponse(**created.data[0])


@router.get("/{document_id}", response_model=DocumentResponse)
async def get_document(
    document_id: UUID,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Get specific document"""
    response = supabase.table("documents").select("*").eq("id", str(document_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Document not found")
    
    document = response.data[0]
    
    # Check ownership
    if document["student_id"] != str(current_user.id) and current_user.role not in ["counsellor", "admin"]:
        raise HTTPException(status_code=403, detail="Access denied")
    
    return DocumentResponse(**document)


@router.put("/{document_id}", response_model=DocumentResponse)
async def update_document(
    document_id: UUID,
    document_update: DocumentUpdate,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Update document"""
    # Check ownership
    response = supabase.table("documents").select("*").eq("id", str(document_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Document not found")
    
    document = response.data[0]
    
    if document["student_id"] != str(current_user.id):
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Update document
    update_data = document_update.dict(exclude_unset=True)
    updated = supabase.table("documents").update(update_data).eq("id", str(document_id)).execute()
    
    return DocumentResponse(**updated.data[0])


@router.post("/{document_id}/submit", response_model=DocumentResponse)
async def submit_document_for_review(
    document_id: UUID,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Submit document for counsellor review"""
    # Check ownership
    response = supabase.table("documents").select("*").eq("id", str(document_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Document not found")
    
    document = response.data[0]
    
    if document["student_id"] != str(current_user.id):
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Update status
    updated = supabase.table("documents").update({
        "status": "submitted",
        "submitted_at": datetime.utcnow().isoformat()
    }).eq("id", str(document_id)).execute()
    
    return DocumentResponse(**updated.data[0])


@router.post("/{document_id}/review", response_model=DocumentResponse)
async def review_document(
    document_id: UUID,
    review: DocumentReviewRequest,
    current_user = Depends(require_counsellor),
    supabase: Client = Depends(get_supabase)
):
    """Review document (counsellor/admin only)"""
    response = supabase.table("documents").select("*").eq("id", str(document_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Update document with review
    updated = supabase.table("documents").update({
        "status": review.status,
        "review_comments": review.review_comments,
        "counsellor_id": str(current_user.id),
        "reviewed_at": datetime.utcnow().isoformat()
    }).eq("id", str(document_id)).execute()
    
    # Send notifications
    document = updated.data[0]
    notification_service = NotificationService(supabase)
    email_service = EmailService()
    
    student_id = UUID(document["student_id"])
    
    if review.status == "approved":
        await notification_service.notify_document_approved(student_id, document["type"], document_id)
    elif review.status == "needs_revision":
        await notification_service.notify_document_needs_revision(student_id, document["type"], document_id)
    
    return DocumentResponse(**document)


@router.delete("/{document_id}")
async def delete_document(
    document_id: UUID,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Delete document"""
    # Check ownership
    response = supabase.table("documents").select("*").eq("id", str(document_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Document not found")
    
    document = response.data[0]
    
    if document["student_id"] != str(current_user.id) and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Delete document
    supabase.table("documents").delete().eq("id", str(document_id)).execute()
    
    return {"message": "Document deleted successfully"}


@router.post("/{document_id}/upload", response_model=DocumentResponse)
async def upload_document_file(
    document_id: UUID,
    file: UploadFile = File(...),
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Upload file for document"""
    # Check ownership
    response = supabase.table("documents").select("*").eq("id", str(document_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Document not found")
    
    document = response.data[0]
    
    if document["student_id"] != str(current_user.id):
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Upload file
    storage_service = StorageService(supabase)
    file_data = await storage_service.upload_file(file, str(current_user.id), document["type"])
    
    # Update document with file info
    updated = supabase.table("documents").update(file_data).eq("id", str(document_id)).execute()
    
    return DocumentResponse(**updated.data[0])


















