# ExamEase Kubernetes Deployment

Complete Kubernetes deployment manifests for ExamEase Portal.

## 📋 Prerequisites

- Kubernetes cluster (Minikube, EKS, GKE, AKS, or any K8s cluster)
- `kubectl` installed and configured
- Docker images pushed to Docker Hub (visala337/examease-backend & visala337/examease-frontend)

## 🚀 Quick Deploy

### Deploy Everything

```bash
# Apply all manifests
kubectl apply -f k8s/

# Check deployment status
kubectl get all -n examease

# Watch pods coming up
kubectl get pods -n examease -w
```

### Deploy Step by Step

```bash
# 1. Create namespace and config
kubectl apply -f k8s/01-config.yaml

# 2. Create storage
kubectl apply -f k8s/02-storage.yaml

# 3. Deploy PostgreSQL
kubectl apply -f k8s/03-postgres.yaml

# 4. Deploy Backend
kubectl apply -f k8s/04-backend.yaml

# 5. Deploy Frontend
kubectl apply -f k8s/05-frontend.yaml

# 6. Create Ingress (optional)
kubectl apply -f k8s/06-ingress.yaml
```

## 📦 Manifest Files

```
k8s/
├── 01-config.yaml      # Namespace, ConfigMap, Secrets
├── 02-storage.yaml     # PersistentVolume & PVC
├── 03-postgres.yaml    # PostgreSQL Deployment & Service
├── 04-backend.yaml     # Spring Boot Backend Deployment & Service
├── 05-frontend.yaml    # React Frontend Deployment & Service
└── 06-ingress.yaml     # Ingress for external access (optional)
```

## 🔍 Verify Deployment

```bash
# Check all resources
kubectl get all -n examease

# Check pods
kubectl get pods -n examease

# Check services
kubectl get svc -n examease

# Check logs
kubectl logs -f deployment/backend -n examease
kubectl logs -f deployment/frontend -n examease
kubectl logs -f deployment/postgres -n examease
```

## 🌐 Access the Application

### Using LoadBalancer (Cloud Providers)

```bash
# Get frontend service external IP
kubectl get svc frontend-service -n examease

# Access via: http://<EXTERNAL-IP>
```

### Using NodePort (Minikube/Local)

```bash
# Change frontend service type to NodePort in 05-frontend.yaml
kubectl apply -f k8s/05-frontend.yaml

# Get the URL (Minikube)
minikube service frontend-service -n examease --url

# Get NodePort
kubectl get svc frontend-service -n examease
# Access via: http://<NODE-IP>:<NODE-PORT>
```

### Using Port Forward (Development)

```bash
# Forward frontend
kubectl port-forward -n examease svc/frontend-service 8084:80

# Forward backend
kubectl port-forward -n examease svc/backend-service 8086:8085

# Access:
# Frontend: http://localhost:8084
# Backend: http://localhost:8086
```

### Using Ingress (Production)

1. Install NGINX Ingress Controller:
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
```

2. Update domain in `06-ingress.yaml`:
```yaml
- host: examease.yourdomain.com
```

3. Apply ingress:
```bash
kubectl apply -f k8s/06-ingress.yaml
```

4. Point your domain DNS to the ingress IP:
```bash
kubectl get ingress -n examease
```

## ⚙️ Configuration

### Update Secrets

Edit `01-config.yaml` to change passwords:
```yaml
stringData:
  POSTGRES_PASSWORD: your-password
  SPRING_DATASOURCE_PASSWORD: your-password
  ADMIN_PASSWORD: your-admin-password
  JWT_SECRET: your-jwt-secret
```

Then apply:
```bash
kubectl apply -f k8s/01-config.yaml
kubectl rollout restart deployment/backend -n examease
```

### Scale Deployments

```bash
# Scale backend
kubectl scale deployment backend -n examease --replicas=3

# Scale frontend
kubectl scale deployment frontend -n examease --replicas=3
```

### Update Images

```bash
# Update backend image
kubectl set image deployment/backend backend=visala337/examease-backend:v2 -n examease

# Update frontend image
kubectl set image deployment/frontend frontend=visala337/examease-frontend:v2 -n examease
```

## 🔄 Rolling Updates

```bash
# Check rollout status
kubectl rollout status deployment/backend -n examease

# View rollout history
kubectl rollout history deployment/backend -n examease

# Rollback to previous version
kubectl rollout undo deployment/backend -n examease
```

## 📊 Monitoring

### Resource Usage

```bash
# View resource usage
kubectl top pods -n examease
kubectl top nodes
```

### Events

```bash
# View events
kubectl get events -n examease --sort-by='.lastTimestamp'
```

### Logs

```bash
# Stream logs
kubectl logs -f deployment/backend -n examease
kubectl logs -f deployment/frontend -n examease

# View previous logs
kubectl logs deployment/backend -n examease --previous
```

## 🗄️ Database Access

### Connect to PostgreSQL

```bash
# Port forward to database
kubectl port-forward -n examease svc/postgres-service 5432:5432

# Connect with psql
psql -h localhost -U postgres -d examease_db
# Password: root

# Or use exec
kubectl exec -it deployment/postgres -n examease -- psql -U postgres -d examease_db
```

### Database Backup

```bash
# Backup
kubectl exec deployment/postgres -n examease -- pg_dump -U postgres examease_db > backup.sql

# Restore
cat backup.sql | kubectl exec -i deployment/postgres -n examease -- psql -U postgres examease_db
```

## 🧹 Cleanup

```bash
# Delete all resources
kubectl delete namespace examease

# Or delete individually
kubectl delete -f k8s/
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│           Ingress Controller            │
│         (examease.yourdomain.com)       │
└────────────┬────────────────────────────┘
             │
     ┌───────┴────────┐
     │                │
     ▼                ▼
┌─────────┐    ┌──────────┐
│Frontend │    │ Backend  │
│Service  │    │ Service  │
│(2 pods) │    │ (2 pods) │
└─────────┘    └────┬─────┘
                    │
                    ▼
              ┌──────────┐
              │PostgreSQL│
              │ Service  │
              │ (1 pod)  │
              └────┬─────┘
                   │
                   ▼
          ┌────────────────┐
          │PersistentVolume│
          │   (5Gi storage)│
          └────────────────┘
```

## 🔐 Security Best Practices

1. **Use Secrets** for sensitive data
2. **Enable RBAC** for access control
3. **Use Network Policies** to restrict pod communication
4. **Enable Pod Security Standards**
5. **Use TLS/SSL** with cert-manager
6. **Regular updates** of images

## 📈 Production Recommendations

1. **High Availability:**
   - Run multiple replicas (backend: 3+, frontend: 2+)
   - Use anti-affinity rules
   - Multiple availability zones

2. **Resource Limits:**
   - Set appropriate requests and limits
   - Enable cluster autoscaling

3. **Monitoring:**
   - Install Prometheus & Grafana
   - Set up alerts
   - Log aggregation with ELK/Loki

4. **Backup:**
   - Regular database backups
   - Store in external storage (S3, GCS)

5. **CI/CD:**
   - Automate deployments with ArgoCD/Flux
   - Use GitOps workflow

## 🆘 Troubleshooting

### Pods not starting

```bash
kubectl describe pod <pod-name> -n examease
kubectl logs <pod-name> -n examease
```

### Database connection issues

```bash
# Check postgres is running
kubectl get pods -n examease -l app=postgres

# Check backend can reach postgres
kubectl exec -it deployment/backend -n examease -- ping postgres-service
```

### Service not accessible

```bash
# Check service endpoints
kubectl get endpoints -n examease

# Check if pods are ready
kubectl get pods -n examease
```

## 🎯 Default Credentials

- **Admin Email:** admin@examease.com
- **Admin Password:** admin123
- **Database:** examease_db
- **DB User:** postgres
- **DB Password:** root

**⚠️ Change these in production!**

## 📞 Support

For issues:
- GitHub: https://github.com/Visala-P/examease
- Create an issue with logs and describe the problem
