@echo off
echo Debugging Environment...
echo ----------------------------------
echo NODE PATH:
where node
echo.
echo NODE VERSION:
node -v
echo.
echo NPM VERSION:
call npm -v
echo ----------------------------------
echo.
echo Attempting to start Next.js...
call npx next dev
pause
