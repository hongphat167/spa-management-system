package com.spa.domain.service.service

import com.spa.common.exception.ResourceNotFoundException
import com.spa.domain.service.dto.SpaServiceDto
import com.spa.domain.service.mapper.SpaServiceMapper
import com.spa.domain.service.repository.SpaServiceRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class SpaServiceService(
    private val spaServiceRepository: SpaServiceRepository,
    private val spaServiceMapper: SpaServiceMapper
) {

    fun createService(dto: SpaServiceDto): SpaServiceDto {
        val service = spaServiceMapper.toEntity(dto)
        val saved = spaServiceRepository.save(service)
        return spaServiceMapper.toDto(saved)
    }

    @Transactional(readOnly = true)
    fun getServiceById(id: Long): SpaServiceDto {
        val service = spaServiceRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Service not found with id: $id") }
        return spaServiceMapper.toDto(service)
    }

    @Transactional(readOnly = true)
    fun getAllServices(pageable: Pageable): Page<SpaServiceDto> {
        return spaServiceRepository.findAllActive(pageable)
            .map { spaServiceMapper.toDto(it) }
    }

    @Transactional(readOnly = true)
    fun getActiveServices(pageable: Pageable): Page<SpaServiceDto> {
        return spaServiceRepository.findAllActiveServices(pageable)
            .map { spaServiceMapper.toDto(it) }
    }

    fun updateService(id: Long, dto: SpaServiceDto): SpaServiceDto {
        val service = spaServiceRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Service not found with id: $id") }
        
        service.apply {
            name = dto.name
            description = dto.description
            price = dto.price
            durationMinutes = dto.durationMinutes
            isActive = dto.isActive
        }
        
        val updated = spaServiceRepository.save(service)
        return spaServiceMapper.toDto(updated)
    }

    fun deleteService(id: Long) {
        val service = spaServiceRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Service not found with id: $id") }
        service.deletedAt = java.time.LocalDateTime.now()
        spaServiceRepository.save(service)
    }
}
