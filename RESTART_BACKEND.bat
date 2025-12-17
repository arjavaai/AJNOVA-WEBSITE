@echo off
echo ========================================
echo Restarting AJ NOVA Backend Server
echo ========================================
echo.

echo Stopping existing backend processes...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":8000" ^| find "LISTENING"') do (
    echo Killing process %%a
    taskkill /F /PID %%a 2>nul
)

echo.
echo Waiting 2 seconds...
timeout /t 2 /nobreak >nul

cd backend

echo.
echo Starting backend server with Python 3.13...
echo.

venv\Scripts\python.exe -m uvicorn app.main_working:app --reload --host 0.0.0.0 --port 8000
