package com.spa.common.dto

/**
 * Pagination request DTO
 */
data class PaginationRequest(

    val page: Int = 0,

    val size: Int = 10,

    val sortBy: String = "id",

    val sortDirection: String = "ASC"

) {

    fun validatedPage(): Int {
        return if (page < 0) 0 else page
    }

    fun validatedSize(): Int {
        return if (size <= 0 || size > 100) 10 else size
    }
}

/**
 * Pagination response DTO
 */
data class PaginatedResponse<T>(

    val content: List<T>,

    val page: Int,

    val size: Int,

    val totalElements: Long,

    val totalPages: Int,

    val isFirst: Boolean,

    val isLast: Boolean,

    val hasNext: Boolean,

    val hasPrevious: Boolean
)
