@echo off
REM FastAPI Server Startup Script for Windows

REM Change to the script's directory
cd /d "%~dp0"

echo.
echo ========================================
echo   AJ NOVA FastAPI Backend
echo ========================================
echo.

REM Check if in correct directory
if not exist "app\main.py" (
    echo Error: app\main.py not found!
    echo Current directory: %CD%
    pause
    exit /b 1
)

echo Starting server from: %CD%
echo.
echo Server will be available at:
echo   - API: http://localhost:8000
echo   - Docs: http://localhost:8000/api/docs
echo   - ReDoc: http://localhost:8000/api/redoc
echo.
echo Press CTRL+C to stop the server
echo.

REM Start the server
python -m uvicorn app.main:app --reload --port 8000 --host 0.0.0.0

