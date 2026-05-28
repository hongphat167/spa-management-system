package com.spa.domain.appointment.dto

import java.time.LocalDateTime

data class AppointmentDto(
    val id: Long? = null,
    val customerId: Long,
    val therapistId: Long? = null,
    val serviceId: Long,
    val appointmentDate: LocalDateTime,
    val endTime: LocalDateTime,
    val status: String = "SCHEDULED",
    val notes: String? = null,
    val createdAt: LocalDateTime? = null,
    val updatedAt: LocalDateTime? = null
)
