# Web Content Management

A full‑stack platform to create and manage website content without writing code. It provides a visual way to organize pages, layouts, components, and data, powered by an Angular frontend and a Spring Boot backend with MongoDB storage.

## Table of Contents
- Description
- Features
- Architecture
- Project Structure
- Prerequisites
- Quick Start
- Configuration (Environment)
- Development
- Build & Production
- API Overview
- Troubleshooting
- Contributing
- License

## Description
This project is a comprehensive platform designed to help users effortlessly create and manage stunning content without writing a single line of code. It leverages modern web technologies and frameworks to provide a seamless user experience.

## Features
- Responsive design across devices
- User authentication and authorization
- Content management (create, edit, delete)
- Real‑time updates
- Customizable themes

## Architecture
- Frontend: Angular, TypeScript, Tailwind CSS
- Backend: Spring Boot (Java), Maven
- Database: MongoDB
- Communication: RESTful JSON APIs
- Default ports: Backend 8080, Frontend 4200, MongoDB 27017

## Project Structure
- frontend/web-content-management-front — Angular application (components, services, routing)
- backend/web-content-management-back — Spring Boot application (controllers, services, models)
- database — optional seeds or backups
- docs — documentation assets

## Prerequisites
- Node.js (LTS recommended)
- npm
- Java 17+ (align with your local setup)
- Maven 3.8+
- MongoDB 6+

## Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/ines312692/web-content-management.git
   cd web-content-management
   ```
2. Install frontend dependencies:
   ```bash
   cd frontend/web-content-management-front
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd ../../backend/web-content-management-back
   mvn install
   ```
4. Start MongoDB locally (if not already running) and ensure a database is available.
5. Start the backend server:
   ```bash
   mvn spring-boot:run
   ```
6. In a new terminal, start the frontend dev server:
   ```bash
   cd ../../frontend/web-content-management-front
   npm start
   ```
7. Access the application: http://localhost:4200

## Configuration (Environment)
Backend (Spring Boot):
- Location: backend/web-content-management-back/src/main/resources/application.properties (or application.yml)
- Typical properties:
  - spring.data.mongodb.uri=mongodb://localhost:27017/web-content-management
  - server.port=8080
  - jwt/secret or auth settings if applicable

Frontend (Angular):
- Environment files under frontend/web-content-management-front/src/environments/
- Set the API base URL to the backend, e.g. http://localhost:8080

## Development
- Useful npm scripts (run inside frontend folder):
  - npm start — starts Angular dev server on 4200
  - npm run build — production build of the frontend
  - npm test — run unit tests (if configured)
- Useful Maven commands (run inside backend folder):
  - mvn spring-boot:run — run backend
  - mvn test — run backend tests
  - mvn package — build JAR

## Build & Production
Frontend build:
```bash
cd frontend/web-content-management-front
npm run build
```
Output goes to dist/ and can be served by any static server.

Backend build and run JAR:
```bash
cd backend/web-content-management-back
mvn clean package
java -jar target/web-content-management-back-*.jar
```
Ensure the backend is configured to serve the frontend or host the frontend separately (e.g., Nginx) and point it to the backend API.

## API Overview
- Base URL (dev): http://localhost:8080/api
- Typical resources (based on services present):
  - /users — user management
  - /projects — project operations
  - /websites — website definitions
  - /pages — pages and layouts
  - /nodes — content nodes
  - /tables — data tables
Authentication may be required for certain endpoints. See backend controllers for exact routes and payloads.

## Troubleshooting
- Port conflicts: change frontend port via Angular config or run with --port, change backend via server.port.
- MongoDB connection errors: verify MongoDB is running and URI matches your setup.
- CORS issues: ensure backend CORS configuration allows http://localhost:4200 during development.
- Build failures: ensure Java/Maven versions match prerequisites.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is released under the MIT License (or your chosen license). Update this section if a different license applies.