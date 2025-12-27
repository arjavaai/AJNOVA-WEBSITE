"""
AJ NOVA Backend API - Production Ready
FastAPI backend for immigration consultancy platform
Compatible with Python 3.9+ and Replit deployment
"""

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.config import settings
import json

# Create FastAPI application
app = FastAPI(
    title="AJ NOVA API",
    description="Backend API for AJ NOVA Immigration Consultancy Platform",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# Custom ASGI wrapper to add CORS headers
class CORSMiddlewareWrapper:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        # Get origin from request headers
        origin = None
        for header_name, header_value in scope.get("headers", []):
            if header_name == b"origin":
                origin = header_value.decode()
                break

        # Check if origin is allowed
        allowed_origin = origin if origin and self._is_allowed_origin(origin) else settings.FRONTEND_URL.encode()
        if isinstance(allowed_origin, str):
            allowed_origin = allowed_origin.encode()

        # Handle CORS preflight requests
        if scope["method"] == "OPTIONS":
            headers = [
                [b"access-control-allow-origin", allowed_origin],
                [b"access-control-allow-credentials", b"true"],
                [b"access-control-allow-methods", b"GET, POST, PUT, DELETE, OPTIONS, PATCH"],
                [b"access-control-allow-headers", b"*"],
                [b"content-type", b"application/json"],
            ]
            await send({
                "type": "http.response.start",
                "status": 200,
                "headers": headers,
            })
            await send({
                "type": "http.response.body",
                "body": b'{"message": "CORS preflight OK"}',
            })
            return

        # Wrap the send function to add CORS headers to all responses
        async def send_with_cors(message):
            if message["type"] == "http.response.start":
                headers = list(message.get("headers", []))
                # Add CORS headers
                cors_headers = [
                    [b"access-control-allow-origin", allowed_origin],
                    [b"access-control-allow-credentials", b"true"],
                    [b"access-control-allow-methods", b"GET, POST, PUT, DELETE, OPTIONS, PATCH"],
                    [b"access-control-allow-headers", b"*"],
                ]
                headers.extend(cors_headers)
                message["headers"] = headers
            await send(message)

        await self.app(scope, receive, send_with_cors)

    def _is_allowed_origin(self, origin: str) -> bool:
        """Check if origin is in allowed CORS origins"""
        return origin in settings.CORS_ORIGINS

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "AJ NOVA API - Immigration Consultancy Platform",
        "status": "online",
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT,
        "docs": "/api/docs"
    }

# Health check endpoints
@app.get("/health")
async def health():
    return {"status": "healthy", "service": "AJ NOVA Backend"}

@app.get("/api/health")
async def api_health():
    return {"status": "healthy", "service": "AJ NOVA Backend API"}

# Test endpoint for CORS
@app.get("/cors-test")
async def cors_test():
    return {"message": "CORS test", "status": "OK", "timestamp": "test"}

# CORS test endpoint
@app.get("/cors-test")
async def cors_test():
    return {"message": "CORS test successful", "origin": "allowed"}

# Import and register API routers
print("[INFO] Loading API routers...")

try:
    from app.api.v1 import auth
    app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
    print("[OK] Auth router loaded")
except Exception as e:
    print(f"[ERROR] Auth router failed: {e}")

try:
    from app.api.v1 import users
    app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
    print("[OK] Users router loaded")
except Exception as e:
    print(f"[ERROR] Users router failed: {e}")

try:
    from app.api.v1 import profiles
    app.include_router(profiles.router, prefix="/api/v1/profiles", tags=["Profiles"])
    print("[OK] Profiles router loaded")
except Exception as e:
    print(f"[ERROR] Profiles router failed: {e}")

try:
    from app.api.v1 import documents
    app.include_router(documents.router, prefix="/api/v1/documents", tags=["Documents"])
    print("[OK] Documents router loaded")
except Exception as e:
    print(f"[ERROR] Documents router failed: {e}")

try:
    from app.api.v1 import eligibility
    app.include_router(eligibility.router, prefix="/api/v1/eligibility", tags=["Eligibility"])
    print("[OK] Eligibility router loaded")
except Exception as e:
    print(f"[ERROR] Eligibility router failed: {e}")

try:
    from app.api.v1 import aps
    app.include_router(aps.router, prefix="/api/v1/aps", tags=["APS"])
    print("[OK] APS router loaded")
except Exception as e:
    print(f"[ERROR] APS router failed: {e}")

try:
    from app.api.v1 import applications
    app.include_router(applications.router, prefix="/api/v1/applications", tags=["Applications"])
    print("[OK] Applications router loaded")
except Exception as e:
    print(f"[ERROR] Applications router failed: {e}")

try:
    from app.api.v1 import messages
    app.include_router(messages.router, prefix="/api/v1/messages", tags=["Messages"])
    print("[OK] Messages router loaded")
except Exception as e:
    print(f"[ERROR] Messages router failed: {e}")

try:
    from app.api.v1 import consultations
    app.include_router(consultations.router, prefix="/api/v1/consultations", tags=["Consultations"])
    print("[OK] Consultations router loaded")
except Exception as e:
    print(f"[ERROR] Consultations router failed: {e}")

try:
    from app.api.v1 import admin
    app.include_router(admin.router, prefix="/api/v1/admin", tags=["Admin"])
    print("[OK] Admin router loaded")
except Exception as e:
    print(f"[ERROR] Admin router failed: {e}")

try:
    from app.api.v1 import notifications
    app.include_router(notifications.router, prefix="/api/v1/notifications", tags=["Notifications"])
    print("[OK] Notifications router loaded")
except Exception as e:
    print(f"[ERROR] Notifications router failed: {e}")

print("[SUCCESS] AJ NOVA Backend API initialized")
print(f"[INFO] Environment: {settings.ENVIRONMENT}")
print(f"[INFO] CORS Origins: {settings.CORS_ORIGINS}")
print("[INFO] API Documentation available at /api/docs")

# Wrap the FastAPI app with CORS middleware
app = CORSMiddlewareWrapper(app)

# For local development and Replit
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
