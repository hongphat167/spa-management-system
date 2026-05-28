package com.spa.domain.service.service

import com.spa.common.dto.PaginatedResponse
import com.spa.common.dto.PaginationRequest
import com.spa.domain.service.entity.SpaService
import com.spa.domain.service.repository.SpaServiceRepository
import com.spa.exception.ResourceNotFoundException
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class SpaServiceService(private val spaServiceRepository: SpaServiceRepository) {

    fun createService(service: SpaService): SpaService {
        return spaServiceRepository.save(service)
    }

    fun updateService(id: Long, service: SpaService): SpaService {
        val existing = spaServiceRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Service not found with id: $id") }

        existing.name = service.name
        existing.description = service.description
        existing.price = service.price
        existing.durationMinutes = service.durationMinutes
        existing.isActive = service.isActive

        return spaServiceRepository.save(existing)
    }

    fun getServiceById(id: Long): SpaService {
        return spaServiceRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Service not found with id: $id") }
    }

    fun getAllServices(paginationRequest: PaginationRequest): PaginatedResponse<SpaService> {
        val pageable = PageRequest.of(paginationRequest.getPage(), paginationRequest.getSize())
        val page = spaServiceRepository.findAllActive(pageable)

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

    fun getActiveServices(): List<SpaService> {
        return spaServiceRepository.findAllActiveServices()
    }

    fun deleteService(id: Long) {
        val service = spaServiceRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Service not found with id: $id") }
        service.delete()
        spaServiceRepository.save(service)
    }
}
