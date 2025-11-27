# Complete ExamEase Deployment Script

# Replace with your details
$DOCKER_USERNAME = "visala337"
$GITHUB_REPO = "visala337/examease-portal"

Write-Host "================================" -ForegroundColor Cyan
Write-Host "ExamEase Complete Push Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Build Docker images
Write-Host "Step 1: Building Docker images..." -ForegroundColor Green
docker-compose build

# Step 2: Tag images
Write-Host "Step 2: Tagging images for Docker Hub..." -ForegroundColor Green
docker tag examease-portal-backend:latest ${DOCKER_USERNAME}/examease-backend:latest
docker tag examease-portal-frontend:latest ${DOCKER_USERNAME}/examease-frontend:latest
docker tag postgres:15-alpine ${DOCKER_USERNAME}/examease-postgres:latest

# Step 3: Push to Docker Hub
Write-Host "Step 3: Pushing images to Docker Hub..." -ForegroundColor Green
docker push ${DOCKER_USERNAME}/examease-backend:latest
docker push ${DOCKER_USERNAME}/examease-frontend:latest

Write-Host ""
Write-Host "Docker Hub images pushed successfully!" -ForegroundColor Green
Write-Host "  - ${DOCKER_USERNAME}/examease-backend:latest" -ForegroundColor Cyan
Write-Host "  - ${DOCKER_USERNAME}/examease-frontend:latest" -ForegroundColor Cyan
Write-Host ""

# Step 4: Git operations
Write-Host "Step 4: Pushing to GitHub..." -ForegroundColor Green

# Initialize git if needed
if (!(Test-Path .git)) {
    git init
    Write-Host "Git initialized" -ForegroundColor Yellow
}

# Add all files
git add .

# Commit
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Complete ExamEase Portal - Docker ready"
}
git commit -m "$commitMessage"

# Add remote if not exists
$remoteExists = git remote | Select-String -Pattern "origin"
if (!$remoteExists) {
    git remote add origin https://github.com/$GITHUB_REPO.git
    Write-Host "Remote origin added" -ForegroundColor Yellow
}

# Push to GitHub
git branch -M main
git push -u origin main

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "GitHub Repository:" -ForegroundColor Yellow
Write-Host "  https://github.com/$GITHUB_REPO" -ForegroundColor Cyan
Write-Host ""
Write-Host "Docker Hub Images:" -ForegroundColor Yellow
Write-Host "  https://hub.docker.com/r/${DOCKER_USERNAME}/examease-backend" -ForegroundColor Cyan
Write-Host "  https://hub.docker.com/r/${DOCKER_USERNAME}/examease-frontend" -ForegroundColor Cyan
Write-Host ""
Write-Host "Anyone can now deploy with:" -ForegroundColor Yellow
Write-Host "  docker pull ${DOCKER_USERNAME}/examease-backend:latest" -ForegroundColor White
Write-Host "  docker pull ${DOCKER_USERNAME}/examease-frontend:latest" -ForegroundColor White
Write-Host "  docker-compose up -d" -ForegroundColor White
Write-Host ""
