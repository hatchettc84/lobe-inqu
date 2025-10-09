#!/bin/bash

# ============================================
# InQubatorAI Server Mode Setup Script
# ============================================
# This script helps you set up and run InQubatorAI in server mode
# ============================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_header() {
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
    echo ""
}

# Check if running in the correct directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the lobe-inqu root directory"
    exit 1
fi

print_header "InQubatorAI Server Mode Setup"

# Check prerequisites
print_info "Checking prerequisites..."

# Check for Docker
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi
print_success "Docker found"

# Check for Docker Compose
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi
print_success "Docker Compose found"

# Check for Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi
print_success "Node.js found ($(node --version))"

# Check for pnpm
if ! command -v pnpm &> /dev/null; then
    print_warning "pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
    print_success "pnpm installed"
else
    print_success "pnpm found ($(pnpm --version))"
fi

# Menu for setup options
print_header "Setup Options"
echo "1) Full Setup (Install dependencies + Start all services)"
echo "2) Install Dependencies Only"
echo "3) Start Services Only (Docker Compose)"
echo "4) Run Development Server"
echo "5) Stop All Services"
echo "6) View Service Logs"
echo "7) Reset Database"
echo "8) Generate New Security Secrets"
echo "9) Exit"
echo ""
read -p "Select an option (1-9): " choice

case $choice in
    1)
        print_header "Full Setup - Installing Dependencies and Starting Services"
        
        # Install dependencies
        print_info "Installing Node.js dependencies..."
        pnpm install
        print_success "Dependencies installed"
        
        # Copy development env file
        if [ ! -f ".env.development" ]; then
            print_info "Creating .env.development file..."
            cp .env.example.development .env.development
            print_success ".env.development created"
        fi
        
        # Start Docker services
        print_info "Starting Docker services (PostgreSQL, MinIO, Casdoor)..."
        docker-compose -f docker-compose.development.yml up -d postgresql minio casdoor
        
        # Wait for services to be ready
        print_info "Waiting for services to be ready (30 seconds)..."
        sleep 30
        
        # Run database migrations
        print_info "Running database migrations..."
        pnpm run db:migrate
        print_success "Database migrations completed"
        
        print_success "Full setup completed!"
        print_info ""
        print_info "Services running:"
        print_info "  - PostgreSQL: localhost:5432"
        print_info "  - MinIO: http://localhost:9000 (Console: http://localhost:9001)"
        print_info "  - Casdoor: http://localhost:8000"
        print_info ""
        print_info "Next steps:"
        print_info "  1. Run: pnpm dev"
        print_info "  2. Open: http://localhost:3010"
        print_info "  3. Default login - Username: user, Password: (check console output)"
        ;;
        
    2)
        print_header "Installing Dependencies"
        print_info "Installing Node.js dependencies..."
        pnpm install
        print_success "Dependencies installed successfully!"
        ;;
        
    3)
        print_header "Starting Docker Services"
        print_info "Starting PostgreSQL, MinIO, and Casdoor..."
        docker-compose -f docker-compose.development.yml up -d postgresql minio casdoor
        
        print_info "Waiting for services to start..."
        sleep 10
        
        print_success "Services started!"
        docker-compose -f docker-compose.development.yml ps
        
        print_info ""
        print_info "Services:"
        print_info "  - PostgreSQL: localhost:5432"
        print_info "  - MinIO API: http://localhost:9000"
        print_info "  - MinIO Console: http://localhost:9001"
        print_info "  - Casdoor: http://localhost:8000"
        ;;
        
    4)
        print_header "Starting Development Server"
        
        # Check if Docker services are running
        if ! docker-compose -f docker-compose.development.yml ps | grep -q "Up"; then
            print_warning "Docker services are not running. Starting them first..."
            docker-compose -f docker-compose.development.yml up -d postgresql minio casdoor
            print_info "Waiting for services to be ready..."
            sleep 15
        fi
        
        print_info "Starting InQubatorAI development server..."
        print_info "Server will be available at: http://localhost:3010"
        print_info ""
        print_warning "Press Ctrl+C to stop the server"
        print_info ""
        pnpm dev
        ;;
        
    5)
        print_header "Stopping All Services"
        print_info "Stopping Docker services..."
        docker-compose -f docker-compose.development.yml down
        print_success "All services stopped"
        ;;
        
    6)
        print_header "Viewing Service Logs"
        echo "Which service logs would you like to view?"
        echo "1) All services"
        echo "2) PostgreSQL"
        echo "3) MinIO"
        echo "4) Casdoor"
        read -p "Select (1-4): " log_choice
        
        case $log_choice in
            1) docker-compose -f docker-compose.development.yml logs -f ;;
            2) docker-compose -f docker-compose.development.yml logs -f postgresql ;;
            3) docker-compose -f docker-compose.development.yml logs -f minio ;;
            4) docker-compose -f docker-compose.development.yml logs -f casdoor ;;
            *) print_error "Invalid option" ;;
        esac
        ;;
        
    7)
        print_header "Reset Database"
        print_warning "This will DELETE all data in the database!"
        read -p "Are you sure? (yes/no): " confirm
        
        if [ "$confirm" = "yes" ]; then
            print_info "Stopping services..."
            docker-compose -f docker-compose.development.yml down -v
            
            print_info "Starting services..."
            docker-compose -f docker-compose.development.yml up -d postgresql minio casdoor
            
            print_info "Waiting for PostgreSQL..."
            sleep 15
            
            print_info "Running migrations..."
            pnpm run db:migrate
            
            print_success "Database reset completed!"
        else
            print_info "Database reset cancelled"
        fi
        ;;
        
    8)
        print_header "Generate New Security Secrets"
        print_info "Generating new secrets..."
        
        SECRET1=$(openssl rand -base64 32)
        SECRET2=$(openssl rand -base64 32)
        PASSWORD=$(openssl rand -base64 16)
        
        echo ""
        print_success "New secrets generated!"
        echo ""
        print_info "Add these to your .env file:"
        echo ""
        echo -e "${YELLOW}KEY_VAULTS_SECRET=${SECRET1}${NC}"
        echo -e "${YELLOW}NEXT_AUTH_SECRET=${SECRET2}${NC}"
        echo -e "${YELLOW}POSTGRES_PASSWORD=${PASSWORD}${NC}"
        echo -e "${YELLOW}MINIO_ROOT_PASSWORD=${PASSWORD}${NC}"
        echo ""
        print_warning "Remember to update DATABASE_URL and S3_SECRET_ACCESS_KEY with the new password!"
        echo ""
        
        read -p "Do you want to automatically update .env file? (yes/no): " update_env
        if [ "$update_env" = "yes" ]; then
            # Backup current .env
            cp .env .env.backup
            print_success "Backed up .env to .env.backup"
            
            # Update .env file
            sed -i.tmp "s|KEY_VAULTS_SECRET=.*|KEY_VAULTS_SECRET=$SECRET1|g" .env
            sed -i.tmp "s|NEXT_AUTH_SECRET=.*|NEXT_AUTH_SECRET=$SECRET2|g" .env
            sed -i.tmp "s|POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=$PASSWORD|g" .env
            sed -i.tmp "s|MINIO_ROOT_PASSWORD=.*|MINIO_ROOT_PASSWORD=$PASSWORD|g" .env
            rm -f .env.tmp
            
            print_success ".env file updated with new secrets!"
            print_warning "You'll need to restart services and reset the database"
        fi
        ;;
        
    9)
        print_info "Exiting..."
        exit 0
        ;;
        
    *)
        print_error "Invalid option selected"
        exit 1
        ;;
esac

print_info ""
print_success "Operation completed!"
print_info ""
