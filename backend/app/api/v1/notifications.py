"""
Notification API endpoints for student dashboard
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from supabase import Client
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID

from app.dependencies import get_supabase, get_current_user

router = APIRouter()


# Response Models
class NotificationResponse(BaseModel):
    id: str
    user_id: str
    type: str
    title: str
    message: str
    link: Optional[str] = None
    metadata: Optional[dict] = None
    is_read: bool
    read_at: Optional[datetime] = None
    created_at: datetime


class NotificationListResponse(BaseModel):
    notifications: list[NotificationResponse]
    total: int
    unread_count: int


class UnreadCountResponse(BaseModel):
    count: int


class MarkReadRequest(BaseModel):
    is_read: bool = True


# GET /api/v1/notifications - List user notifications with pagination
@router.get("", response_model=NotificationListResponse)
async def get_notifications(
    limit: int = Query(default=20, le=100),
    offset: int = Query(default=0, ge=0),
    type_filter: Optional[str] = Query(default=None, alias="type"),
    is_read: Optional[bool] = Query(default=None),
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """
    Get user notifications with filtering and pagination

    Args:
        limit: Maximum number of notifications to return (default 20, max 100)
        offset: Number of notifications to skip (for pagination)
        type_filter: Filter by notification type
        is_read: Filter by read status (true/false/null for all)

    Returns:
        List of notifications with total count and unread count
    """
    try:
        user_id = current_user.get("id")

        # Build query
        query = supabase.table("notifications").select("*", count="exact")
        query = query.eq("user_id", user_id)

        # Apply filters
        if type_filter:
            query = query.eq("type", type_filter)

        if is_read is not None:
            query = query.eq("is_read", is_read)

        # Order by created_at descending (newest first)
        query = query.order("created_at", desc=True)

        # Apply pagination
        query = query.range(offset, offset + limit - 1)

        # Execute query
        response = query.execute()

        # Get unread count
        unread_response = supabase.table("notifications")\
            .select("id", count="exact")\
            .eq("user_id", user_id)\
            .eq("is_read", False)\
            .execute()

        unread_count = unread_response.count if hasattr(unread_response, 'count') else 0

        return NotificationListResponse(
            notifications=response.data,
            total=response.count if hasattr(response, 'count') else len(response.data),
            unread_count=unread_count
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching notifications: {str(e)}")


# GET /api/v1/notifications/unread - Get unread count
@router.get("/unread", response_model=UnreadCountResponse)
async def get_unread_count(
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """
    Get count of unread notifications for current user

    Returns:
        Count of unread notifications
    """
    try:
        user_id = current_user.get("id")

        response = supabase.table("notifications")\
            .select("id", count="exact")\
            .eq("user_id", user_id)\
            .eq("is_read", False)\
            .execute()

        count = response.count if hasattr(response, 'count') else 0

        return UnreadCountResponse(count=count)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching unread count: {str(e)}")


# PUT /api/v1/notifications/{notification_id}/read - Mark as read
@router.put("/{notification_id}/read")
async def mark_notification_read(
    notification_id: str,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """
    Mark a notification as read

    Args:
        notification_id: UUID of the notification

    Returns:
        Updated notification
    """
    try:
        user_id = current_user.get("id")

        # Verify notification belongs to user
        check_response = supabase.table("notifications")\
            .select("id")\
            .eq("id", notification_id)\
            .eq("user_id", user_id)\
            .execute()

        if not check_response.data:
            raise HTTPException(status_code=404, detail="Notification not found")

        # Update notification
        update_response = supabase.table("notifications")\
            .update({
                "is_read": True,
                "read_at": datetime.utcnow().isoformat()
            })\
            .eq("id", notification_id)\
            .execute()

        return {"success": True, "notification": update_response.data[0] if update_response.data else None}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error marking notification as read: {str(e)}")


# PUT /api/v1/notifications/read-all - Mark all as read
@router.put("/read-all")
async def mark_all_read(
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """
    Mark all user notifications as read

    Returns:
        Success message with count of updated notifications
    """
    try:
        user_id = current_user.get("id")

        # Update all unread notifications for this user
        response = supabase.table("notifications")\
            .update({
                "is_read": True,
                "read_at": datetime.utcnow().isoformat()
            })\
            .eq("user_id", user_id)\
            .eq("is_read", False)\
            .execute()

        updated_count = len(response.data) if response.data else 0

        return {
            "success": True,
            "message": f"Marked {updated_count} notifications as read",
            "updated_count": updated_count
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error marking all as read: {str(e)}")


# DELETE /api/v1/notifications/{notification_id} - Delete notification
@router.delete("/{notification_id}")
async def delete_notification(
    notification_id: str,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """
    Delete a notification

    Args:
        notification_id: UUID of the notification

    Returns:
        Success message
    """
    try:
        user_id = current_user.get("id")

        # Verify notification belongs to user before deleting
        check_response = supabase.table("notifications")\
            .select("id")\
            .eq("id", notification_id)\
            .eq("user_id", user_id)\
            .execute()

        if not check_response.data:
            raise HTTPException(status_code=404, detail="Notification not found")

        # Delete notification
        supabase.table("notifications")\
            .delete()\
            .eq("id", notification_id)\
            .execute()

        return {
            "success": True,
            "message": "Notification deleted successfully"
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting notification: {str(e)}")
