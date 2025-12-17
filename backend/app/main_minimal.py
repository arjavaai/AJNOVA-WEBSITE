"""
Minimal FastAPI app - basic health check only
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings

# Create minimal app
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
    return {"message": "AJ NOVA API - Minimal Version", "status": "ok"}

@app.get("/api/health")
async def health():
    return {"status": "healthy", "version": "minimal"}

@app.get("/health")
async def health_root():
    return {"status": "healthy", "version": "minimal"}

print("[OK] Minimal server started - No routers loaded")
print("[INFO] Visit http://localhost:8000/api/docs to see available endpoints")
