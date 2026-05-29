package com.spa.domain.therapist.dto

import java.time.LocalDateTime

data class TherapistDto(
    val id: Long? = null,
    val userId: Long,
    val userFirstName: String? = null,
    val userLastName: String? = null,
    val userEmail: String? = null,
    val userPhone: String? = null,
    val specialization: String?,
    val experienceYears: Int,
    val isAvailable: Boolean = true,
    val createdAt: LocalDateTime? = null,
    val updatedAt: LocalDateTime? = null
)
