# ExamEase - Online Examination Portal

A comprehensive online examination platform built with **React**, **TypeScript**, **Spring Boot**, and **PostgreSQL**. Supports secure exam management, student registration, real-time grading, and detailed analytics.

![ExamEase](https://img.shields.io/badge/ExamEase-1.0.0-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Features

### Admin Portal
- 🔐 Secure admin authentication
- 📝 Create and manage exams
- ❓ Add multiple-choice questions
- 📊 View student results and analytics
- 👥 Manage student accounts

### Student Portal
- 📱 User-friendly registration and login
- 📋 Browse available exams
- ⏱️ Timed exam taking with auto-submit
- 🎯 Instant results and scores
- 👤 Profile management
- 📈 Performance tracking

### Technical Features
- 🔒 JWT-based authentication
- 🐘 PostgreSQL database
- 🎨 Modern UI with Tailwind CSS & shadcn/ui
- 🐳 Docker containerization
- 🚀 Production-ready deployment

## 🏗️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast builds
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **React Router** for navigation

### Backend
- **Spring Boot 3.1.4**
- **Java 17**
- **PostgreSQL 15**
- **Hibernate/JPA**
- **JWT Authentication**
- **Maven** for build management

### DevOps
- **Docker & Docker Compose**
- **Nginx** for frontend serving
- Multi-stage Docker builds

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose installed
- Git

### Run with Docker (Recommended)

1. **Clone the repository:**
```bash
git clone https://github.com/Visala-P/examease.git
cd examease
```

2. **Start all services:**
```bash
docker-compose up -d
```

3. **Access the application:**
- **Frontend:** http://localhost:8084
- **Backend API:** http://localhost:8086
- **Database:** localhost:5432

4. **Default Admin Credentials:**
- Email: `admin@examease.com`
- Password: `admin123`

### Run from Docker Hub

Pull and run pre-built images:
```bash
# Pull images
docker pull visala337/examease-backend:latest
docker pull visala337/examease-frontend:latest

# Run with docker-compose
docker-compose -f docker-compose.hub.yml up -d
```

## 💻 Local Development

### Backend Setup

```bash
cd backend

# Configure PostgreSQL in application.properties
# spring.datasource.url=jdbc:postgresql://localhost:5432/examease_db
# spring.datasource.username=postgres
# spring.datasource.password=root

# Run with Maven
mvn spring-boot:run

# Or import in Spring Tool Suite (STS) and run
```

Backend runs on: http://localhost:8085

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: http://localhost:8083

## 📦 Project Structure

```
examease/
├── backend/                    # Spring Boot application
│   ├── src/main/java/
│   │   └── com/examease/backend/
│   │       ├── config/        # Security, CORS, DataLoader
│   │       ├── controller/    # REST endpoints
│   │       ├── model/         # JPA entities
│   │       ├── repository/    # Data access layer
│   │       ├── service/       # Business logic
│   │       └── security/      # JWT & authentication
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Page components
│   │   │   ├── admin/        # Admin portal pages
│   │   │   └── student/      # Student portal pages
│   │   ├── lib/              # Utilities & API
│   │   ├── hooks/            # Custom React hooks
│   │   └── context/          # Global state
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── docker-compose.yml         # Local development
├── docker-compose.hub.yml     # Production deployment
└── README.md
```

## 🗄️ Database Schema

### Tables
- `users` - Student and admin accounts
- `exam` - Exam details
- `question` - Exam questions
- `option` - Question options
- `answer` - Correct answers
- `attempt` - Student exam attempts

## 🔧 Configuration

### Environment Variables

**Backend (application.properties):**
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/examease_db
spring.datasource.username=postgres
spring.datasource.password=root
examease.jwt.secret=YourSecretKey
server.port=8085
```

**Frontend (.env.local):**
```env
VITE_API_URL=http://localhost:8085
```

### Docker Configuration

Modify `docker-compose.yml` to customize:
- Database credentials
- Port mappings
- Admin password
- Resource limits

## 📊 API Endpoints

### Admin
- `POST /api/admin/login` - Admin login
- `POST /api/admin/exams` - Create exam
- `GET /api/admin/exams` - List all exams

### Student
- `POST /api/student/register` - Student registration
- `POST /api/student/login` - Student login
- `GET /api/student/me` - Get profile
- `PUT /api/student/me` - Update profile

### Exams
- `GET /api/exams` - List available exams
- `GET /api/exams/{id}` - Get exam details
- `POST /api/exams/{id}/submit` - Submit exam

## 🐳 Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild images
docker-compose up -d --build

# Remove all data
docker-compose down -v
```

## 🌐 Production Deployment

### Deploy to AWS/DigitalOcean/Azure

1. **SSH into your server**
```bash
ssh user@your-server-ip
```

2. **Install Docker**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

3. **Clone and run**
```bash
git clone https://github.com/Visala-P/examease.git
cd examease
docker-compose up -d
```

4. **Configure domain and SSL** (optional)
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com
```

## 🔒 Security

- JWT token-based authentication
- Password encryption with BCrypt
- CORS configuration
- SQL injection prevention via JPA
- Role-based access control (Admin/Student)

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📸 Screenshots

### Student Dashboard
![Dashboard](screenshots/dashboard.png)

### Admin Panel
![Admin](screenshots/admin.png)

### Exam Taking
![Exam](screenshots/exam.png)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Visala**
- GitHub: [@Visala-P](https://github.com/Visala-P)
- Docker Hub: [visala337](https://hub.docker.com/u/visala337)

## 🙏 Acknowledgments

- shadcn/ui for the beautiful component library
- Spring Boot for the robust backend framework
- Docker for containerization

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Email: admin@examease.com

---

⭐ **Star this repository if you find it helpful!**
