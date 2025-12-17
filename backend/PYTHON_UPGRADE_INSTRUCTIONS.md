# Python Upgrade Instructions

## Current Issue
- Python 3.9.0 is incompatible with Pydantic v2 + FastAPI OpenAPI generation
- API works perfectly, but Swagger UI docs fail with OpenAPI schema generation error

## Solution: Upgrade to Python 3.10+

### Steps:

1. **Download Python 3.10 or newer**
   - Visit: https://www.python.org/downloads/
   - Download Python 3.10.11 or Python 3.11 (recommended)
   - **Important**: Check "Add Python to PATH" during installation

2. **Install in a different location**
   - Install to: `C:\Python310\` (don't overwrite existing Python 3.9)

3. **Update your backend to use new Python**

   Option A: Create virtual environment with new Python
   ```bash
   cd D:\brave satya\AJNOVA-WEBSITE\backend
   C:\Python310\python.exe -m venv venv310
   venv310\Scripts\activate
   pip install -r requirements.txt
   ```

   Option B: Use new Python directly
   ```bash
   C:\Python310\python.exe -m pip install -r requirements.txt
   ```

4. **Update START_BACKEND.bat** to use new Python
   ```batch
   C:\Python310\python.exe -m uvicorn app.main_working:app --reload --host 0.0.0.0 --port 8000
   ```

5. **Re-enable OpenAPI docs**
   Edit `app/main_working.py`:
   ```python
   app = FastAPI(
       title="AJ NOVA API",
       description="Backend API for AJ NOVA Platform",
       version="1.0.0",
       docs_url="/api/docs",     # Enable Swagger UI
       redoc_url="/api/redoc",   # Enable ReDoc
   )
   ```

6. **Restart the server**
   - Swagger UI will now work at: http://localhost:8000/api/docs

## Alternative: Use Current Setup

Your application works perfectly without Swagger docs. If you don't need the
interactive API documentation, you can continue using the current setup with
Python 3.9 and `main_working.py`.

The frontend dashboard, calendar export, and PDF export all function correctly.
