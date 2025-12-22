"""Message models"""

from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime
from uuid import UUID


class MessageBase(BaseModel):
    """Base message model"""
    message: str
    attachments: Optional[Dict[str, Any]] = None


class MessageCreate(MessageBase):
    """Message creation"""
    receiver_id: UUID
    conversation_id: Optional[UUID] = None


class MessageUpdate(BaseModel):
    """Message update"""
    read: bool = True


class MessageInDB(MessageBase):
    """Message in database"""
    id: UUID
    conversation_id: UUID
    sender_id: UUID
    receiver_id: UUID
    read: bool = False
    read_at: Optional[datetime] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


class MessageResponse(MessageInDB):
    """Message response"""
    pass


class MessageListResponse(BaseModel):
    """Message list response"""
    messages: list[MessageResponse]
    total: int
    unread_count: int























