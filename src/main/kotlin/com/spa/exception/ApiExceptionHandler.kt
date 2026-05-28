package com.spa.exception

import com.spa.common.dto.ApiResponse
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.FieldError
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.context.request.WebRequest
import java.time.LocalDateTime

@RestControllerAdvice
class ApiExceptionHandler {

    @ExceptionHandler(AppException::class)
    fun handleAppException(
        ex: AppException,
        request: WebRequest
    ): ResponseEntity<ApiResponse<Any>> {

        val response = ApiResponse<Any>(
            status = "ERROR",
            message = ex.message ?: "An error occurred",
            timestamp = LocalDateTime.now()
        )

        return ResponseEntity(
            response,
            HttpStatus.valueOf(ex.statusCode)
        )
    }

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationException(
        ex: MethodArgumentNotValidException,
        request: WebRequest
    ): ResponseEntity<ApiResponse<Any>> {

        val errors = mutableMapOf<String, String>()

        ex.bindingResult.allErrors.forEach { error ->

            val fieldName =
                (error as? FieldError)?.field
                    ?: error.objectName

            val message =
                error.defaultMessage
                    ?: "Invalid value"

            errors[fieldName] = message
        }

        val response = ApiResponse<Any>(
            status = "ERROR",
            message = "Validation failed",
            errors = errors,
            timestamp = LocalDateTime.now()
        )

        return ResponseEntity(
            response,
            HttpStatus.BAD_REQUEST
        )
    }

    @ExceptionHandler(IllegalArgumentException::class)
    fun handleIllegalArgumentException(
        ex: IllegalArgumentException,
        request: WebRequest
    ): ResponseEntity<ApiResponse<Any>> {

        val response = ApiResponse<Any>(
            status = "ERROR",
            message = ex.message ?: "Invalid argument provided",
            timestamp = LocalDateTime.now()
        )

        return ResponseEntity(
            response,
            HttpStatus.BAD_REQUEST
        )
    }

    @ExceptionHandler(Exception::class)
    fun handleGlobalException(
        ex: Exception,
        request: WebRequest
    ): ResponseEntity<ApiResponse<Any>> {

        ex.printStackTrace()

        val response = ApiResponse<Any>(
            status = "ERROR",
            message = "An unexpected error occurred. Please try again later.",
            timestamp = LocalDateTime.now()
        )

        return ResponseEntity(
            response,
            HttpStatus.INTERNAL_SERVER_ERROR
        )
    }
}
