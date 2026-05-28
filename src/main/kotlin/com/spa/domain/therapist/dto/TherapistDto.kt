package com.spa.domain.therapist.dto

import java.time.LocalDateTime

data class TherapistDto(
    val id: Long? = null,
    val userId: Long,
    val specialization: String,
    val experienceYears: Int,
    val isAvailable: Boolean = true,
    val createdAt: LocalDateTime? = null,
    val updatedAt: LocalDateTime? = null
)
