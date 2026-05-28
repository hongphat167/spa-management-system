package com.spa.domain.appointment.controller

import com.spa.domain.appointment.dto.AppointmentDto
import com.spa.domain.appointment.service.AppointmentService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/appointments")
class AppointmentController(
    private val appointmentService: AppointmentService
) {

    @PostMapping
    fun createAppointment(@RequestBody dto: AppointmentDto): ResponseEntity<AppointmentDto> {
        val created = appointmentService.createAppointment(dto)
        return ResponseEntity.status(HttpStatus.CREATED).body(created)
    }

    @GetMapping("/{id}")
    fun getAppointment(@PathVariable id: Long): ResponseEntity<AppointmentDto> {
        val appointment = appointmentService.getAppointmentById(id)
        return ResponseEntity.ok(appointment)
    }

    @GetMapping
    fun getAllAppointments(pageable: Pageable): ResponseEntity<Page<AppointmentDto>> {
        val appointments = appointmentService.getAllAppointments(pageable)
        return ResponseEntity.ok(appointments)
    }

    @GetMapping("/customer/{customerId}")
    fun getAppointmentsByCustomer(
        @PathVariable customerId: Long,
        pageable: Pageable
    ): ResponseEntity<Page<AppointmentDto>> {
        val appointments = appointmentService.getAppointmentsByCustomerId(customerId, pageable)
        return ResponseEntity.ok(appointments)
    }

    @GetMapping("/therapist/{therapistId}")
    fun getAppointmentsByTherapist(
        @PathVariable therapistId: Long,
        pageable: Pageable
    ): ResponseEntity<Page<AppointmentDto>> {
        val appointments = appointmentService.getAppointmentsByTherapistId(therapistId, pageable)
        return ResponseEntity.ok(appointments)
    }

    @PutMapping("/{id}")
    fun updateAppointment(
        @PathVariable id: Long,
        @RequestBody dto: AppointmentDto
    ): ResponseEntity<AppointmentDto> {
        val updated = appointmentService.updateAppointment(id, dto)
        return ResponseEntity.ok(updated)
    }

    @PostMapping("/{id}/cancel")
    fun cancelAppointment(@PathVariable id: Long): ResponseEntity<Void> {
        appointmentService.cancelAppointment(id)
        return ResponseEntity.noContent().build()
    }

    @DeleteMapping("/{id}")
    fun deleteAppointment(@PathVariable id: Long): ResponseEntity<Void> {
        appointmentService.deleteAppointment(id)
        return ResponseEntity.noContent().build()
    }
}
