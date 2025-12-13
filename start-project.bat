@echo off
echo ===============================
echo Starting Full Stack Project
echo ===============================

REM ===== ROOT =====
echo.
echo Checking ROOT node_modules...
IF NOT EXIST node_modules (
    echo Installing ROOT dependencies...
    npm install
) ELSE (
    echo ROOT dependencies already installed. Skipping...
)

REM ===== BACKEND =====
echo.
echo Checking BACKEND node_modules...
cd backend

IF NOT EXIST node_modules (
    echo Installing BACKEND dependencies...
    npm install
) ELSE (
    echo BACKEND dependencies already installed. Skipping...
)

echo Starting BACKEND server...
start cmd /k "npm start"

REM ===== FRONTEND =====
cd ../frontend
echo.
echo Checking FRONTEND node_modules...

IF NOT EXIST node_modules (
    echo Installing FRONTEND dependencies...
    npm install
) ELSE (
    echo FRONTEND dependencies already installed. Skipping...
)

echo Starting FRONTEND app...
start cmd /k "npm start"

echo.
echo ===============================
echo Project Start