# Build stage
FROM gradle:8.5-jdk17 as builder

WORKDIR /app

# Copy gradle files
COPY build.gradle.kts settings.gradle.kts ./
COPY gradle ./gradle

# Copy source code
COPY src ./src

# Build the application
RUN gradle clean build -x test

# Runtime stage
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# Create app user
RUN useradd -m -u 1000 appuser

# Copy jar from builder
COPY --from=builder /app/build/libs/*.jar app.jar

# Set ownership
RUN chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:8080/api/actuator/health || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
