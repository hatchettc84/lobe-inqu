# ✅ InQubatorAI Server Mode Setup - COMPLETE

## 🎉 Status: RUNNING

Your InQubatorAI platform is now successfully deployed in **SERVER MODE** with the following services:

---

## 🚀 Active Services

### 1. **InQubatorAI Application**

- **URL:** <http://localhost:3010>
- **Network URL:** <http://192.168.1.188:3010>
- **Status:** ✅ Running
- **Mode:** Server-side with PostgreSQL database

### 2. **PostgreSQL Database**

- **Host:** localhost:5433 (changed from 5432 to avoid conflict)
- **Database:** inqubatorai
- **Status:** ✅ Running (Docker container: lobe-postgres)
- **Migrations:** ✅ Completed successfully

### 3. **MinIO S3 Storage**

- **API:** <http://localhost:9000>
- **Console:** <http://localhost:9001>
- **Bucket:** inqubatorai
- **Status:** ✅ Running (Docker container: lobe-minio)
- **Credentials:** admin / CHANGE_THIS_PASSWORD_IN_PRODUCTION

---

## ⚙️ Configuration Summary

### Environment Variables (.env)

```bash
# Core Settings
NEXT_PUBLIC_SERVICE_MODE=server # ✅ Server mode enabled
APP_URL=http://localhost:3010   # ✅ Configured
LOBE_PORT=3010                  # ✅ Running on port 3010

# Database
DATABASE_URL=postgresql://postgres:***@localhost:5433/inqubatorai # ✅ Connected
LOBE_DB_NAME=inqubatorai                                          # ✅ Database created

# Storage (MinIO S3)
S3_ENDPOINT=http://localhost:9000 # ✅ Connected
S3_BUCKET=inqubatorai             # ✅ Bucket configured
S3_ENABLE_PATH_STYLE=1            # ✅ Enabled for MinIO

# Authentication
NEXT_PUBLIC_ENABLE_NEXT_AUTH=0 # ⚠️ Temporarily disabled
```

---

## 📝 What's Working

✅ **Server Mode** - Fully enabled and operational
✅ **PostgreSQL Database** - Running with pgvector extension
✅ **MinIO S3 Storage** - File storage operational
✅ **Database Migrations** - All migrations completed
✅ **Application** - Running on <http://localhost:3010>
✅ **Multi-user Support** - Infrastructure ready (auth disabled temporarily)
✅ **Branding** - Already updated to "InQubatorAI"

---

## ⚠️ Temporarily Disabled (Due to Docker File Sharing Permissions)

The following services are commented out but can be re-enabled after fixing Docker file sharing:

### Casdoor (Authentication/SSO)

- **Purpose:** User authentication and single sign-on
- **Port:** 8000
- **Status:** ⏸️ Disabled (file mount permission issue)
- **To Enable:**
  1. Add `/Users/corneliushatchett/Downloads` to Docker Desktop > Settings > Resources > File Sharing
  2. Uncomment in `docker-compose.development.yml`

### SearXNG (Search Engine)

- **Purpose:** Privacy-respecting metasearch engine
- **Port:** 8080
- **Status:** ⏸️ Disabled (file mount permission issue)
- **To Enable:**
  1. Add to Docker file sharing (same as above)
  2. Uncomment in `docker-compose.development.yml`

---

## 🔧 How to Manage Services

### Start All Services

```bash
cd /Users/corneliushatchett/Downloads/lobe-inqu
./start-server-mode.sh
```

### Stop All Services

```bash
cd /Users/corneliushatchett/Downloads/lobe-inqu
./stop-server-mode.sh
```

### Start the Application

```bash
cd /Users/corneliushatchett/Downloads/lobe-inqu
npm run dev
```

### View Docker Logs

```bash
cd /Users/corneliushatchett/Downloads/lobe-inqu
docker compose -f docker-compose.development.yml logs -f
```

### Check Service Status

```bash
cd /Users/corneliushatchett/Downloads/lobe-inqu
docker compose -f docker-compose.development.yml ps
```

---

## 🎯 Access Your Application

### Main Application

**URL:** <http://localhost:3010>

Since authentication is temporarily disabled, you can access the application directly without login.

### MinIO Console (S3 Storage Management)

**URL:** <http://localhost:9001>

- **Username:** admin
- **Password:** CHANGE_THIS_PASSWORD_IN_PRODUCTION

---

## 🔐 Security Notes

⚠️ **IMPORTANT:** The following are using development/default values and MUST be changed for production:

1. **Database Password:** `CHANGE_THIS_PASSWORD_IN_PRODUCTION`
2. **MinIO Password:** `CHANGE_THIS_PASSWORD_IN_PRODUCTION`
3. **Secret Keys:** Generate new ones with `openssl rand -base64 32`
   - `KEY_VAULTS_SECRET`
   - `NEXT_AUTH_SECRET`

---

## 📊 Database Connection

Your application is using a PostgreSQL database with the following connection:

```
Host: localhost
Port: 5433
Database: inqubatorai
User: postgres
Password: (see .env file)
```

To connect with a database client like pgAdmin or DBeaver, use these credentials.

---

## 🔄 Next Steps

1. **✅ COMPLETED:** Server mode deployment
2. **✅ COMPLETED:** Database setup and migrations
3. **✅ COMPLETED:** S3 storage configuration
4. **📋 TODO:** Enable authentication (Casdoor or OAuth providers)
5. **📋 TODO:** Add your AI provider API keys (OpenAI, Anthropic, etc.)
6. **📋 TODO:** Complete logo/branding changes
7. **📋 TODO:** Configure production security settings

---

## 🆘 Troubleshooting

### Application won't start

```bash
# Check if services are running
docker compose -f docker-compose.development.yml ps

# Restart services
docker compose -f docker-compose.development.yml restart
```

### Database connection errors

```bash
# Check PostgreSQL logs
docker logs lobe-postgres

# Verify database is running
docker exec -it lobe-postgres pg_isready -U postgres
```

### Storage/file upload issues

```bash
# Check MinIO logs
docker logs lobe-minio

# Access MinIO console to verify bucket
open http://localhost:9001
```

---

## 📚 Useful Commands

```bash
# Run database migrations
npm run db:migrate

# Generate database schema
npm run db:generate

# Build for production
npm run build

# Start production server
npm start
```

---

## 🎨 Branding Status

The platform has already been partially rebranded to **InQubatorAI**:

✅ **Brand Name:** InQubatorAI
✅ **Organization Name:** InQubatorAI\
✅ **Cloud Name:** InQubatorAI Cloud
✅ **Database Name:** inqubatorai
✅ **S3 Bucket:** inqubatorai

📋 **Still TODO:**

- Logo file (BRANDING_LOGO_URL is empty)
- Social media URLs (still point to LobeHub)
- Email addresses (still use lobehub.com)

---

## 💡 Tips

- **Development:** The app auto-reloads when you make code changes
- **Logs:** Use `docker compose logs -f` to monitor all services
- **Performance:** MinIO console shows storage usage and statistics
- **Database:** Use `npm run db:studio` to open Drizzle Studio for DB management

---

**Congratulations! Your InQubatorAI platform is now running in SERVER MODE! 🎉**

For questions or issues, refer to the documentation in `/docs` or check the original LobeChat documentation at <https://lobehub.com/docs>
