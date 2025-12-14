"""APS models"""

from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime
from uuid import UUID


class APSSubmissionBase(BaseModel):
    """Base APS submission model"""
    form_data: Dict[str, Any]


class APSSubmissionCreate(APSSubmissionBase):
    """APS submission creation"""
    student_id: UUID


class APSSubmissionUpdate(BaseModel):
    """APS submission update"""
    form_data: Optional[Dict[str, Any]] = None
    status: Optional[str] = None


class APSSubmissionInDB(APSSubmissionBase):
    """APS submission in database"""
    id: UUID
    student_id: UUID
    status: str = "submitted"
    counsellor_id: Optional[UUID] = None
    verification_comments: Optional[str] = None
    submitted_at: datetime
    verified_at: Optional[datetime] = None
    updated_at: datetime
    
    class Config:
        from_attributes = True


class APSSubmissionResponse(APSSubmissionInDB):
    """APS submission response"""
    pass














