@echo off
echo ========================================
echo FORCE RESTARTING AJ NOVA Backend
echo ========================================
echo.

echo Step 1: Killing ALL Python processes on port 8000...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":8000" ^| find "LISTENING"') do (
    echo   Killing PID %%a
    taskkill /F /PID %%a 2>nul
)

echo.
echo Step 2: Waiting 3 seconds for cleanup...
timeout /t 3 /nobreak >nul

echo.
echo Step 3: Starting fresh backend with Python 3.13...
echo.

cd backend
venv\Scripts\python.exe -m uvicorn app.main_working:app --reload --host 0.0.0.0 --port 8000

pause
