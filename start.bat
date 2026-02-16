@echo off
title Code Challenge - Setup & Run
echo ============================================
echo   Code Challenge - Windows Setup Script
echo ============================================
echo.

REM --- Check for Node.js ---
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed.
    echo Please install it from https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js found: 
node --version

REM --- Check for Docker ---
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed.
    echo Please install Docker Desktop from https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)
echo [OK] Docker found:
docker --version
echo.

REM --- Start PostgreSQL via Docker Compose ---
echo [1/4] Starting PostgreSQL database...
docker compose up -d
if %errorlevel% neq 0 (
    echo Trying legacy docker-compose command...
    docker-compose up -d
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to start database. Make sure Docker Desktop is running.
        pause
        exit /b 1
    )
)
echo [OK] Database container started.
echo.

REM --- Wait for PostgreSQL to be ready ---
echo Waiting for PostgreSQL to be ready...
set RETRIES=15
:wait_loop
if %RETRIES% leq 0 (
    echo [ERROR] PostgreSQL did not become ready in time.
    pause
    exit /b 1
)
docker exec code_challenge_db pg_isready -U postgres >nul 2>nul
if %errorlevel% neq 0 (
    set /a RETRIES=%RETRIES%-1
    timeout /t 2 /nobreak >nul
    goto wait_loop
)
echo [OK] PostgreSQL is ready.
echo.

REM --- Install dependencies ---
echo [2/4] Installing dependencies...
call npm run install:all
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies.
    pause
    exit /b 1
)
echo [OK] Dependencies installed.
echo.

REM --- Initialize the database ---
echo [3/4] Initializing database...
cd server
call npm run db:init
if %errorlevel% neq 0 (
    echo [ERROR] Failed to initialize database.
    cd ..
    pause
    exit /b 1
)
cd ..
echo [OK] Database initialized.
echo.

REM --- Start the application ---
echo [4/4] Starting the application...
echo.
echo ============================================
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo ============================================
echo.
echo Press Ctrl+C to stop the servers.
echo.
call npm start
