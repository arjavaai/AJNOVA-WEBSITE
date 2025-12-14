"""
Shared dependencies for dependency injection
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from supabase import create_client, Client
from typing import Optional

from app.config import settings
from app.models.user import UserInDB

# Security
security = HTTPBearer()

# Supabase client
def get_supabase() -> Client:
    """Get Supabase client instance"""
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


def get_supabase_admin() -> Client:
    """Get Supabase admin client instance with service role key"""
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_KEY)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    supabase: Client = Depends(get_supabase)
) -> UserInDB:
    """
    Dependency to get current authenticated user from Supabase JWT token
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        token = credentials.credentials
        print(f"Received token: {token[:50]}...")  # Print first 50 chars

        # Decode and verify Supabase JWT token
        # The JWT secret can be found in Supabase Dashboard > Settings > API > JWT Settings
        import jwt as pyjwt
        from app.config import settings

        print(f"JWT Secret configured: {bool(settings.SUPABASE_JWT_SECRET)}")

        # Verify the token signature using Supabase JWT secret
        decoded = pyjwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            audience="authenticated",
            algorithms=["HS256"]
        )
        print(f"Token decoded successfully, user_id: {decoded.get('sub')}")
        user_id = decoded.get("sub")

        if not user_id:
            print("No user_id in token")
            raise credentials_exception

    except Exception as e:
        print(f"Token validation error: {type(e).__name__}: {e}")
        raise credentials_exception

    # Get user from database
    print(f"Fetching user from database with ID: {user_id}")
    response = supabase.table("users").select("*").eq("id", user_id).execute()

    print(f"Database response: {response.data}")

    if not response.data:
        print("No user found in database, creating new user...")
        # User exists in Supabase Auth but not in our users table
        # Get user info from Supabase Auth using admin client
        supabase_admin = get_supabase_admin()
        auth_user = supabase_admin.auth.admin.get_user_by_id(user_id)

        if not auth_user or not auth_user.user:
            print("User not found in Supabase Auth either!")
            raise credentials_exception

        # Create user record
        new_user = {
            "id": user_id,
            "email": auth_user.user.email,
            "name": auth_user.user.user_metadata.get("full_name") or auth_user.user.user_metadata.get("name"),
            "profile_picture_url": auth_user.user.user_metadata.get("avatar_url") or auth_user.user.user_metadata.get("picture"),
            "role": "student",  # Default role
            "auth_provider": "google",
            "status": "active"
        }

        created = supabase.table("users").insert(new_user).execute()
        user_data = created.data[0]
        print(f"User created: {user_data.get('email')}")
    else:
        user_data = response.data[0]
        print(f"User data found: {user_data.get('email', 'NO EMAIL')}")

    return UserInDB(**user_data)


async def get_current_active_user(
    current_user: UserInDB = Depends(get_current_user)
) -> UserInDB:
    """Get current active user"""
    if current_user.status != "active":
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


class RoleChecker:
    """Dependency class to check user roles"""
    
    def __init__(self, allowed_roles: list[str]):
        self.allowed_roles = allowed_roles
    
    def __call__(self, user: UserInDB = Depends(get_current_active_user)):
        if user.role not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )
        return user


# Role dependency factories
require_student = RoleChecker(["student"])
require_counsellor = RoleChecker(["counsellor", "admin"])
require_admin = RoleChecker(["admin"])














