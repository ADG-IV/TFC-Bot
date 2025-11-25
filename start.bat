@echo off
title TFC Bot - En ligne
echo.
echo ╔══════════════════════════════════╗
echo   TFC BOT - Démarrage en cours...
echo ╚══════════════════════════════════╗
echo.
cd /d "%~dp0"
node index.js
echo./
echo ╔══════════════════════════════════╗
echo   Bot arrêté ! Ferme cette fenêtre
echo ╚══════════════════════════════════╗
echo.
pause