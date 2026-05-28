package com.spa.domain.therapist.service

import com.spa.common.dto.PaginatedResponse
import com.spa.common.dto.PaginationRequest
import com.spa.domain.therapist.entity.Therapist
import com.spa.domain.therapist.repository.TherapistRepository
import com.spa.domain.user.repository.UserRepository
import com.spa.exception.ResourceNotFoundException
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class TherapistService(
    private val therapistRepository: TherapistRepository,
    private val userRepository: UserRepository
) {

    fun createTherapist(therapist: Therapist): Therapist {
        return therapistRepository.save(therapist)
    }

    fun updateTherapist(id: Long, therapist: Therapist): Therapist {
        val existing = therapistRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Therapist not found with id: $id") }

        existing.specialization = therapist.specialization
        existing.experienceYears = therapist.experienceYears
        existing.isAvailable = therapist.isAvailable

        return therapistRepository.save(existing)
    }

    fun getTherapistById(id: Long): Therapist {
        return therapistRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Therapist not found with id: $id") }
    }

    fun getAllTherapists(paginationRequest: PaginationRequest): PaginatedResponse<Therapist> {
        val pageable = PageRequest.of(paginationRequest.getPage(), paginationRequest.getSize())
        val page = therapistRepository.findAllActive(pageable)

        return PaginatedResponse(
            content = page.content,
            page = page.number,
            size = page.size,
            totalElements = page.totalElements,
            totalPages = page.totalPages,
            isFirst = page.isFirst,
            isLast = page.isLast,
            hasNext = page.hasNext(),
            hasPrevious = page.hasPrevious()
        )
    }

    fun getAvailableTherapists(): List<Therapist> {
        return therapistRepository.findAvailableTherapists()
    }

    fun deleteTherapist(id: Long) {
        val therapist = therapistRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Therapist not found with id: $id") }
        therapist.delete()
        therapistRepository.save(therapist)
    }

    fun setTherapistAvailability(id: Long, available: Boolean) {
        val therapist = therapistRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Therapist not found with id: $id") }
        therapist.isAvailable = available
        therapistRepository.save(therapist)
    }
}
