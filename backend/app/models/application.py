"""Application models"""

from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import date, datetime
from uuid import UUID


class ApplicationBase(BaseModel):
    """Base application model"""
    university_name: str
    program_name: str
    intake: Optional[str] = None
    notes: Optional[str] = None


class ApplicationCreate(ApplicationBase):
    """Application creation"""
    student_id: UUID
    applied_date: Optional[date] = None


class ApplicationUpdate(BaseModel):
    """Application update"""
    status: Optional[str] = Field(None, pattern="^(applied|documents_sent|under_review|accepted|rejected|withdrawn)$")
    decision_date: Optional[date] = None
    notes: Optional[str] = None
    timeline: Optional[Dict[str, Any]] = None


class ApplicationInDB(ApplicationBase):
    """Application in database"""
    id: UUID
    student_id: UUID
    status: str = "applied"
    counsellor_id: Optional[UUID] = None
    applied_date: Optional[date] = None
    decision_date: Optional[date] = None
    timeline: Optional[Dict[str, Any]] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class ApplicationResponse(ApplicationInDB):
    """Application response"""
    pass


class ApplicationListResponse(BaseModel):
    """Application list response"""
    applications: list[ApplicationResponse]
    total: int
    stats: Optional[Dict[str, int]] = None
























