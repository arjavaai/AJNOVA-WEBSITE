"""
Storage service
Handles file uploads to Supabase Storage
"""

from fastapi import UploadFile, HTTPException
from supabase import Client
from typing import Optional
import uuid
import logging

from app.config import settings

logger = logging.getLogger(__name__)


class StorageService:
    """File storage service"""
    
    def __init__(self, supabase: Client):
        self.supabase = supabase
        self.bucket_name = "documents"
    
    async def upload_file(
        self,
        file: UploadFile,
        user_id: str,
        category: str = "other"
    ) -> dict:
        """
        Upload file to Supabase Storage
        
        Args:
            file: Uploaded file
            user_id: User ID for organizing files
            category: File category (passport, transcript, etc.)
        
        Returns:
            Dictionary with file_url, file_name, file_size, mime_type
        """
        # Validate file size
        file_content = await file.read()
        file_size = len(file_content)
        
        if file_size > settings.MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail=f"File size exceeds maximum allowed size of {settings.MAX_FILE_SIZE / 1024 / 1024}MB"
            )
        
        # Validate file type
        if file.content_type not in settings.ALLOWED_FILE_TYPES:
            raise HTTPException(
                status_code=400,
                detail=f"File type {file.content_type} not allowed"
            )
        
        # Generate unique file path
        file_extension = file.filename.split(".")[-1] if "." in file.filename else ""
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        file_path = f"{user_id}/{category}/{unique_filename}"
        
        try:
            # Upload to Supabase Storage
            response = self.supabase.storage.from_(self.bucket_name).upload(
                path=file_path,
                file=file_content,
                file_options={"content-type": file.content_type}
            )
            
            # Get public URL
            file_url = self.supabase.storage.from_(self.bucket_name).get_public_url(file_path)
            
            return {
                "file_url": file_url,
                "file_name": file.filename,
                "file_size": file_size,
                "mime_type": file.content_type,
                "storage_path": file_path
            }
            
        except Exception as e:
            logger.error(f"File upload failed: {str(e)}")
            raise HTTPException(status_code=500, detail="File upload failed")
    
    async def delete_file(self, file_path: str) -> bool:
        """Delete file from storage"""
        try:
            self.supabase.storage.from_(self.bucket_name).remove([file_path])
            return True
        except Exception as e:
            logger.error(f"File deletion failed: {str(e)}")
            return False
    
    async def get_file_url(self, file_path: str) -> str:
        """Get public URL for file"""
        return self.supabase.storage.from_(self.bucket_name).get_public_url(file_path)









