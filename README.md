# 🎓 ExamEase - Online Examination Portal

A modern, full-stack online examination platform built with **React**, **TypeScript**, **Spring Boot**, and **PostgreSQL**.

[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://hub.docker.com/u/visala337)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5?logo=kubernetes&logoColor=white)](./k8s)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

### 👨‍💼 Admin Portal
- Secure admin authentication
- Create and manage exams with multiple-choice questions
- View student results and performance analytics
- Student account management

### 👨‍🎓 Student Portal
- User registration and login
- Browse available exams
- Take timed exams with auto-submit
- View instant results and scores
- Profile management with live updates
- Performance tracking dashboard

### 🔧 Technical Highlights
- JWT-based authentication & authorization
- RESTful API architecture
- Responsive UI with Tailwind CSS
- Docker containerization
- Kubernetes deployment ready
- PostgreSQL with JPA/Hibernate

## 🏗️ Architecture

```
Frontend (React + TypeScript)
    ↓
Backend (Spring Boot + JWT)
    ↓
Database (PostgreSQL)
```

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

**Prerequisites:** Docker & Docker Compose

```bash
# Clone the repository
git clone https://github.com/Visala-P/examease.git
cd examease

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:8084
# Backend: http://localhost:8086
```

**Default Admin Credentials:**
- Email: `admin@examease.com`
- Password: `admin123`

### Option 2: Pull from Docker Hub

```bash
docker pull visala337/examease-backend:latest
docker pull visala337/examease-frontend:latest

docker-compose -f docker-compose.hub.yml up -d
```

### Option 3: Local Development

**Backend:**
```bash
cd backend
# Configure PostgreSQL connection in application.properties
mvn spring-boot:run
# Runs on http://localhost:8085
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:8083
```

## 📦 Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- React Router
- Context API for state management

### Backend
- Spring Boot 3.1.4
- Java 17
- PostgreSQL 15
- Hibernate/JPA
- JWT Authentication
- Maven

### DevOps
- Docker & Docker Compose
- Kubernetes manifests
- Nginx
- Multi-stage builds

## 📁 Project Structure

```
examease/
├── backend/              # Spring Boot REST API
│   ├── src/main/java/
│   │   └── com/examease/backend/
│   │       ├── config/
│   │       ├── controller/
│   │       ├── model/
│   │       ├── repository/
│   │       ├── service/
│   │       └── security/
│   └── Dockerfile
│
├── frontend/             # React SPA
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── student/
│   │   ├── lib/
│   │   └── context/
│   └── Dockerfile
│
├── k8s/                 # Kubernetes manifests
├── docker-compose.yml
└── README.md
```

## 🐳 Docker Images

- **Backend:** [visala337/examease-backend](https://hub.docker.com/r/visala337/examease-backend)
- **Frontend:** [visala337/examease-frontend](https://hub.docker.com/r/visala337/examease-frontend)

## ☸️ Kubernetes Deployment

Complete Kubernetes deployment with auto-scaling, health checks, and persistent storage:

```bash
# Deploy to Kubernetes
kubectl apply -f k8s/

# Check status
kubectl get all -n examease

# Access via port-forward
kubectl port-forward -n examease svc/frontend-service 8084:80
```

See [k8s/README.md](./k8s/README.md) for complete Kubernetes documentation.

## 🔐 Security Features

- Password encryption with BCrypt
- JWT token-based authentication
- Role-based access control (Admin/Student)
- CORS configuration
- SQL injection prevention via JPA
- Secure session management

## 📊 API Endpoints

### Admin
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/exams` - Create exam
- `GET /api/admin/exams` - List all exams

### Student
- `POST /api/student/register` - Student registration
- `POST /api/student/login` - Student authentication
- `GET /api/student/me` - Get profile
- `PUT /api/student/me` - Update profile

### Exams
- `GET /api/exams` - List available exams
- `GET /api/exams/{id}` - Get exam details
- `POST /api/exams/{id}/submit` - Submit exam answers

## 🔧 Configuration

### Environment Variables

**Backend (`application.properties`):**
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/examease_db
spring.datasource.username=postgres
spring.datasource.password=root
examease.jwt.secret=YourSecretKey
server.port=8085
```

**Frontend (`.env.local`):**
```env
VITE_API_URL=http://localhost:8085
```

## 🧪 Testing

```bash
# Backend tests
cd backend
mvn test

# Frontend tests
cd frontend
npm test
```

## 📈 Monitoring

```bash
# View Docker logs
docker-compose logs -f

# View specific service logs
docker-compose logs backend
docker-compose logs frontend

# Check health
curl http://localhost:8086/actuator/health
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Visala**
- GitHub: [@Visala-P](https://github.com/Visala-P)
- Docker Hub: [visala337](https://hub.docker.com/u/visala337)

## 🙏 Acknowledgments

- shadcn/ui for beautiful components
- Spring Boot for robust backend
- React community

## 📧 Support

For issues or questions:
- Open an issue on GitHub
- Email: admin@examease.com

---

⭐ **If you find this project useful, please give it a star!**

## 📸 Screenshots

### Student Dashboard
Modern dashboard with performance metrics and exam overview.

### Admin Panel
Comprehensive exam management interface.

### Exam Interface
Clean, distraction-free exam taking experience.

---

**Built with ❤️ for seamless online examinations**
