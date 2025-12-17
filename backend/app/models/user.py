"""User models"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from uuid import UUID


class UserBase(BaseModel):
    """Base user model"""
    email: EmailStr
    name: Optional[str] = None
    role: str = Field(..., pattern="^(student|counsellor|admin)$")


class UserCreate(UserBase):
    """User creation model"""
    google_id: str
    profile_photo_url: Optional[str] = None


class UserUpdate(BaseModel):
    """User update model"""
    name: Optional[str] = None
    profile_photo_url: Optional[str] = None


class UserInDB(UserBase):
    """User model as stored in database"""
    id: UUID
    auth_provider: str = "google"
    google_id: Optional[str] = None
    profile_picture_url: Optional[str] = None
    profile_photo_url: Optional[str] = None
    phone: Optional[str] = None
    status: str = "active"
    created_at: datetime
    last_login: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class UserResponse(BaseModel):
    """User response model"""
    id: UUID
    email: str
    name: Optional[str]
    role: str
    profile_picture_url: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    """JWT token response"""
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
















