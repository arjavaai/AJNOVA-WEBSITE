@echo off
echo ========================================
echo Starting AJ NOVA Backend Server
echo ========================================
echo.

cd backend

echo Checking Python virtual environment...
if not exist "venv\Scripts\python.exe" (
    echo ERROR: Virtual environment not found!
    echo Please run: cd backend ^&^& python -m venv venv ^&^& venv\Scripts\pip install -r requirements.txt
    pause
    exit /b 1
)

echo Using Python from virtual environment:
venv\Scripts\python.exe --version
echo.

echo Starting FastAPI server on http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

venv\Scripts\python.exe -m uvicorn app.main_working:app --reload --host 0.0.0.0 --port 8000

pause
