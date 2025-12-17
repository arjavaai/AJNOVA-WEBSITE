# AJ NOVA Development Server Startup Script
# Run both backend and frontend servers

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AJ NOVA Development Environment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Python
Write-Host "Checking Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Python not found. Please install Python 3.10+" -ForegroundColor Red
    exit 1
}

# Check Node/pnpm
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✓ Node $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js" -ForegroundColor Red
    exit 1
}

Write-Host "Checking pnpm..." -ForegroundColor Yellow
try {
    $pnpmVersion = pnpm --version 2>&1
    Write-Host "✓ pnpm $pnpmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ pnpm not found. Installing..." -ForegroundColor Yellow
    npm install -g pnpm
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Servers..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start Backend
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
$backendJob = Start-Job -ScriptBlock {
    Set-Location "D:\brave satya\AJNOVA-WEBSITE\backend"
    uvicorn app.main_simple:app --reload --host 0.0.0.0 --port 8000
}

Start-Sleep -Seconds 3

# Start Frontend
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
$frontendJob = Start-Job -ScriptBlock {
    Set-Location "D:\brave satya\AJNOVA-WEBSITE\aj-nova-website"
    pnpm dev
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✓ Servers Started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:8000" -ForegroundColor Cyan
Write-Host "API Docs: http://localhost:8000/api/docs" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Yellow
Write-Host ""

# Monitor jobs
try {
    while ($true) {
        if ((Get-Job -Id $backendJob.Id).State -ne "Running") {
            Write-Host "Backend server stopped unexpectedly" -ForegroundColor Red
            break
        }
        if ((Get-Job -Id $frontendJob.Id).State -ne "Running") {
            Write-Host "Frontend server stopped unexpectedly" -ForegroundColor Red
            break
        }
        Start-Sleep -Seconds 1
    }
} finally {
    Write-Host "Stopping servers..." -ForegroundColor Yellow
    Stop-Job -Job $backendJob, $frontendJob
    Remove-Job -Job $backendJob, $frontendJob
    Write-Host "Servers stopped." -ForegroundColor Green
}
