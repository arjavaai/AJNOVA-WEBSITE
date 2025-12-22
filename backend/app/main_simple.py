"""
Simplified FastAPI app for debugging
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings

# Create simple app
app = FastAPI(
    title="AJ NOVA API",
    description="Backend API for AJ NOVA Platform",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "AJ NOVA API", "status": "ok"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

# Try importing routers one by one
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
























