package com.spa.domain.service.mapper

import com.spa.domain.service.dto.SpaServiceDto
import com.spa.domain.service.entity.SpaService
import org.springframework.stereotype.Component

@Component
class SpaServiceMapper {

    fun toDto(service: SpaService): SpaServiceDto {
        return SpaServiceDto(
            id = service.id,
            name = service.name,
            description = service.description,
            price = service.price,
            durationMinutes = service.durationMinutes,
            isActive = service.isActive,
            createdAt = service.createdAt,
            updatedAt = service.updatedAt
        )
    }

    fun toEntity(dto: SpaServiceDto): SpaService {
        return SpaService(
            id = dto.id,
            name = dto.name,
            description = dto.description,
            price = dto.price,
            durationMinutes = dto.durationMinutes,
            isActive = dto.isActive
        )
    }

    fun toDtoList(services: List<SpaService>): List<SpaServiceDto> {
        return services.map { toDto(it) }
    }
}
