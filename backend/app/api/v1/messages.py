"""
Messaging system endpoints
"""

from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from uuid import UUID

from app.dependencies import get_supabase, get_current_user
from app.models.message import MessageResponse, MessageCreate, MessageUpdate, MessageListResponse
from app.services.notification_service import NotificationService

router = APIRouter()


@router.get("", response_model=MessageListResponse)
async def get_messages(
    conversation_id: UUID = None,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Get messages for current user"""
    query = supabase.table("messages").select("*")
    
    if conversation_id:
        query = query.eq("conversation_id", str(conversation_id))
    else:
        # Get all conversations where user is sender or receiver
        query = query.or_(f"sender_id.eq.{current_user.id},receiver_id.eq.{current_user.id}")
    
    response = query.order("created_at", desc=True).execute()
    
    messages = [MessageResponse(**msg) for msg in response.data]
    
    # Count unread messages
    unread_count = sum(1 for msg in messages if not msg.is_read and str(msg.receiver_id) == str(current_user.id))
    
    return MessageListResponse(
        messages=messages,
        total=len(messages),
        unread_count=unread_count
    )


@router.post("", response_model=MessageResponse)
async def send_message(
    message: MessageCreate,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Send a message"""
    import uuid
    
    message_data = {
        "sender_id": str(current_user.id),
        "receiver_id": str(message.receiver_id),
        "conversation_id": str(message.conversation_id) if message.conversation_id else str(uuid.uuid4()),
        "message": message.message,
        "attachments": message.attachments,
        "is_read": False
    }
    
    response = supabase.table("messages").insert(message_data).execute()
    
    # Send notification to receiver
    notification_service = NotificationService(supabase)
    await notification_service.notify_new_message(
        user_id=message.receiver_id,
        sender_name=current_user.name or "Someone",
        message_id=UUID(response.data[0]["id"])
    )
    
    return MessageResponse(**response.data[0])


@router.put("/{message_id}/read", response_model=MessageResponse)
async def mark_message_read(
    message_id: UUID,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Mark message as read"""
    from datetime import datetime
    
    # Check if user is receiver
    response = supabase.table("messages").select("*").eq("id", str(message_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Message not found")
    
    message = response.data[0]
    
    if message["receiver_id"] != str(current_user.id):
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Update message
    updated = supabase.table("messages").update({
        "is_read": True,
        "read_at": datetime.utcnow().isoformat()
    }).eq("id", str(message_id)).execute()
    
    return MessageResponse(**updated.data[0])


















