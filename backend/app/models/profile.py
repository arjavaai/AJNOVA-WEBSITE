"""Profile models"""

from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import date, datetime
from uuid import UUID


class AddressModel(BaseModel):
    """Address nested model"""
    street: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    postal_code: Optional[str] = None
    country: Optional[str] = None


class ProfileBase(BaseModel):
    """Base profile model"""
    # Personal Information
    first_name: Optional[str] = None
    middle_name: Optional[str] = None
    last_name: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    nationality: Optional[str] = None
    country_of_residence: Optional[str] = None
    passport_number: Optional[str] = None
    passport_expiry: Optional[date] = None
    mobile_number: Optional[str] = None
    address: Optional[Dict[str, Any]] = None
    
    # Academic Background
    highest_qualification: Optional[str] = None
    field_of_study: Optional[str] = None
    institution_name: Optional[str] = None
    country_of_education: Optional[str] = None
    graduation_year: Optional[int] = None
    cgpa_percentage: Optional[float] = None
    cgpa_type: Optional[str] = None
    backlogs: Optional[int] = None
    medium_of_instruction: Optional[str] = None
    
    # Language Scores
    english_test_type: Optional[str] = None
    english_score: Optional[float] = None
    english_test_date: Optional[date] = None
    german_level: Optional[str] = None
    german_test_date: Optional[date] = None
    
    # Work Experience
    work_experience_years: Optional[str] = None
    
    # Preferences
    preferred_intake: Optional[str] = None
    interested_country: str = "Germany"
    study_level: Optional[str] = None
    preferred_program: Optional[str] = None


class ProfileCreate(ProfileBase):
    """Profile creation model"""
    user_id: UUID


class ProfileUpdate(ProfileBase):
    """Profile update model - all fields optional"""
    pass


class ProfileInDB(ProfileBase):
    """Profile as stored in database"""
    id: UUID
    user_id: UUID
    completion_percentage: int = 0
    counsellor_id: Optional[UUID] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class ProfileResponse(ProfileInDB):
    """Profile response model"""
    pass


class ProfileCompletionResponse(BaseModel):
    """Profile completion status"""
    completion_percentage: int
    missing_fields: list[str]
    completed_sections: list[str]









