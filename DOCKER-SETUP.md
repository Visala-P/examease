# ExamEase - Docker Setup Instructions

## ⚠️ Prerequisites

### 1. Install Docker Desktop for Windows

Download and install from: https://www.docker.com/products/docker-desktop/

**After installation:**
1. Start Docker Desktop application
2. Wait for Docker engine to start (check system tray icon)
3. Verify installation:
```powershell
docker --version
docker-compose --version
```

## 🚀 Running with Docker

### Start the Application

**Make sure Docker Desktop is running first!**

```powershell
cd C:\Users\hp\OneDrive\Desktop\examease-portal
docker-compose up -d
```

This will:
1. Pull PostgreSQL image
2. Build backend Spring Boot image
3. Build frontend React image
4. Start all containers

### Check Status

```powershell
# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres
```

### Access the Application

- **Frontend**: http://localhost
- **Backend API**: http://localhost:8085
- **Database**: localhost:5432
- **Admin Login**: admin@examease.com / admin123

### Stop the Application

```powershell
# Stop containers
docker-compose down

# Stop and remove data
docker-compose down -v
```

## 🔧 Troubleshooting

### Issue: "The system cannot find the file specified"
**Solution**: Start Docker Desktop application and wait for it to fully initialize

### Issue: Port already in use
**Solution**: Stop local services or change ports in `docker-compose.yml`

```yaml
frontend:
  ports:
    - "8080:80"  # Use 8080 instead of 80
```

### Issue: Build fails
**Solution**: Clean and rebuild
```powershell
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 📦 Alternative: Run Without Docker

If you prefer to run without Docker:

### Backend
```powershell
cd backend
mvn spring-boot:run
```

### Frontend
```powershell
cd frontend
npm install
npm run dev
```

### Database
Use pgAdmin with local PostgreSQL installation

## 🌐 Production Deployment

See `DEPLOYMENT.md` for complete production deployment guide including:
- AWS/DigitalOcean deployment
- SSL certificate setup
- Domain configuration
- Database backups
