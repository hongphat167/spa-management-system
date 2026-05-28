package com.spa.domain.therapist.service

import com.spa.common.exception.ResourceNotFoundException
import com.spa.domain.therapist.dto.TherapistDto
import com.spa.domain.therapist.mapper.TherapistMapper
import com.spa.domain.therapist.repository.TherapistRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class TherapistService(
    private val therapistRepository: TherapistRepository,
    private val therapistMapper: TherapistMapper
) {

    fun createTherapist(dto: TherapistDto): TherapistDto {
        val therapist = therapistMapper.toEntity(dto)
        val saved = therapistRepository.save(therapist)
        return therapistMapper.toDto(saved)
    }

    @Transactional(readOnly = true)
    fun getTherapistById(id: Long): TherapistDto {
        val therapist = therapistRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Therapist not found with id: $id") }
        return therapistMapper.toDto(therapist)
    }

    @Transactional(readOnly = true)
    fun getAllTherapists(pageable: Pageable): Page<TherapistDto> {
        return therapistRepository.findAllActive(pageable)
            .map { therapistMapper.toDto(it) }
    }

    @Transactional(readOnly = true)
    fun getAvailableTherapists(pageable: Pageable): Page<TherapistDto> {
        return therapistRepository.findAvailableTherapists(pageable)
            .map { therapistMapper.toDto(it) }
    }

    fun updateTherapist(id: Long, dto: TherapistDto): TherapistDto {
        val therapist = therapistRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Therapist not found with id: $id") }
        
        therapist.apply {
            specialization = dto.specialization
            experienceYears = dto.experienceYears
            isAvailable = dto.isAvailable
        }
        
        val updated = therapistRepository.save(therapist)
        return therapistMapper.toDto(updated)
    }

    fun deleteTherapist(id: Long) {
        val therapist = therapistRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Therapist not found with id: $id") }
        therapist.deletedAt = java.time.LocalDateTime.now()
        therapistRepository.save(therapist)
    }
}
