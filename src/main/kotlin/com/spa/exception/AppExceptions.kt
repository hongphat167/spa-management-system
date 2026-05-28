package com.spa.exception

/**
 * Base exception for application
 */
open class AppException(
    message: String,
    val errorCode: String = "INTERNAL_ERROR",
    val statusCode: Int = 500,
    cause: Throwable? = null
) : RuntimeException(message, cause)

/**
 * Exception thrown when resource is not found
 */
class ResourceNotFoundException(
    message: String,
    errorCode: String = "RESOURCE_NOT_FOUND"
) : AppException(message, errorCode, 404)

/**
 * Exception thrown for validation errors
 */
class ValidationException(
    message: String,
    errorCode: String = "VALIDATION_ERROR"
) : AppException(message, errorCode, 400)

/**
 * Exception thrown for conflict errors (e.g., duplicate resource)
 */
class ConflictException(
    message: String,
    errorCode: String = "CONFLICT"
) : AppException(message, errorCode, 409)

/**
 * Exception thrown for unauthorized access
 */
class UnauthorizedException(
    message: String,
    errorCode: String = "UNAUTHORIZED"
) : AppException(message, errorCode, 401)

/**
 * Exception thrown for forbidden access
 */
class ForbiddenException(
    message: String,
    errorCode: String = "FORBIDDEN"
) : AppException(message, errorCode, 403)

/**
 * Exception thrown for business logic violations
 */
class BusinessException(
    message: String,
    errorCode: String = "BUSINESS_ERROR"
) : AppException(message, errorCode, 422)

/**
 * Exception thrown for authentication failures
 */
class AuthenticationException(
    message: String,
    errorCode: String = "AUTHENTICATION_FAILED"
) : AppException(message, errorCode, 401)

/**
 * Exception thrown when appointment time conflicts
 */
class AppointmentConflictException(
    message: String,
    errorCode: String = "APPOINTMENT_CONFLICT"
) : AppException(message, errorCode, 409)

/**
 * Exception thrown when therapist is unavailable
 */
class TherapistUnavailableException(
    message: String,
    errorCode: String = "THERAPIST_UNAVAILABLE"
) : AppException(message, errorCode, 409)
