"""
Authentication service
Handles Google OAuth and JWT token generation
"""

import requests
from datetime import datetime, timedelta
from jose import jwt
from typing import Optional, Dict, Any
from supabase import Client

from app.config import settings
from app.models.user import UserCreate, UserInDB, TokenResponse, UserResponse


class AuthService:
    """Authentication service"""
    
    def __init__(self, supabase: Client):
        self.supabase = supabase
    
    def create_access_token(self, data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
        """Create JWT access token"""
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
        return encoded_jwt
    
    async def exchange_google_code(self, code: str) -> Dict[str, Any]:
        """Exchange Google authorization code for tokens"""
        token_url = "https://oauth2.googleapis.com/token"
        
        data = {
            "code": code,
            "client_id": settings.GOOGLE_CLIENT_ID,
            "client_secret": settings.GOOGLE_CLIENT_SECRET,
            "redirect_uri": settings.GOOGLE_REDIRECT_URI,
            "grant_type": "authorization_code"
        }
        
        response = requests.post(token_url, data=data)
        response.raise_for_status()
        return response.json()
    
    async def get_google_user_info(self, access_token: str) -> Dict[str, Any]:
        """Get user information from Google"""
        user_info_url = "https://www.googleapis.com/oauth2/v2/userinfo"
        headers = {"Authorization": f"Bearer {access_token}"}
        
        response = requests.get(user_info_url, headers=headers)
        response.raise_for_status()
        return response.json()
    
    async def create_or_update_user(self, google_user: Dict[str, Any]) -> UserInDB:
        """Create or update user in database"""
        google_id = google_user["id"]
        
        # Check if user exists
        response = self.supabase.table("users").select("*").eq("google_id", google_id).execute()
        
        if response.data:
            # Update existing user
            user_data = response.data[0]
            update_data = {
                "last_login": datetime.utcnow().isoformat(),
                "name": google_user.get("name"),
                "profile_picture_url": google_user.get("picture"),
            }
            
            updated = self.supabase.table("users").update(update_data).eq("id", user_data["id"]).execute()
            return UserInDB(**updated.data[0])
        else:
            # Create new user
            new_user = {
                "email": google_user["email"],
                "name": google_user.get("name"),
                "google_id": google_id,
                "profile_picture_url": google_user.get("picture"),
                "role": "student",  # Default role
                "auth_provider": "google",
                "status": "active"
            }
            
            created = self.supabase.table("users").insert(new_user).execute()
            return UserInDB(**created.data[0])
    
    async def authenticate_with_google(self, code: str) -> TokenResponse:
        """Complete Google OAuth flow and return JWT token"""
        # Exchange code for tokens
        tokens = await self.exchange_google_code(code)
        
        # Get user info from Google
        google_user = await self.get_google_user_info(tokens["access_token"])
        
        # Create or update user in our database
        user = await self.create_or_update_user(google_user)
        
        # Create JWT token
        access_token = self.create_access_token(data={"sub": str(user.id)})
        
        # Return token response
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            user=UserResponse(**user.dict())
        )
    
    def get_google_oauth_url(self) -> str:
        """Get Google OAuth authorization URL"""
        base_url = "https://accounts.google.com/o/oauth2/v2/auth"
        params = {
            "client_id": settings.GOOGLE_CLIENT_ID,
            "redirect_uri": settings.GOOGLE_REDIRECT_URI,
            "response_type": "code",
            "scope": "openid email profile",
            "access_type": "offline",
            "prompt": "consent"
        }
        
        query_string = "&".join([f"{k}={v}" for k, v in params.items()])
        return f"{base_url}?{query_string}"









