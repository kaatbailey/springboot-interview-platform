# Spring Boot Interview Preparation Platform

Full-stack learning platform for Spring Boot interview preparation.

## Quick Start

1. Start database: `podman-compose up -d`
2. Start backend: `cd backend && ./mvnw spring-boot:run`
3. Start frontend: `cd frontend && npm install && npm run dev`

## Documentation

- See `COMPLETE-MVP-CODE.md` for all source code
- See `SETUP-INSTRUCTIONS.md` for detailed setup
- See `PODMAN-GUIDE.md` for Podman commands

## Tech Stack

- **Backend**: Spring Boot 3.2, PostgreSQL, JWT
- **Frontend**: React 18, Vite, TailwindCSS, Monaco Editor
- **Infrastructure**: Podman/Docker, pgAdmin

## Features

- ✅ User authentication (JWT)
- ✅ Interactive code editor
- ✅ Automated code verification
- ✅ Progress tracking with XP
- ✅ 50 Spring Boot interview questions

## Default Credentials

After starting, register a new account or use the test data loaded automatically.
