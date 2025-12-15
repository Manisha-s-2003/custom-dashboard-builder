@echo off
echo ===============================
echo Starting Dashboard Project
echo ===============================

REM ===== ROOT =====
echo.
echo Checking ROOT node_modules...
IF NOT EXIST node_modules (
    echo Installing ROOT dependencies...
    call npm install
) 

REM ===== BACKEND =====
echo.
cd backend

IF NOT EXIST node_modules (
    echo Installing BACKEND dependencies...
    call npm install
)

echo Starting BACKEND server...
start "BACKEND" cmd /k "npm start"

REM ===== FRONTEND =====
cd ../frontend

IF NOT EXIST node_modules (
    echo Installing FRONTEND dependencies...
    call npm install
)

echo Starting FRONTEND app...
start "FRONTEND" cmd /k "npm start"

echo ===============================
echo Project Started
pause