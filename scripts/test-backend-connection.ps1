# Backend Connection Test Script
# Run this to test if the backend is reachable

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Backend Connection Diagnostic Test" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Check if port 8000 is listening
Write-Host "Test 1: Checking if port 8000 is listening..." -ForegroundColor Yellow
$port8000 = Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue
if ($port8000) {
    Write-Host "✅ Port 8000 is LISTENING" -ForegroundColor Green
    Write-Host "   Process ID: $($port8000.OwningProcess)" -ForegroundColor Gray
} else {
    Write-Host "❌ Port 8000 is NOT listening!" -ForegroundColor Red
    Write-Host "   Backend is not running. Start it with:" -ForegroundColor Red
    Write-Host "   cd backend" -ForegroundColor Gray
    Write-Host "   venv\Scripts\python.exe -m uvicorn app.main_working:app --reload --host 127.0.0.1 --port 8000" -ForegroundColor Gray
    exit 1
}

Write-Host ""

# Test 2: Try to connect to localhost:8000
Write-Host "Test 2: Testing HTTP connection to localhost:8000..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ Backend is REACHABLE!" -ForegroundColor Green
    Write-Host "   Status: $($response.StatusCode)" -ForegroundColor Gray
    Write-Host "   Response: $($response.Content.Substring(0, [Math]::Min(100, $response.Content.Length)))..." -ForegroundColor Gray
} catch {
    Write-Host "❌ Cannot reach backend!" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    
    # Check if it's a connection refused error
    if ($_.Exception.Message -match "refused") {
        Write-Host "   → Backend is not accepting connections" -ForegroundColor Red
        Write-Host "   → Try restarting backend with: --host 127.0.0.1" -ForegroundColor Yellow
    }
    exit 1
}

Write-Host ""

# Test 3: Try to connect to 127.0.0.1:8000
Write-Host "Test 3: Testing HTTP connection to 127.0.0.1:8000..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://127.0.0.1:8000/" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ Backend is REACHABLE via 127.0.0.1!" -ForegroundColor Green
    Write-Host "   Status: $($response.StatusCode)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Cannot reach backend via 127.0.0.1!" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 4: CORS Preflight
Write-Host "Test 4: Testing CORS preflight..." -ForegroundColor Yellow
try {
    $headers = @{
        'Origin' = 'http://localhost:3000'
        'Access-Control-Request-Method' = 'GET'
        'Access-Control-Request-Headers' = 'authorization,content-type'
    }
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/v1/profiles/me" -Method OPTIONS -Headers $headers -UseBasicParsing -TimeoutSec 5
    
    Write-Host "✅ CORS preflight successful!" -ForegroundColor Green
    Write-Host "   Status: $($response.StatusCode)" -ForegroundColor Gray
    
    $allowOrigin = $response.Headers['Access-Control-Allow-Origin']
    $allowMethods = $response.Headers['Access-Control-Allow-Methods']
    
    if ($allowOrigin) {
        Write-Host "   Allow-Origin: $allowOrigin" -ForegroundColor Gray
    } else {
        Write-Host "   ⚠️ No Access-Control-Allow-Origin header!" -ForegroundColor Yellow
    }
    
    if ($allowMethods) {
        Write-Host "   Allow-Methods: $allowMethods" -ForegroundColor Gray
    } else {
        Write-Host "   ⚠️ No Access-Control-Allow-Methods header!" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ CORS preflight failed!" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Summary" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "If all tests passed:" -ForegroundColor Green
Write-Host "  → Backend is working correctly" -ForegroundColor Green
Write-Host "  → The issue is browser-side (Brave Shields, extensions, etc.)" -ForegroundColor Green
Write-Host ""
Write-Host "If tests failed:" -ForegroundColor Red
Write-Host "  → Backend needs to be restarted" -ForegroundColor Red
Write-Host "  → Try: --host 127.0.0.1 instead of 0.0.0.0" -ForegroundColor Red
Write-Host "  → Check Windows Firewall settings" -ForegroundColor Red
Write-Host ""

# Test 5: Check Windows Firewall
Write-Host "Checking Windows Firewall rules for Python..." -ForegroundColor Yellow
$pythonPath = "D:\brave satya\AJNOVA-WEBSITE\backend\venv\Scripts\python.exe"
if (Test-Path $pythonPath) {
    Write-Host "✅ Python path exists: $pythonPath" -ForegroundColor Green
    Write-Host "   Make sure this is allowed in Windows Firewall!" -ForegroundColor Yellow
} else {
    Write-Host "⚠️ Python path not found at expected location" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")










