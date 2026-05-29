package com.spa.domain.appointment.dto

import java.time.LocalDateTime

data class PublicBookingRequestDto(
    val serviceId: Long,
    val therapistId: Long? = null,
    val appointmentDate: LocalDateTime,
    val customerFirstName: String,
    val customerLastName: String,
    val customerEmail: String,
    val customerPhone: String? = null,
    val notes: String? = null
)