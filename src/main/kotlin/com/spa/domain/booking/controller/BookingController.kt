package com.spa.domain.booking.controller

import com.spa.domain.appointment.dto.AppointmentDto
import com.spa.domain.appointment.dto.PublicBookingRequestDto
import com.spa.domain.appointment.service.AppointmentService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/v1/bookings")
class BookingController(
    private val appointmentService: AppointmentService
) {

    @PostMapping
    fun createBooking(@RequestBody request: PublicBookingRequestDto): ResponseEntity<AppointmentDto> {
        val created = appointmentService.createPublicBooking(request)
        return ResponseEntity.status(HttpStatus.CREATED).body(created)
    }
}