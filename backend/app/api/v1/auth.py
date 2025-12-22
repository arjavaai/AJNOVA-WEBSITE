"""
Authentication endpoints
"""

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse
from supabase import Client

from app.dependencies import get_supabase, get_current_user
from app.services.auth_service import AuthService
from app.models.user import UserResponse, TokenResponse

router = APIRouter()


@router.get("/google")
async def google_login(supabase: Client = Depends(get_supabase)):
    """Initiate Google OAuth flow"""
    auth_service = AuthService(supabase)
    oauth_url = auth_service.get_google_oauth_url()
    return RedirectResponse(url=oauth_url)


@router.get("/google/callback")
async def google_callback(code: str, supabase: Client = Depends(get_supabase)):
    """Handle Google OAuth callback"""
    try:
        auth_service = AuthService(supabase)
        token_response = await auth_service.authenticate_with_google(code)
        
        # Redirect to frontend with token
        from app.config import settings
        redirect_url = f"{settings.FRONTEND_URL}/dashboard?token={token_response.access_token}"
        return RedirectResponse(url=redirect_url)
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user = Depends(get_current_user)):
    """Get current authenticated user"""
    return current_user


@router.post("/logout")
async def logout():
    """Logout user"""
    return {"message": "Logged out successfully"}
























