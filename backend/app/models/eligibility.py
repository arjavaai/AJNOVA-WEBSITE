"""Eligibility models"""

from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime
from uuid import UUID


class EligibilityCheckRequest(BaseModel):
    """Eligibility check request"""
    highest_qualification: str
    field_of_study: str
    cgpa_percentage: float
    english_test_type: str
    english_score: float
    work_experience_years: str
    preferred_program: str
    german_level: Optional[str] = None


class EligibilityResult(BaseModel):
    """Eligibility check result"""
    eligible: bool
    score: int
    recommendations: list[str]
    warnings: list[str]
    eligible_programs: list[str]
    improvement_areas: list[str]


class EligibilityInDB(EligibilityResult):
    """Eligibility stored in database"""
    id: UUID
    student_id: UUID
    request_data: Dict[str, Any]
    created_at: datetime
    
    class Config:
        from_attributes = True


class EligibilityResponse(EligibilityInDB):
    """Eligibility response"""
    pass














