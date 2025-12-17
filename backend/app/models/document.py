"""Document models"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID


class DocumentBase(BaseModel):
    """Base document model"""
    type: str = Field(..., pattern="^(sop|lor|resume|cover_letter|aps|passport|transcript|certificate|other)$")
    title: Optional[str] = None
    content: Optional[str] = None


class DocumentCreate(DocumentBase):
    """Document creation model"""
    student_id: UUID


class DocumentUpdate(BaseModel):
    """Document update model"""
    title: Optional[str] = None
    content: Optional[str] = None
    status: Optional[str] = Field(None, pattern="^(draft|submitted|under_review|approved|rejected|needs_revision)$")


class DocumentGenerateRequest(BaseModel):
    """AI document generation request"""
    type: str = Field(..., pattern="^(sop|lor|resume|cover_letter)$")
    university: str
    program: str
    additional_info: Optional[str] = None


class DocumentReviewRequest(BaseModel):
    """Document review request"""
    review_comments: str
    status: str = Field(..., pattern="^(approved|rejected|needs_revision)$")


class DocumentInDB(DocumentBase):
    """Document as stored in database"""
    id: UUID
    student_id: UUID
    file_url: Optional[str] = None
    file_name: Optional[str] = None
    file_size: Optional[int] = None
    mime_type: Optional[str] = None
    status: str = "draft"
    version: int = 1
    counsellor_id: Optional[UUID] = None
    review_comments: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    submitted_at: Optional[datetime] = None
    reviewed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class DocumentResponse(DocumentInDB):
    """Document response model"""
    pass


class DocumentListResponse(BaseModel):
    """Document list response"""
    documents: list[DocumentResponse]
    total: int


















