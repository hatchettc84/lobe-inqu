#!/bin/bash

# ===========================
# InQubatorAI Server Mode Stop Script
# ===========================
# This script stops all Docker services
# ===========================

set -e

echo "🛑 Stopping InQubatorAI Server Mode services..."
echo ""

# Change to project directory
cd "$(dirname "$0")"

# Stop Docker Compose services
docker compose -f docker-compose.development.yml down

echo ""
echo "✅ All services stopped"
echo ""
echo "💡 To remove all data (volumes), run:"
echo "   docker compose -f docker-compose.development.yml down -v"
echo ""
