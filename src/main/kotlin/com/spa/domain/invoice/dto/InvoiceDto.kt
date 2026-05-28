package com.spa.domain.invoice.dto

import java.math.BigDecimal
import java.time.LocalDateTime

data class InvoiceDto(
    val id: Long? = null,
    val appointmentId: Long,
    val customerId: Long,
    val totalAmount: BigDecimal,
    val taxAmount: BigDecimal = BigDecimal.ZERO,
    val discountAmount: BigDecimal = BigDecimal.ZERO,
    val paymentStatus: String = "PENDING",
    val dueAt: LocalDateTime,
    val paidAt: LocalDateTime? = null,
    val createdAt: LocalDateTime? = null,
    val updatedAt: LocalDateTime? = null
)
