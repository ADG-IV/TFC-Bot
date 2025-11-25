@echo off
title Arrêt du TFC Bot
echo.
echo Arrêt du bot en cours...
taskkill /F /IM node.exe >nul 2>&1
echo Bot arrêté avec succès !
echo.
pause