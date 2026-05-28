package com.spa.common.exception

open class ApplicationException(
    message: String,
    cause: Throwable? = null,
    val errorCode: String = "INTERNAL_ERROR"
) : RuntimeException(message, cause)

class ResourceNotFoundException(
    message: String,
    errorCode: String = "RESOURCE_NOT_FOUND"
) : ApplicationException(message, errorCode = errorCode)

class ValidationException(
    message: String,
    errorCode: String = "VALIDATION_ERROR"
) : ApplicationException(message, errorCode = errorCode)

class BusinessLogicException(
    message: String,
    errorCode: String = "BUSINESS_LOGIC_ERROR"
) : ApplicationException(message, errorCode = errorCode)

class UnauthorizedException(
    message: String,
    errorCode: String = "UNAUTHORIZED"
) : ApplicationException(message, errorCode = errorCode)

class ForbiddenException(
    message: String,
    errorCode: String = "FORBIDDEN"
) : ApplicationException(message, errorCode = errorCode)

class ConflictException(
    message: String,
    errorCode: String = "CONFLICT"
) : ApplicationException(message, errorCode = errorCode)
