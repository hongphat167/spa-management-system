package com.spa.common.dto

import java.time.LocalDateTime

/**
 * Standard API Response wrapper for all endpoints
 */
data class ApiResponse<T>(
    val status: String,
    val message: String,
    val data: T? = null,
    val timestamp: LocalDateTime = LocalDateTime.now(),
    val errors: Map<String, String>? = null
) {
    companion object {
        fun <T> success(data: T, message: String = "Success"): ApiResponse<T> {
            return ApiResponse(
                status = "SUCCESS",
                message = message,
                data = data
            )
        }

        fun <T> success(message: String = "Success"): ApiResponse<T> {
            return ApiResponse(
                status = "SUCCESS",
                message = message,
                data = null
            )
        }

        fun <T> error(message: String, errors: Map<String, String>? = null): ApiResponse<T> {
            return ApiResponse(
                status = "ERROR",
                message = message,
                errors = errors
            )
        }
    }
}
