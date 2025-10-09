#!/bin/bash

# ===========================
# InQubatorAI Server Mode Startup Script
# ===========================
# This script starts all required services for server mode:
# - PostgreSQL database
# - MinIO S3 storage
# - Casdoor authentication
# - SearXNG search engine
# ===========================

set -e

echo "🚀 Starting InQubatorAI in Server Mode..."
echo ""

# Change to project directory
cd "$(dirname "$0")"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | grep -v '^$' | xargs)
    echo "✅ Environment variables loaded from .env"
else
    echo "❌ Error: .env file not found"
    exit 1
fi

echo ""
echo "📦 Starting Docker services..."
echo "   - PostgreSQL (Database)"
echo "   - MinIO (S3 Storage)"
echo "   - Casdoor (Authentication)"
echo "   - SearXNG (Search Engine)"
echo ""

# Start Docker Compose services
docker compose -f docker-compose.development.yml up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo ""
echo "🔍 Checking service status..."
docker compose -f docker-compose.development.yml ps

echo ""
echo "✅ Docker services are running!"
echo ""
echo "📊 Service URLs:"
echo "   🗄️  PostgreSQL:  localhost:5432"
echo "   📦 MinIO:        http://localhost:${MINIO_PORT:-9000}"
echo "   🔐 Casdoor:      http://localhost:${CASDOOR_PORT:-8000}"
echo "   🔍 SearXNG:      http://localhost:8080"
echo ""
echo "🎯 Next steps:"
echo "   1. Run database migrations: npm run db:migrate"
echo "   2. Start the application:   npm run dev"
echo "   3. Access InQubatorAI:      http://localhost:${LOBE_PORT:-3010}"
echo ""
echo "🔑 Default Credentials:"
echo "   Casdoor Admin:  admin / (check docker logs)"
echo "   Casdoor User:   user / (check docker logs)"
echo "   MinIO Admin:    admin / CHANGE_THIS_PASSWORD_IN_PRODUCTION"
echo ""
echo "💡 Tip: Run 'docker compose -f docker-compose.development.yml logs -f' to view logs"
echo ""
