# ExamEase - Online Examination Portal

## Project Info

A comprehensive examination portal built with React, TypeScript, and Spring Boot.

## Technologies Used

**Frontend:**
- React with TypeScript
- Vite
- Tailwind CSS
- shadcn-ui components
- React Router

**Backend:**
- Spring Boot 3.1.4
- PostgreSQL
- JWT Authentication
- Hibernate/JPA

## Getting Started

### Prerequisites
- Node.js & npm installed
- Java 17+
- PostgreSQL

### Frontend Setup

```sh
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on http://localhost:8083

### Backend Setup

```sh
# Navigate to backend directory
cd backend

# Configure PostgreSQL in application.properties
# spring.datasource.url=jdbc:postgresql://localhost:5432/examease_db
# spring.datasource.username=postgres
# spring.datasource.password=root

# Run using Spring Tool Suite or Maven
mvn spring-boot:run
```

The backend will run on http://localhost:8085

## Features

- **Admin Portal**: Create and manage exams, questions, and students
- **Student Portal**: Register, login, take exams, view results
- **Profile Management**: Update personal information
- **Secure Authentication**: JWT-based auth system
- **Real-time Results**: Instant exam scoring and feedback
