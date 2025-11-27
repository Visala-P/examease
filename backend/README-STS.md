# Running the backend in Spring Tool Suite (STS)

This file shows step-by-step instructions to get the `backend` Spring Boot project running in Spring Tool Suite (STS) or Eclipse, and includes a reusable `.launch` file you can import.

Prerequisites
- Java 17 JDK installed and configured in STS (verify `java -version` in a terminal).
- STS / Spring Tools 4 installed in the IDE (instructions below).
- MySQL (or use H2 for quick testing). Create database `examease` if using MySQL.

1) Install Spring Tools 4 (if not already)
- In STS: `Help → Eclipse Marketplace...` → search for `Spring Tools 4` and install.
- Restart STS.

2) Import the project (if not already imported)
- `File → Import... → Maven → Existing Maven Projects` → point to `C:\Users\hp\OneDrive\Desktop\examease-portal\backend` and finish.

3) Optional: Import the included Launch configuration
- Use the provided file `ExameaseBackendApplication.launch` (project root).
- In STS: `File → Import... → Run/Debug → Launch Configurations` → select `Import` and pick the `.launch` file in the project.

4) Run using Spring Boot Dashboard (recommended)
- `Window → Show View → Other... → Spring → Spring Boot Dashboard`.
- If Spring Tools is installed the project should appear; right-click it and choose `Run As → Spring Boot App` or click the Run icon.

5) If `Run As → Spring Boot App` does not appear
- Right-click the main class `src/main/java/com/examease/backend/ExameaseBackendApplication.java` → `Run As → Java Application`.
- This runs Spring Boot exactly the same; you can add environment variables in the Run Configuration (see next step).

6) Add environment variables / program arguments (recommended)
- Open the Run Configuration: `Run → Run Configurations...` → select the launch configuration for `ExameaseBackendApplication` (or create one from the imported `.launch`).
- **Environment** tab: add (examples):
  - `ADMIN_PASSWORD` = `YourChosenAdminPassword`
  - `EXAMASE_JWT_SECRET` = `a_long_secure_secret_here`
  - `SPRING_DATASOURCE_URL` = `jdbc:mysql://localhost:3306/examease?useSSL=false&serverTimezone=UTC`
  - `SPRING_DATASOURCE_USERNAME` = `your_db_user`
  - `SPRING_DATASOURCE_PASSWORD` = `your_db_password`
- **Arguments → Program arguments** (alternative override):
  --spring.datasource.url=jdbc:mysql://localhost:3306/examease?useSSL=false&serverTimezone=UTC
  --spring.datasource.username=your_db_user
  --spring.datasource.password=your_db_password
- **Arguments → VM arguments** (for system properties):
  -Dexamease.jwt.secret=a_long_secure_secret_here

Postgres / pgAdmin notes
- Use Postgres when you want to inspect/manage the database via pgAdmin. Create a database (e.g. `examease_db`) and a user account.
- To run the app with Postgres you can either set environment variables in your Run Configuration or activate the `postgres` Spring profile which loads `application-postgres.properties`:
  - **Activate profile**: `--spring.profiles.active=postgres` (or set `SPRING_PROFILES_ACTIVE=postgres` in Environment tab)
  - **Or set env vars** (Environment tab):
    - `SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/examease_db`
    - `SPRING_DATASOURCE_USERNAME=examease_user`
    - `SPRING_DATASOURCE_PASSWORD=change_me`

Example psql / pgAdmin SQL to create the db & user:
```
CREATE DATABASE examease_db;
CREATE USER examease_user WITH ENCRYPTED PASSWORD 'change_me';
GRANT ALL PRIVILEGES ON DATABASE examease_db TO examease_user;
```

Notes: `application-postgres.properties` already exists in `src/main/resources` and sets `spring.jpa.hibernate.ddl-auto=update` and the Postgres dialect. For production, prefer a migration tool (Flyway/Liquibase) and store secrets securely (env vars or secret manager).

Using the `dev` profile in STS
- I added `application-dev.properties` which defaults to PostgreSQL and port 8080 for easy local STS runs. To run in STS using the `dev` profile:
  - Import the `ExameaseBackendApplication.launch` if you haven't already, then edit its Run Configuration and ensure `SPRING_PROFILES_ACTIVE=dev` is set or the Program arg `--spring.profiles.active=dev` is present.
  - Make sure the Postgres database and user exist (see the SQL snippet above). You can edit the `SPRING_DATASOURCE_*` environment values in the launch config to match your local Postgres/pgAdmin credentials.

That will let you run the backend easily from STS while connecting to Postgres managed by pgAdmin.

7) Verify startup
- In the Console, look for `Created default admin user: ...` or `Admin user already exists:` from `DataLoader`.
- Access endpoints: `http://localhost:8080/api/exams/published` or other endpoints.

8) Troubleshooting
- If STS does not show the Spring Boot Dashboard or Spring features: ensure `Spring Tools 4` is installed and restart the IDE.
- If the project shows Java version errors: `Project → Properties → Java Compiler` set to `17` and `Project Facets` Java version to `17`.
- If dependencies are missing: Right-click project → `Maven → Update Project...`.

9) Notes on the included `.launch`
- The `ExameaseBackendApplication.launch` file in the project root is a Java Application launch configuration you can import. It sets the main class to the Spring Boot application and contains example environment variables (placeholders). Import it as described in step 3.

If you want, I can also add a workspace-ready launch file with your preferred env values filled in (tell me the admin password and DB creds), or guide you through installing Spring Tools step-by-step while you're in STS.

---
Generated on: November 23, 2025
