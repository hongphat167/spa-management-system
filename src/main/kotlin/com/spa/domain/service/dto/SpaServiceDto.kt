package com.spa.domain.service.dto

import java.math.BigDecimal
import java.time.LocalDateTime

data class SpaServiceDto(
    val id: Long? = null,
    val name: String,
    val description: String,
    val price: BigDecimal,
    val durationMinutes: Int,
    val isActive: Boolean = true,
    val createdAt: LocalDateTime? = null,
    val updatedAt: LocalDateTime? = null
)
