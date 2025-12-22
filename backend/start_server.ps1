# FastAPI Server Startup Script
Write-Host "🚀 Starting AJ NOVA FastAPI Backend..." -ForegroundColor Green
Write-Host ""

# Check if in correct directory
if (-not (Test-Path "app\main.py")) {
    Write-Host "❌ Error: Please run this script from the backend directory!" -ForegroundColor Red
    exit 1
}

# Check if dependencies are installed
Write-Host "📦 Checking dependencies..." -ForegroundColor Yellow
$pipList = pip list 2>&1
if ($pipList -notmatch "fastapi") {
    Write-Host "⚠️  Installing dependencies..." -ForegroundColor Yellow
    pip install -r requirements.txt
}

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  Warning: .env file not found!" -ForegroundColor Yellow
    Write-Host "   Creating .env from env.example..." -ForegroundColor Yellow
    if (Test-Path "env.example") {
        Copy-Item "env.example" ".env"
        Write-Host "   ✓ Created .env file. Please update it with your credentials." -ForegroundColor Green
    } else {
        Write-Host "   ❌ env.example not found. Please create .env manually." -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🌐 Starting server on http://localhost:8000" -ForegroundColor Cyan
Write-Host "📚 API Docs: http://localhost:8000/api/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press CTRL+C to stop the server" -ForegroundColor Gray
Write-Host ""

# Start the server
if (Test-Path "venv\Scripts\python.exe") {
    Write-Host "Using Python from virtual environment" -ForegroundColor Green
    .\venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
} else {
    Write-Host "Virtual environment not found, using system Python" -ForegroundColor Yellow
    python -m uvicorn app.main:app --reload --port 8000
}
























