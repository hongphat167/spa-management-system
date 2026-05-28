package com.spa.domain.service.controller

import com.spa.common.dto.ApiResponse
import com.spa.common.dto.PaginationRequest
import com.spa.domain.service.dto.SpaServiceDto
import com.spa.domain.service.mapper.SpaServiceMapper
import com.spa.domain.service.service.SpaServiceService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/services")
class SpaServiceController(
    private val spaServiceService: SpaServiceService,
    private val spaServiceMapper: SpaServiceMapper
) {

    @PostMapping
    fun createService(@RequestBody dto: SpaServiceDto): ResponseEntity<ApiResponse<SpaServiceDto>> {
        val service = spaServiceMapper.toEntity(dto)
        val created = spaServiceService.createService(service)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Service created successfully",
                data = spaServiceMapper.toDto(created)
            ),
            HttpStatus.CREATED
        )
    }

    @PutMapping("/{id}")
    fun updateService(
        @PathVariable id: Long,
        @RequestBody dto: SpaServiceDto
    ): ResponseEntity<ApiResponse<SpaServiceDto>> {
        val service = spaServiceMapper.toEntity(dto)
        val updated = spaServiceService.updateService(id, service)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Service updated successfully",
                data = spaServiceMapper.toDto(updated)
            ),
            HttpStatus.OK
        )
    }

    @GetMapping("/{id}")
    fun getService(@PathVariable id: Long): ResponseEntity<ApiResponse<SpaServiceDto>> {
        val service = spaServiceService.getServiceById(id)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Service retrieved successfully",
                data = spaServiceMapper.toDto(service)
            ),
            HttpStatus.OK
        )
    }

    @GetMapping
    fun getAllServices(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<ApiResponse<Any>> {
        val paginationRequest = PaginationRequest(page, size)
        val result = spaServiceService.getAllServices(paginationRequest)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Services retrieved successfully",
                data = result.content.map { spaServiceMapper.toDto(it) },
                meta = mapOf(
                    "page" to result.page,
                    "size" to result.size,
                    "totalElements" to result.totalElements,
                    "totalPages" to result.totalPages,
                    "hasNext" to result.hasNext,
                    "hasPrevious" to result.hasPrevious
                )
            ),
            HttpStatus.OK
        )
    }

    @GetMapping("/active")
    fun getActiveServices(): ResponseEntity<ApiResponse<Any>> {
        val services = spaServiceService.getActiveServices()
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Active services retrieved successfully",
                data = services.map { spaServiceMapper.toDto(it) }
            ),
            HttpStatus.OK
        )
    }

    @DeleteMapping("/{id}")
    fun deleteService(@PathVariable id: Long): ResponseEntity<ApiResponse<Any>> {
        spaServiceService.deleteService(id)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Service deleted successfully"
            ),
            HttpStatus.OK
        )
    }
}
