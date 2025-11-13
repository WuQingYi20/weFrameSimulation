#!/bin/bash

echo "Starting We-Frame Climate Coordination Simulation..."
echo ""
echo "Opening browser at http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Try to open browser
if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:8000
elif command -v open > /dev/null; then
    open http://localhost:8000
fi

# Start server
python3 -m http.server 8000
