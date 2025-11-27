# Examease Backend (Spring Boot)

This backend provides a minimal Spring Boot REST API used by the frontend in this workspace. It includes JWT authentication, JPA entities, example controllers, DTO validation, and an H2-backed integration test.

Quick start

1. Create MySQL database:

```powershell
mysql -u root -p
CREATE DATABASE examease_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

2. Update `src/main/resources/application.properties` with your DB credentials and a secure `examease.jwt.secret` value.

3. Run:

```powershell
cd c:\Users\hp\OneDrive\Desktop\examease-portal\backend
mvn -DskipTests spring-boot:run
```

Run tests (H2 in-memory):

```powershell
mvn test
```

Frontend route mapping
- `POST /api/student/register` — register (multipart or JSON)
- `POST /api/student/login` — login (returns `{ token, user }`)
- `POST /api/admin/login` — admin login
- `GET /api/exams/published` — public list of published exams
- `POST /api/exam/submit` — submit exam (matches frontend expected body)

Notes
- Replace the JWT secret with a secure env-var or vault config for production.
- Seed admin user by creating a BCrypt password and inserting into `data.sql` or via the repository.
# Backend verification

This file is created to verify that files can be created under `backend/`.
