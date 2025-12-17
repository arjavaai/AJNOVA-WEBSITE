"""
Working FastAPI app without OpenAPI schema generation
Compatible with Python 3.9+
"""

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.config import settings

# Create app without docs (to avoid Pydantic v2 + Python 3.9 compatibility issue)
app = FastAPI(
    title="AJ NOVA API",
    description="Backend API for AJ NOVA Platform",
    version="1.0.0",
    docs_url=None,  # Disable Swagger UI
    redoc_url=None,  # Disable ReDoc
    openapi_url=None,  # Disable OpenAPI schema
)

# CORS - Very permissive for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
    expose_headers=["*"],
    max_age=3600,  # Cache preflight requests for 1 hour
)

@app.get("/")
async def root():
    return {
        "message": "AJ NOVA API",
        "status": "ok",
        "version": "1.0.0",
        "note": "OpenAPI docs disabled due to Python 3.9 compatibility"
    }

@app.get("/api/health")
async def health():
    return {"status": "healthy"}

@app.get("/health")
async def health_root():
    return {"status": "healthy"}

# Global OPTIONS handler for CORS preflight
@app.options("/{full_path:path}")
async def options_handler(request: Request):
    return Response(
        status_code=200,
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
        }
    )

# Add middleware to log all requests and ensure CORS on errors
@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f"\n[REQUEST] {request.method} {request.url}")
    print(f"[HEADERS] Origin: {request.headers.get('origin')}")
    print(f"[HEADERS] Authorization: {request.headers.get('authorization', 'None')[:50]}...")
    
    try:
        response = await call_next(request)
        print(f"[RESPONSE] Status: {response.status_code}")
        
        # Ensure CORS headers are always present
        origin = request.headers.get('origin', '*')
        response.headers["Access-Control-Allow-Origin"] = origin if origin != 'null' else "*"
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
        response.headers["Access-Control-Allow-Headers"] = "*"
        
        return response
    except Exception as e:
        print(f"[ERROR] Request failed: {e}")
        # Return error with CORS headers
        from fastapi.responses import JSONResponse
        return JSONResponse(
            status_code=500,
            content={"detail": str(e)},
            headers={
                "Access-Control-Allow-Origin": request.headers.get('origin', '*'),
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
                "Access-Control-Allow-Headers": "*",
            }
        )

# Import and register routers
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

print("[SUCCESS] Backend server started successfully")
print("[INFO] API available at http://localhost:8000")
print("[NOTE] Swagger UI disabled - upgrade to Python 3.10+ to enable")
