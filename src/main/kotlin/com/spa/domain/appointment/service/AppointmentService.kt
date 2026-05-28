package com.spa.domain.appointment.service

import com.spa.common.dto.PaginatedResponse
import com.spa.common.dto.PaginationRequest
import com.spa.domain.appointment.entity.Appointment
import com.spa.domain.appointment.repository.AppointmentRepository
import com.spa.domain.therapist.repository.TherapistRepository
import com.spa.exception.AppointmentConflictException
import com.spa.exception.ResourceNotFoundException
import com.spa.exception.TherapistUnavailableException
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
@Transactional
class AppointmentService(
    private val appointmentRepository: AppointmentRepository,
    private val therapistRepository: TherapistRepository
) {

    fun createAppointment(appointment: Appointment): Appointment {
        // Validate therapist is available
        if (appointment.therapist != null) {
            val therapist = therapistRepository.findByIdAndDeletedAtIsNull(appointment.therapist!!.id!!)
                .orElseThrow { ResourceNotFoundException("Therapist not found") }

            if (!therapist.isAvailable) {
                throw TherapistUnavailableException("Selected therapist is not available")
            }

            // Check for time conflicts
            val conflicts = appointmentRepository.findTherapistAppointmentsInDateRange(
                therapist.id!!,
                appointment.appointmentDate,
                appointment.endTime
            )
            if (conflicts.isNotEmpty()) {
                throw AppointmentConflictException("Therapist has conflicting appointments at the requested time")
            }
        }

        appointment.status = "SCHEDULED"
        return appointmentRepository.save(appointment)
    }

    fun updateAppointment(id: Long, appointment: Appointment): Appointment {
        val existing = appointmentRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Appointment not found with id: $id") }

        existing.service = appointment.service
        existing.therapist = appointment.therapist
        existing.notes = appointment.notes

        return appointmentRepository.save(existing)
    }

    fun getAppointmentById(id: Long): Appointment {
        return appointmentRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Appointment not found with id: $id") }
    }

    fun getCustomerAppointments(customerId: Long, paginationRequest: PaginationRequest): PaginatedResponse<Appointment> {
        val pageable = PageRequest.of(paginationRequest.getPage(), paginationRequest.getSize())
        val page = appointmentRepository.findByCustomerId(customerId, pageable)

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

    fun getTherapistAppointments(therapistId: Long, paginationRequest: PaginationRequest): PaginatedResponse<Appointment> {
        val pageable = PageRequest.of(paginationRequest.getPage(), paginationRequest.getSize())
        val page = appointmentRepository.findByTherapistId(therapistId, pageable)

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

    fun getAllAppointments(paginationRequest: PaginationRequest): PaginatedResponse<Appointment> {
        val pageable = PageRequest.of(paginationRequest.getPage(), paginationRequest.getSize())
        val page = appointmentRepository.findAllActive(pageable)

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

    fun cancelAppointment(id: Long): Appointment {
        val appointment = appointmentRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Appointment not found with id: $id") }
        appointment.status = "CANCELLED"
        return appointmentRepository.save(appointment)
    }

    fun completeAppointment(id: Long): Appointment {
        val appointment = appointmentRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Appointment not found with id: $id") }
        appointment.status = "COMPLETED"
        return appointmentRepository.save(appointment)
    }
}
