package com.spa.domain.customer.dto

import java.math.BigDecimal
import java.time.LocalDate
import java.time.LocalDateTime

data class CustomerDto(
    val id: Long? = null,
    val email: String,
    val firstName: String,
    val lastName: String,
    val phone: String?,
    val dateOfBirth: LocalDate? = null,
    val loyaltyPoints: Int = 0,
    val totalSpent: BigDecimal = BigDecimal.ZERO,
    val createdAt: LocalDateTime? = null,
    val updatedAt: LocalDateTime? = null
)
