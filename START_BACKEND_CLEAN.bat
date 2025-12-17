@echo off
echo ================================================
echo Starting Backend Server (Clean Start)
echo ================================================
echo.

cd /d "%~dp0backend"

echo Step 1: Killing any existing backend processes...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000 ^| findstr LISTENING') do (
    taskkill /F /PID %%a 2>nul
)

echo.
echo Step 2: Waiting 3 seconds...
timeout /t 3 /nobreak

echo.
echo Step 3: Starting fresh backend server...
echo.

venv\Scripts\python.exe -m uvicorn app.main_working:app --reload --host 127.0.0.1 --port 8000


