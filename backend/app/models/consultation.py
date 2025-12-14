"""Consultation models"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID


class ConsultationBase(BaseModel):
    """Base consultation model"""
    scheduled_at: datetime
    consultation_type: str
    notes: Optional[str] = None


class ConsultationCreate(ConsultationBase):
    """Consultation creation"""
    student_id: UUID
    counsellor_id: Optional[UUID] = None


class ConsultationUpdate(BaseModel):
    """Consultation update"""
    status: Optional[str] = Field(None, pattern="^(scheduled|completed|cancelled|rescheduled)$")
    scheduled_at: Optional[datetime] = None
    notes: Optional[str] = None
    meeting_link: Optional[str] = None


class ConsultationInDB(ConsultationBase):
    """Consultation in database"""
    id: UUID
    student_id: UUID
    counsellor_id: Optional[UUID] = None
    status: str = "scheduled"
    meeting_link: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class ConsultationResponse(ConsultationInDB):
    """Consultation response"""
    pass


class ConsultationListResponse(BaseModel):
    """Consultation list response"""
    consultations: list[ConsultationResponse]
    total: int














