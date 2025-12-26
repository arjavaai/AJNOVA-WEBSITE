@echo off
echo ================================================
echo Killing ALL Backend Processes on Port 8000
echo ================================================
echo.

REM Kill all processes listening on port 8000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000 ^| findstr LISTENING') do (
    echo Killing process %%a...
    taskkill /F /PID %%a 2>nul
)

echo.
echo Waiting 3 seconds...
timeout /t 3 /nobreak >nul

echo.
echo ================================================
echo Checking if port 8000 is clear...
echo ================================================
netstat -ano | findstr :8000

echo.
echo ================================================
echo If you still see processes above, restart your computer.
echo Otherwise, you can now start the backend with:
echo.
echo cd backend
echo venv\Scripts\python.exe -m uvicorn app.main_working:app --reload --host 127.0.0.1 --port 8000
echo ================================================
pause










