@echo off
title Subir a GitHub - Psicologia Evolutiva 1
echo ========================================================
echo   Subiendo el repositorio a GitHub:
echo   https://github.com/manuel3200/psicologia-evolutiva-1
echo ========================================================
echo.
cd /d "%~dp0"
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo ========================================================
    echo   [OK] El proyecto se ha subido correctamente a GitHub!
    echo ========================================================
) else (
    echo ========================================================
    echo   Si te pide iniciar sesion, haz clic en "Sign in with your browser".
    echo ========================================================
)
echo.
pause
