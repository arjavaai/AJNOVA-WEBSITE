# Force Kill All Backend Processes and Restart
# Run with: powershell -ExecutionPolicy Bypass -File FORCE_KILL_AND_RESTART.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Force Kill All Backends & Clean Restart" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Find and kill all processes on port 8000
Write-Host "Step 1: Finding all processes on port 8000..." -ForegroundColor Yellow
$processes = Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue

if ($processes) {
    $pids = $processes | Select-Object -ExpandProperty OwningProcess -Unique
    Write-Host "Found $($pids.Count) unique process(es): $($pids -join ', ')" -ForegroundColor Yellow
    
    foreach ($pid in $pids) {
        Write-Host "  Killing PID $pid..." -ForegroundColor Red
        try {
            Stop-Process -Id $pid -Force -ErrorAction Stop
            Write-Host "    ✅ Killed PID $pid" -ForegroundColor Green
        } catch {
            Write-Host "    ⚠️ Could not kill PID $pid: $($_.Exception.Message)" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "  No processes found on port 8000" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 2: Waiting 3 seconds for cleanup..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "Step 3: Verifying port 8000 is clear..." -ForegroundColor Yellow
$remaining = Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue

if ($remaining) {
    Write-Host "  ⚠️ WARNING: Some processes still running!" -ForegroundColor Red
    $remaining | ForEach-Object { Write-Host "    PID $($_.OwningProcess) still listening" -ForegroundColor Red }
    Write-Host ""
    Write-Host "  Trying nuclear option..." -ForegroundColor Red
    
    # Try to kill all Python processes
    Get-Process | Where-Object { $_.ProcessName -like "*python*" } | ForEach-Object {
        Write-Host "    Killing Python process $($_.Id)..." -ForegroundColor Red
        Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
    }
    
    Start-Sleep -Seconds 2
    
    $stillRemaining = Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue
    if ($stillRemaining) {
        Write-Host ""
        Write-Host "  ❌ FAILED: Processes still running. You need to:" -ForegroundColor Red
        Write-Host "     1. Close ALL terminal windows" -ForegroundColor Yellow
        Write-Host "     2. Restart your computer" -ForegroundColor Yellow
        Write-Host "     3. Then run this script again" -ForegroundColor Yellow
        Write-Host ""
        pause
        exit 1
    }
}

Write-Host "  ✅ Port 8000 is clear!" -ForegroundColor Green
Write-Host ""

# Step 4: Start fresh backend
Write-Host "Step 4: Starting fresh backend server..." -ForegroundColor Yellow
Write-Host ""

$backendPath = Join-Path $PSScriptRoot "backend"
Set-Location $backendPath

Write-Host "Starting uvicorn..." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

& "venv\Scripts\python.exe" -m uvicorn app.main_working:app --reload --host 127.0.0.1 --port 8000


