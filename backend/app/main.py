"""
AJ NOVA Platform - FastAPI Backend
Main application entry point
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.config import settings

# Import all routers first
from app.api.v1 import (
    auth,
    users,
    profiles,
    eligibility,
    aps,
    documents,
    applications,
    messages,
    consultations,
    admin
)

# Initialize FastAPI application
app = FastAPI(
    title="AJ NOVA API",
    description="Backend API for AJ NOVA German University Admissions Platform",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# Startup event
@app.on_event("startup")
async def startup_event():
    print("Starting AJ NOVA Backend API...")
    print(f"Environment: {settings.ENVIRONMENT}")
    print(f"API URL: {settings.BACKEND_URL}")

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    print("Shutting down AJ NOVA Backend API...")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,  # This now calls the property
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GZip Compression
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Exception Handlers
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc: RequestValidationError):
    """Handle validation errors"""
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors(), "body": exc.body}
    )

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc: HTTPException):
    """Handle HTTP exceptions"""
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )

@app.exception_handler(Exception)
async def generic_exception_handler(request, exc: Exception):
    """Handle all unhandled exceptions"""
    print(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )

# Include API routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(profiles.router, prefix="/api/v1/profiles", tags=["Profiles"])
app.include_router(eligibility.router, prefix="/api/v1/eligibility", tags=["Eligibility"])
app.include_router(aps.router, prefix="/api/v1/aps", tags=["APS Forms"])
app.include_router(documents.router, prefix="/api/v1/documents", tags=["Documents & AI"])
app.include_router(applications.router, prefix="/api/v1/applications", tags=["Applications"])
app.include_router(messages.router, prefix="/api/v1/messages", tags=["Messages"])
app.include_router(consultations.router, prefix="/api/v1/consultations", tags=["Consultations"])
app.include_router(admin.router, prefix="/api/v1/admin", tags=["Admin"])


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "AJ NOVA API - German University Admissions Platform",
        "version": "1.0.0",
        "status": "active",
        "docs": f"{settings.BACKEND_URL}/api/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint with database connectivity test"""
    try:
        from app.dependencies import get_supabase
        supabase = get_supabase()
        # Test database connection
        supabase.table("users").select("id").limit(1).execute()

        return {
            "status": "healthy",
            "environment": settings.ENVIRONMENT,
            "version": "1.0.0",
            "database": "connected"
        }
    except Exception as e:
        return JSONResponse(
            status_code=503,
            content={
                "status": "unhealthy",
                "environment": settings.ENVIRONMENT,
                "version": "1.0.0",
                "database": "disconnected",
                "error": str(e)
            }
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True if settings.ENVIRONMENT == "development" else False
    )
