-- V1__initial_schema.sql
-- Initial Database Schema for Spa Management System

-- Users Table
CREATE TABLE users (
                       id         BIGSERIAL PRIMARY KEY,
                       email      VARCHAR(255) NOT NULL UNIQUE,
                       password   VARCHAR(255) NOT NULL,
                       first_name VARCHAR(100) NOT NULL,
                       last_name  VARCHAR(100) NOT NULL,
                       phone      VARCHAR(20),
                       role       VARCHAR(50)  NOT NULL,
                       is_active  BOOLEAN   DEFAULT true,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       deleted_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_is_active ON users(is_active);

-- Customers Table
CREATE TABLE customers (
                           id             BIGSERIAL PRIMARY KEY,
                           email          VARCHAR(255) NOT NULL UNIQUE,
                           first_name     VARCHAR(100) NOT NULL,
                           last_name      VARCHAR(100) NOT NULL,
                           phone          VARCHAR(20),
                           date_of_birth  DATE,
                           loyalty_points INT            DEFAULT 0,
                           total_spent    DECIMAL(10, 2) DEFAULT 0.00,
                           is_active      BOOLEAN        DEFAULT true,
                           created_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
                           updated_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
                           deleted_at     TIMESTAMP
);

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_is_active ON customers(is_active);

-- Spa Services Table
CREATE TABLE spa_services (
                              id               BIGSERIAL PRIMARY KEY,
                              name             VARCHAR(255)   NOT NULL,
                              description      TEXT,
                              price            DECIMAL(10, 2) NOT NULL,
                              duration_minutes INT            NOT NULL,
                              is_active        BOOLEAN   DEFAULT true,
                              created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              deleted_at       TIMESTAMP
);

CREATE INDEX idx_spa_services_is_active ON spa_services(is_active);

-- Therapists Table
CREATE TABLE therapists (
                            id               BIGSERIAL PRIMARY KEY,
                            user_id          BIGINT NOT NULL UNIQUE,
                            specialization   VARCHAR(255),
                            experience_years INT,
                            is_available     BOOLEAN   DEFAULT true,
                            created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            deleted_at       TIMESTAMP,
                            FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE INDEX idx_therapists_user_id ON therapists(user_id);
CREATE INDEX idx_therapists_is_available ON therapists(is_available);

-- Appointments Table
CREATE TABLE appointments (
                              id               BIGSERIAL PRIMARY KEY,
                              customer_id      BIGINT      NOT NULL,
                              service_id       BIGINT      NOT NULL,
                              therapist_id     BIGINT,
                              appointment_date TIMESTAMP   NOT NULL,
                              end_time         TIMESTAMP   NOT NULL,
                              status           VARCHAR(50) NOT NULL,
                              notes            TEXT,
                              created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              deleted_at       TIMESTAMP,
                              FOREIGN KEY (customer_id) REFERENCES customers (id),
                              FOREIGN KEY (service_id) REFERENCES spa_services (id),
                              FOREIGN KEY (therapist_id) REFERENCES therapists (id)
);

CREATE INDEX idx_appointments_customer_id ON appointments(customer_id);
CREATE INDEX idx_appointments_service_id ON appointments(service_id);
CREATE INDEX idx_appointments_therapist_id ON appointments(therapist_id);
CREATE INDEX idx_appointments_appointment_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);

-- Invoices Table
CREATE TABLE invoices (
                          id              BIGSERIAL PRIMARY KEY,
                          appointment_id  BIGINT         NOT NULL UNIQUE,
                          customer_id     BIGINT         NOT NULL,
                          total_amount    DECIMAL(10, 2) NOT NULL,
                          tax_amount      DECIMAL(10, 2) DEFAULT 0.00,
                          discount_amount DECIMAL(10, 2) DEFAULT 0.00,
                          payment_status  VARCHAR(50)    NOT NULL,
                          issued_at       TIMESTAMP      NOT NULL,
                          due_at          TIMESTAMP,
                          paid_at         TIMESTAMP,
                          created_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
                          updated_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
                          deleted_at      TIMESTAMP,
                          FOREIGN KEY (appointment_id) REFERENCES appointments (id),
                          FOREIGN KEY (customer_id) REFERENCES customers (id)
);

CREATE INDEX idx_invoices_customer_id ON invoices(customer_id);
CREATE INDEX idx_invoices_payment_status ON invoices(payment_status);
CREATE INDEX idx_invoices_issued_at ON invoices(issued_at);
