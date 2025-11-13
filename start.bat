@echo off
echo Starting We-Frame Climate Coordination Simulation...
echo.
echo Opening browser at http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

start http://localhost:8000

python -m http.server 8000
