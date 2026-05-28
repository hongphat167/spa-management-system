# Spa Management System

A production-ready backend application for managing spa operations, built with Kotlin, Spring Boot 3, and PostgreSQL.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Customer Management**: CRUD operations, search, and loyalty points tracking
- **Service Management**: Manage spa services with pricing and duration
- **Appointment Management**: Book appointments, assign therapists, prevent scheduling conflicts
- **Invoice Management**: Generate invoices and track payment status
- **Database Migrations**: Flyway for schema versioning
- **API Documentation**: Swagger/OpenAPI integration
- **Clean Architecture**: Modular monolith with clear separation of concerns

## Tech Stack

- **Language**: Kotlin
- **Framework**: Spring Boot 3.2.0
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA
- **Security**: Spring Security + JWT
- **Build Tool**: Gradle (Kotlin DSL)
- **Containerization**: Docker & Docker Compose
- **API Documentation**: SpringDoc OpenAPI

## Quick Start

### Using Docker Compose (Recommended)

```bash
docker-compose up -d
```

The application will be available at `http://localhost:8080/api`

### Local Development

```bash
./gradlew bootRun
```

## API Documentation

- **Swagger UI**: http://localhost:8080/api/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/api/v3/api-docs
