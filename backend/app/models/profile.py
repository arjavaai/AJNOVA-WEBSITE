"""Profile models"""

from pydantic import BaseModel, Field, model_validator, field_validator
from typing import Optional, Dict, Any, Union
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
    date_of_birth: Optional[Union[date, str]] = None
    gender: Optional[str] = None
    nationality: Optional[str] = None
    country_of_residence: Optional[str] = None
    passport_number: Optional[str] = None
    passport_expiry: Optional[Union[date, str]] = None
    mobile_number: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[Dict[str, Any]] = None

    # Academic Background - Simple fields (for backwards compatibility)
    highest_qualification: Optional[str] = None
    field_of_study: Optional[str] = None
    institution_name: Optional[str] = None
    country_of_education: Optional[str] = None
    graduation_year: Optional[int] = None
    cgpa_percentage: Optional[float] = None
    cgpa_type: Optional[str] = None
    backlogs: Optional[int] = None
    medium_of_instruction: Optional[str] = None

    # Academic Background - Complex (supports multiple degrees as JSON array)
    education: Optional[list] = None

    # Language & Test Scores
    english_test_type: Optional[str] = None  # IELTS, TOEFL, None, Pending
    english_score: Optional[float] = None
    english_test_date: Optional[Union[date, str]] = None
    german_level: Optional[str] = None  # None, A1, A2, B1, B2, C1
    german_test_date: Optional[Union[date, str]] = None
    other_tests: Optional[str] = None  # GRE, GMAT, etc.

    # Work Experience
    work_experience_years: Optional[str] = None
    work_experience: Optional[list] = None

    # Preferences & Contact
    preferred_intake: Optional[str] = None  # WINTER_2025, SUMMER_2026, etc.
    interested_country: str = "Germany"
    study_level: Optional[str] = None  # BACHELORS, MASTERS, PHD
    preferred_program: Optional[str] = None

    @field_validator('date_of_birth', 'passport_expiry', 'english_test_date', 'german_test_date', mode='before')
    @classmethod
    def parse_date(cls, value):
        """Convert string dates to date objects"""
        if value is None or value == '':
            return None
        if isinstance(value, date):
            return value
        if isinstance(value, str):
            try:
                # Parse ISO format date string (YYYY-MM-DD)
                return datetime.strptime(value, '%Y-%m-%d').date()
            except ValueError:
                return None
        return value


class ProfileCreate(ProfileBase):
    """Profile creation model"""
    user_id: UUID


class ProfileUpdate(ProfileBase):
    """Profile update model - all fields optional"""

    @model_validator(mode='before')
    @classmethod
    def clean_empty_strings(cls, values):
        """Convert empty strings to None before validation"""
        if isinstance(values, dict):
            cleaned = {}
            for key, value in values.items():
                if isinstance(value, str) and value.strip() == '':
                    cleaned[key] = None
                else:
                    cleaned[key] = value
            return cleaned
        return values


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


















