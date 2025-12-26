@echo off
echo ========================================
echo RESTARTING AJ NOVA APPLICATION
echo ========================================
echo.
echo This will restart both frontend and backend
echo Press Ctrl+C to cancel, or
pause

echo.
echo Step 1: Backend is already running on port 8000
echo Step 2: Please manually restart your frontend
echo.
echo IN YOUR FRONTEND TERMINAL:
echo   1. Press Ctrl+C to stop Next.js
echo   2. Run: cd aj-nova-website
echo   3. Run: npm run dev
echo   4. Open browser: http://localhost:3000
echo   5. Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
echo.
echo ========================================
echo Backend Status: Running on http://localhost:8000
echo ========================================
curl http://localhost:8000/health
echo.
echo.
pause
