package com.spa.domain.therapist.controller

import com.spa.common.dto.ApiResponse
import com.spa.common.dto.PaginationRequest
import com.spa.domain.therapist.dto.TherapistDto
import com.spa.domain.therapist.mapper.TherapistMapper
import com.spa.domain.therapist.service.TherapistService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/therapists")
class TherapistController(
    private val therapistService: TherapistService,
    private val therapistMapper: TherapistMapper
) {

    @PostMapping
    fun createTherapist(@RequestBody dto: TherapistDto): ResponseEntity<ApiResponse<TherapistDto>> {
        val therapist = therapistMapper.toEntity(dto)
        val created = therapistService.createTherapist(therapist)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Therapist created successfully",
                data = therapistMapper.toDto(created)
            ),
            HttpStatus.CREATED
        )
    }

    @PutMapping("/{id}")
    fun updateTherapist(
        @PathVariable id: Long,
        @RequestBody dto: TherapistDto
    ): ResponseEntity<ApiResponse<TherapistDto>> {
        val therapist = therapistMapper.toEntity(dto)
        val updated = therapistService.updateTherapist(id, therapist)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Therapist updated successfully",
                data = therapistMapper.toDto(updated)
            ),
            HttpStatus.OK
        )
    }

    @GetMapping("/{id}")
    fun getTherapist(@PathVariable id: Long): ResponseEntity<ApiResponse<TherapistDto>> {
        val therapist = therapistService.getTherapistById(id)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Therapist retrieved successfully",
                data = therapistMapper.toDto(therapist)
            ),
            HttpStatus.OK
        )
    }

    @GetMapping
    fun getAllTherapists(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<ApiResponse<Any>> {
        val paginationRequest = PaginationRequest(page, size)
        val result = therapistService.getAllTherapists(paginationRequest)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Therapists retrieved successfully",
                data = result.content.map { therapistMapper.toDto(it) },
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

    @GetMapping("/available")
    fun getAvailableTherapists(): ResponseEntity<ApiResponse<Any>> {
        val therapists = therapistService.getAvailableTherapists()
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Available therapists retrieved successfully",
                data = therapists.map { therapistMapper.toDto(it) }
            ),
            HttpStatus.OK
        )
    }

    @PatchMapping("/{id}/availability")
    fun setAvailability(
        @PathVariable id: Long,
        @RequestParam available: Boolean
    ): ResponseEntity<ApiResponse<TherapistDto>> {
        therapistService.setTherapistAvailability(id, available)
        val therapist = therapistService.getTherapistById(id)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Therapist availability updated successfully",
                data = therapistMapper.toDto(therapist)
            ),
            HttpStatus.OK
        )
    }

    @DeleteMapping("/{id}")
    fun deleteTherapist(@PathVariable id: Long): ResponseEntity<ApiResponse<Any>> {
        therapistService.deleteTherapist(id)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Therapist deleted successfully"
            ),
            HttpStatus.OK
        )
    }
}
