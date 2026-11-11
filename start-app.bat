@echo off
REM ============================================================
REM  GOKATECH - Start the app in development mode
REM ============================================================
title GOKATECH Dev Server
cd /d "%~dp0"

echo.
echo ===============================================
echo   GOKATECH - Starting development server...
echo ===============================================
echo.

REM Install dependencies only if node_modules is missing
if not exist "node_modules" (
    echo [setup] node_modules not found - installing dependencies...
    call npm install
    if errorlevel 1 (
        echo.
        echo [error] npm install failed. Please check the output above.
        pause
        exit /b 1
    )
)

echo [dev] Launching Vite... the app will open at http://localhost:5173
echo [dev] Press Ctrl+C in this window to stop the server.
echo.

REM Open the browser shortly after the server starts
start "" cmd /c "timeout /t 3 >nul & start http://localhost:5173"

call npm run dev

echo.
echo [dev] Server stopped.
pause
