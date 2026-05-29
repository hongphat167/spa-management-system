package com.spa.domain.therapist.mapper

import com.spa.domain.therapist.dto.TherapistDto
import com.spa.domain.therapist.entity.Therapist
import org.springframework.stereotype.Component

@Component
class TherapistMapper {

    fun toDto(therapist: Therapist): TherapistDto {
        return TherapistDto(
            id = therapist.id,
            userId = therapist.user?.id!!,
            userFirstName = therapist.user?.firstName,
            userLastName = therapist.user?.lastName,
            userEmail = therapist.user?.email,
            userPhone = therapist.user?.phone,
            specialization = therapist.specialization,
            experienceYears = therapist.experienceYears,
            isAvailable = therapist.isAvailable,
            createdAt = therapist.createdAt,
            updatedAt = therapist.updatedAt
        )
    }

    fun toEntity(dto: TherapistDto): Therapist {
        return Therapist(
            id = dto.id,
            specialization = dto.specialization,
            experienceYears = dto.experienceYears,
            isAvailable = dto.isAvailable
        )
    }

    fun toDtoList(therapists: List<Therapist>): List<TherapistDto> {
        return therapists.map { toDto(it) }
    }
}
