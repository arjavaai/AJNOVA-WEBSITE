"""
Notification service
Creates notifications in database for real-time delivery via Supabase
"""

from supabase import Client
from typing import Optional
from uuid import UUID
import logging

logger = logging.getLogger(__name__)


class NotificationService:
    """Notification service"""
    
    def __init__(self, supabase: Client):
        self.supabase = supabase
    
    async def create_notification(
        self,
        user_id: UUID,
        notification_type: str,
        title: str,
        message: str,
        link: Optional[str] = None,
        metadata: Optional[dict] = None
    ) -> dict:
        """
        Create notification in database
        Supabase Realtime will automatically broadcast to subscribed clients
        """
        try:
            notification_data = {
                "user_id": str(user_id),
                "type": notification_type,
                "title": title,
                "message": message,
                "link": link,
                "metadata": metadata or {},
                "is_read": False
            }
            
            response = self.supabase.table("notifications").insert(notification_data).execute()
            return response.data[0] if response.data else None
            
        except Exception as e:
            logger.error(f"Failed to create notification: {str(e)}")
            return None
    
    async def notify_document_approved(
        self,
        user_id: UUID,
        document_type: str,
        document_id: UUID
    ):
        """Notify user that document was approved"""
        return await self.create_notification(
            user_id=user_id,
            notification_type="document_approved",
            title="Document Approved",
            message=f"Your {document_type.upper()} has been approved!",
            link=f"/dashboard/documents/{document_id}"
        )
    
    async def notify_document_needs_revision(
        self,
        user_id: UUID,
        document_type: str,
        document_id: UUID
    ):
        """Notify user that document needs revision"""
        return await self.create_notification(
            user_id=user_id,
            notification_type="document_revision",
            title="Revision Needed",
            message=f"Your {document_type.upper()} needs some revisions",
            link=f"/dashboard/documents/{document_id}"
        )
    
    async def notify_new_message(
        self,
        user_id: UUID,
        sender_name: str,
        message_id: UUID
    ):
        """Notify user of new message"""
        return await self.create_notification(
            user_id=user_id,
            notification_type="new_message",
            title="New Message",
            message=f"New message from {sender_name}",
            link=f"/dashboard/messages/{message_id}"
        )
    
    async def notify_consultation_scheduled(
        self,
        user_id: UUID,
        scheduled_at: str,
        consultation_id: UUID
    ):
        """Notify user of scheduled consultation"""
        return await self.create_notification(
            user_id=user_id,
            notification_type="consultation_scheduled",
            title="Consultation Scheduled",
            message=f"Your consultation is scheduled for {scheduled_at}",
            link=f"/dashboard/consultations/{consultation_id}"
        )
    
    async def notify_application_update(
        self,
        user_id: UUID,
        university: str,
        status: str,
        application_id: UUID
    ):
        """Notify user of application status update"""
        return await self.create_notification(
            user_id=user_id,
            notification_type="application_update",
            title="Application Update",
            message=f"Your application to {university} is now {status}",
            link=f"/dashboard/applications/{application_id}"
        )



























