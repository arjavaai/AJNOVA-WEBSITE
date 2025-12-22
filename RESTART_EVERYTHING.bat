@echo off
echo ========================================
echo Restarting AJ NOVA Full Stack
echo ========================================
echo.

echo Step 1: Killing all backend processes...
taskkill /F /IM python.exe 2>nul
timeout /t 2 >nul

echo Step 2: Killing all frontend processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 >nul

echo.
echo Step 3: Starting Backend...
cd /d "%~dp0backend"
start "AJ NOVA Backend" cmd /k "venv\Scripts\python.exe -m uvicorn app.main_working:app --reload --host 0.0.0.0 --port 8000"

timeout /t 5 >nul

echo.
echo Step 4: Starting Frontend...
cd /d "%~dp0aj-nova-website"
start "AJ NOVA Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo Both servers are starting!
echo ========================================
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Wait 10-15 seconds for both to start...
echo.
pause







