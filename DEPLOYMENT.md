# ExamEase Deployment Guide

## 🐳 Docker Deployment

### Prerequisites
- Docker installed
- Docker Compose installed

### Quick Start

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd examease-portal
```

2. **Start all services**
```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Spring Boot backend on port 8085
- React frontend on port 80

3. **Access the application**
- Frontend: http://localhost
- Backend API: http://localhost:8085
- Database: localhost:5432

4. **Default Admin Credentials**
- Email: `admin@examease.com`
- Password: `admin123`

### Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# Stop and remove volumes (clears database)
docker-compose down -v
```

### Environment Variables

You can customize the deployment by setting these variables in `docker-compose.yml`:

**Backend:**
- `SPRING_DATASOURCE_URL`: Database connection URL
- `SPRING_DATASOURCE_USERNAME`: Database username
- `SPRING_DATASOURCE_PASSWORD`: Database password
- `ADMIN_PASSWORD`: Default admin password

**Database:**
- `POSTGRES_DB`: Database name
- `POSTGRES_USER`: Database username
- `POSTGRES_PASSWORD`: Database password

## 📦 GitHub Deployment

### 1. Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: ExamEase Portal"

# Add remote repository
git remote add origin https://github.com/yourusername/examease-portal.git

# Push to GitHub
git push -u origin main
```

### 2. GitHub Actions CI/CD (Optional)

Create `.github/workflows/docker-build.yml`:

```yaml
name: Docker Build and Push

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Build Docker images
      run: docker-compose build
    
    - name: Run tests
      run: |
        docker-compose up -d postgres
        sleep 10
        # Add your test commands here
```

## 🚀 Production Deployment

### Deploy to AWS EC2 / DigitalOcean / VPS

1. **SSH into your server**
```bash
ssh user@your-server-ip
```

2. **Install Docker and Docker Compose**
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

3. **Clone and run**
```bash
git clone https://github.com/yourusername/examease-portal.git
cd examease-portal
docker-compose up -d
```

4. **Configure domain (optional)**
- Point your domain to server IP
- Update nginx.conf with your domain
- Add SSL certificate using Let's Encrypt

### SSL Certificate with Let's Encrypt

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

## 📊 Monitoring

```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres

# Database backup
docker exec examease-postgres pg_dump -U postgres examease_db > backup.sql

# Restore database
docker exec -i examease-postgres psql -U postgres examease_db < backup.sql
```

## 🔧 Troubleshooting

**Port already in use:**
```bash
# Change ports in docker-compose.yml
ports:
  - "8080:80"  # Use 8080 instead of 80
```

**Database connection issues:**
```bash
# Check if postgres is healthy
docker-compose logs postgres

# Restart postgres
docker-compose restart postgres
```

**Frontend can't connect to backend:**
- Check nginx.conf proxy settings
- Verify backend is running: `docker-compose ps`
- Check backend logs: `docker-compose logs backend`

## 📝 Notes

- Default admin is created automatically on first run
- Database data persists in Docker volume `postgres_data`
- Change default passwords in production
- Configure proper CORS settings for production
