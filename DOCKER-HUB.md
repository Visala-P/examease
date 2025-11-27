# Docker Hub Push Guide

## 📦 Push ExamEase to Docker Hub

### Prerequisites
- Docker Hub account created
- Logged in via `docker login`

### Step 1: Tag Your Images

Replace `yourusername` with your Docker Hub username:

```powershell
# Tag backend image
docker tag examease-portal-backend:latest yourusername/examease-backend:latest

# Tag frontend image
docker tag examease-portal-frontend:latest yourusername/examease-frontend:latest
```

### Step 2: Push to Docker Hub

```powershell
# Push backend
docker push yourusername/examease-backend:latest

# Push frontend
docker push yourusername/examease-frontend:latest
```

### Step 3: Update docker-compose.yml for Docker Hub

Create `docker-compose.hub.yml`:

```yaml
services:
  postgres:
    image: postgres:15-alpine
    container_name: examease-postgres
    environment:
      POSTGRES_DB: examease_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: root
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - examease-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    image: yourusername/examease-backend:latest
    container_name: examease-backend
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/examease_db
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: root
      ADMIN_PASSWORD: admin123
    ports:
      - "8086:8085"
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - examease-network
    restart: unless-stopped

  frontend:
    image: yourusername/examease-frontend:latest
    container_name: examease-frontend
    ports:
      - "8084:80"
    depends_on:
      - backend
    networks:
      - examease-network
    restart: unless-stopped

volumes:
  postgres_data:

networks:
  examease-network:
    driver: bridge
```

### Anyone Can Deploy Using:

```powershell
# Download the docker-compose.hub.yml file
# Then run:
docker-compose -f docker-compose.hub.yml up -d
```

### Complete Automation Script

Create `push-to-dockerhub.ps1`:

```powershell
# Set your Docker Hub username
$DOCKER_USERNAME = "yourusername"

Write-Host "Building images..." -ForegroundColor Green
docker-compose build

Write-Host "Tagging images..." -ForegroundColor Green
docker tag examease-portal-backend:latest $DOCKER_USERNAME/examease-backend:latest
docker tag examease-portal-frontend:latest $DOCKER_USERNAME/examease-frontend:latest

Write-Host "Pushing to Docker Hub..." -ForegroundColor Green
docker push $DOCKER_USERNAME/examease-backend:latest
docker push $DOCKER_USERNAME/examease-frontend:latest

Write-Host "Done! Images pushed to Docker Hub" -ForegroundColor Green
Write-Host "Backend: $DOCKER_USERNAME/examease-backend:latest" -ForegroundColor Cyan
Write-Host "Frontend: $DOCKER_USERNAME/examease-frontend:latest" -ForegroundColor Cyan
```

Run with:
```powershell
.\push-to-dockerhub.ps1
```
