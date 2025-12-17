# Python 3.14 Setup Fix

## Problem
After upgrading to Python 3.14, the backend cannot start because Python is not properly configured in your system PATH.

## Quick Fix Options

### Option 1: Add Python 3.14 to PATH (Recommended)

1. **Find your Python 3.14 installation**
   - Open File Explorer and check these common locations:
     - `C:\Python314\`
     - `C:\Users\satya\AppData\Local\Programs\Python\Python314\`
     - `C:\Program Files\Python314\`
   - Or search Windows for "python.exe" and note the location

2. **Add Python to PATH**
   - Press `Win + X` and select "System"
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System variables", find and select "Path"
   - Click "Edit"
   - Click "New" and add:
     - `C:\Python314\` (or wherever you found Python)
     - `C:\Python314\Scripts\`
   - Click "OK" on all dialogs
   - **Restart your terminal/command prompt**

3. **Verify installation**
   ```cmd
   python --version
   ```
   Should show: `Python 3.14.x`

### Option 2: Use Virtual Environment (If Python is installed)

If Python 3.14 is installed but not in PATH, use the full path:

```cmd
cd "D:\brave satya\AJNOVA-WEBSITE\backend"

# Replace with your actual Python path
"C:\Python314\python.exe" -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start server
uvicorn app.main_working:app --reload --host 0.0.0.0 --port 8000
```

### Option 3: Quick Start Script (Using Full Path)

Create a new file `START_BACKEND_DIRECT.bat` in the backend folder:

```batch
@echo off
echo Starting AJ NOVA Backend with Python 3.14
echo ========================================

cd /d "D:\brave satya\AJNOVA-WEBSITE\backend"

REM Update this path to match your Python 3.14 installation
set PYTHON_PATH=C:\Python314\python.exe

if not exist "%PYTHON_PATH%" (
    echo ERROR: Python not found at %PYTHON_PATH%
    echo Please update the PYTHON_PATH in this script
    pause
    exit /b 1
)

echo Using Python: %PYTHON_PATH%
"%PYTHON_PATH%" --version
echo.

echo Starting server on http://localhost:8000
echo Press Ctrl+C to stop
echo ========================================
echo.

"%PYTHON_PATH%" -m uvicorn app.main_working:app --reload --host 0.0.0.0 --port 8000

pause
```

## Common Python Installation Locations

Search for `python.exe` in these folders:
- `C:\Python314\`
- `C:\Python313\`
- `C:\Python312\`
- `C:\Users\satya\AppData\Local\Programs\Python\Python314\`
- `C:\Program Files\Python314\`

## After Fixing

Once Python is accessible, update dependencies:

```cmd
cd "D:\brave satya\AJNOVA-WEBSITE\backend"
python -m pip install --upgrade pip
pip install -r requirements.txt
```

## Verify Everything Works

1. Check Python version:
   ```cmd
   python --version
   ```

2. Start backend:
   ```cmd
   cd "D:\brave satya\AJNOVA-WEBSITE\backend"
   uvicorn app.main_working:app --reload --host 0.0.0.0 --port 8000
   ```

3. Test API:
   - Open browser: http://localhost:8000
   - API Docs: http://localhost:8000/api/docs

## Still Having Issues?

If you can't find Python 3.14, you may need to reinstall it:
1. Download from: https://www.python.org/downloads/
2. **Important**: Check "Add Python 3.14 to PATH" during installation
3. Install for all users (recommended)
4. After installation, restart your terminal

## Note on Python 3.14

As of early 2025, Python 3.14 may still be in beta/development. For production use, consider:
- Python 3.12 (latest stable)
- Python 3.11 (very stable)
- Python 3.13 (if released)

All modern Python versions (3.10+) will work perfectly with your FastAPI backend.
