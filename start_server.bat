@echo off
echo ==========================================
echo      UTKARSH HUNT - SERVER LAUNCHER
echo ==========================================
echo.
echo [1/3] Killing old node processes...
taskkill /F /IM node.exe >nul 2>&1
echo Done.
echo.
echo [2/3] Installing/Verifying Dependencies...
call npm install
echo.
echo [3/3] STARTING SERVER...
echo Please wait. Once you see "Ready in ...", open http://localhost:3000
echo.
call npx next dev
echo.
echo SERVER STOPPED.
pause
