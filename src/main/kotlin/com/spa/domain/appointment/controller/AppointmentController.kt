package com.spa.domain.appointment.controller

import com.spa.common.dto.ApiResponse
import com.spa.common.dto.PaginationRequest
import com.spa.domain.appointment.dto.AppointmentDto
import com.spa.domain.appointment.mapper.AppointmentMapper
import com.spa.domain.appointment.service.AppointmentService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/appointments")
class AppointmentController(
    private val appointmentService: AppointmentService,
    private val appointmentMapper: AppointmentMapper
) {

    @PostMapping
    fun createAppointment(@RequestBody dto: AppointmentDto): ResponseEntity<ApiResponse<AppointmentDto>> {
        val appointment = appointmentMapper.toEntity(dto)
        val created = appointmentService.createAppointment(appointment)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Appointment created successfully",
                data = appointmentMapper.toDto(created)
            ),
            HttpStatus.CREATED
        )
    }

    @PutMapping("/{id}")
    fun updateAppointment(
        @PathVariable id: Long,
        @RequestBody dto: AppointmentDto
    ): ResponseEntity<ApiResponse<AppointmentDto>> {
        val appointment = appointmentMapper.toEntity(dto)
        val updated = appointmentService.updateAppointment(id, appointment)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Appointment updated successfully",
                data = appointmentMapper.toDto(updated)
            ),
            HttpStatus.OK
        )
    }

    @GetMapping("/{id}")
    fun getAppointment(@PathVariable id: Long): ResponseEntity<ApiResponse<AppointmentDto>> {
        val appointment = appointmentService.getAppointmentById(id)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Appointment retrieved successfully",
                data = appointmentMapper.toDto(appointment)
            ),
            HttpStatus.OK
        )
    }

    @GetMapping
    fun getAllAppointments(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<ApiResponse<Any>> {
        val paginationRequest = PaginationRequest(page, size)
        val result = appointmentService.getAllAppointments(paginationRequest)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Appointments retrieved successfully",
                data = result.content.map { appointmentMapper.toDto(it) },
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

    @GetMapping("/customer/{customerId}")
    fun getCustomerAppointments(
        @PathVariable customerId: Long,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<ApiResponse<Any>> {
        val paginationRequest = PaginationRequest(page, size)
        val result = appointmentService.getCustomerAppointments(customerId, paginationRequest)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Customer appointments retrieved successfully",
                data = result.content.map { appointmentMapper.toDto(it) },
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

    @GetMapping("/therapist/{therapistId}")
    fun getTherapistAppointments(
        @PathVariable therapistId: Long,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<ApiResponse<Any>> {
        val paginationRequest = PaginationRequest(page, size)
        val result = appointmentService.getTherapistAppointments(therapistId, paginationRequest)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Therapist appointments retrieved successfully",
                data = result.content.map { appointmentMapper.toDto(it) },
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

    @PatchMapping("/{id}/cancel")
    fun cancelAppointment(@PathVariable id: Long): ResponseEntity<ApiResponse<AppointmentDto>> {
        val appointment = appointmentService.cancelAppointment(id)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Appointment cancelled successfully",
                data = appointmentMapper.toDto(appointment)
            ),
            HttpStatus.OK
        )
    }

    @PatchMapping("/{id}/complete")
    fun completeAppointment(@PathVariable id: Long): ResponseEntity<ApiResponse<AppointmentDto>> {
        val appointment = appointmentService.completeAppointment(id)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Appointment completed successfully",
                data = appointmentMapper.toDto(appointment)
            ),
            HttpStatus.OK
        )
    }
}
