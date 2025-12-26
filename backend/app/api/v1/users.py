"""
User management endpoints
"""

from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from uuid import UUID

from app.dependencies import get_supabase, get_current_user, require_admin
from app.models.user import UserResponse, UserUpdate

router = APIRouter()


@router.get("/me", response_model=UserResponse)
async def get_my_info(current_user = Depends(get_current_user)):
    """Get current user information"""
    return current_user


@router.put("/me", response_model=UserResponse)
async def update_my_info(
    user_update: UserUpdate,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Update current user information"""
    update_data = user_update.dict(exclude_unset=True)
    
    if not update_data:
        return current_user
    
    response = supabase.table("users").update(update_data).eq("id", str(current_user.id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UserResponse(**response.data[0])


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: UUID,
    supabase: Client = Depends(get_supabase),
    current_user = Depends(require_admin)
):
    """Get user by ID (admin only)"""
    response = supabase.table("users").select("*").eq("id", str(user_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UserResponse(**response.data[0])


























