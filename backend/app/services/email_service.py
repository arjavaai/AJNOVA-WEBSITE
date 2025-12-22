"""
Email notification service
Handles sending emails via SendGrid
"""

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content
from typing import List, Optional
import logging

from app.config import settings

logger = logging.getLogger(__name__)


class EmailService:
    """Email service for notifications"""
    
    def __init__(self):
        self.client = SendGridAPIClient(settings.SENDGRID_API_KEY) if settings.SENDGRID_API_KEY else None
        self.from_email = settings.FROM_EMAIL
    
    async def send_email(
        self,
        to_email: str,
        subject: str,
        html_content: str,
        plain_content: Optional[str] = None
    ) -> bool:
        """Send email"""
        if not self.client:
            logger.warning("SendGrid not configured, skipping email")
            return False
        
        try:
            message = Mail(
                from_email=self.from_email,
                to_emails=to_email,
                subject=subject,
                html_content=html_content,
                plain_text_content=plain_content or ""
            )
            
            response = self.client.send(message)
            logger.info(f"Email sent to {to_email}: {response.status_code}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email to {to_email}: {str(e)}")
            return False
    
    async def send_welcome_email(self, to_email: str, name: str) -> bool:
        """Send welcome email to new user"""
        subject = "Welcome to AJ NOVA!"
        html_content = f"""
        <html>
            <body>
                <h1>Welcome to AJ NOVA, {name}!</h1>
                <p>We're excited to help you with your German university admissions journey.</p>
                <p>Get started by completing your profile to unlock AI-powered document generation and personalized guidance.</p>
                <p><a href="{settings.FRONTEND_URL}/dashboard/profile">Complete Your Profile →</a></p>
                <br>
                <p>Best regards,<br>The AJ NOVA Team</p>
            </body>
        </html>
        """
        return await self.send_email(to_email, subject, html_content)
    
    async def send_document_approved_email(
        self,
        to_email: str,
        name: str,
        document_type: str
    ) -> bool:
        """Send document approval notification"""
        subject = f"Your {document_type.upper()} has been approved!"
        html_content = f"""
        <html>
            <body>
                <h2>Great news, {name}!</h2>
                <p>Your {document_type.upper()} has been reviewed and approved by our counsellors.</p>
                <p>You can now download the final version from your dashboard.</p>
                <p><a href="{settings.FRONTEND_URL}/dashboard/documents">View Documents →</a></p>
                <br>
                <p>Best regards,<br>The AJ NOVA Team</p>
            </body>
        </html>
        """
        return await self.send_email(to_email, subject, html_content)
    
    async def send_document_needs_revision_email(
        self,
        to_email: str,
        name: str,
        document_type: str,
        comments: str
    ) -> bool:
        """Send document revision request notification"""
        subject = f"Revision needed for your {document_type.upper()}"
        html_content = f"""
        <html>
            <body>
                <h2>Hi {name},</h2>
                <p>Your {document_type.upper()} has been reviewed and needs some revisions.</p>
                <p><strong>Counsellor Comments:</strong></p>
                <p>{comments}</p>
                <p><a href="{settings.FRONTEND_URL}/dashboard/documents">Edit Document →</a></p>
                <br>
                <p>Best regards,<br>The AJ NOVA Team</p>
            </body>
        </html>
        """
        return await self.send_email(to_email, subject, html_content)
    
    async def send_consultation_reminder_email(
        self,
        to_email: str,
        name: str,
        scheduled_at: str,
        meeting_link: Optional[str] = None
    ) -> bool:
        """Send consultation reminder"""
        subject = "Consultation Reminder - AJ NOVA"
        meeting_info = f'<p><a href="{meeting_link}">Join Meeting →</a></p>' if meeting_link else ""
        
        html_content = f"""
        <html>
            <body>
                <h2>Hi {name},</h2>
                <p>This is a reminder about your upcoming consultation.</p>
                <p><strong>Scheduled:</strong> {scheduled_at}</p>
                {meeting_info}
                <p>Please be ready 5 minutes before the scheduled time.</p>
                <br>
                <p>Best regards,<br>The AJ NOVA Team</p>
            </body>
        </html>
        """
        return await self.send_email(to_email, subject, html_content)
























