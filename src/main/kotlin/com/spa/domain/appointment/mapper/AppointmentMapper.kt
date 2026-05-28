package com.spa.domain.appointment.mapper

import com.spa.domain.appointment.dto.AppointmentDto
import com.spa.domain.appointment.entity.Appointment
import com.spa.domain.customer.repository.CustomerRepository
import com.spa.domain.service.repository.SpaServiceRepository
import com.spa.domain.therapist.repository.TherapistRepository
import org.springframework.stereotype.Component

@Component
class AppointmentMapper(
    private val customerRepository: CustomerRepository,
    private val therapistRepository: TherapistRepository,
    private val spaServiceRepository: SpaServiceRepository
) {

    fun toDto(appointment: Appointment): AppointmentDto {
        return AppointmentDto(
            id = appointment.id,
            customerId = appointment.customer.id!!,
            therapistId = appointment.therapist?.id,
            serviceId = appointment.service.id!!,
            appointmentDate = appointment.appointmentDate,
            endTime = appointment.endTime,
            status = appointment.status,
            notes = appointment.notes,
            createdAt = appointment.createdAt,
            updatedAt = appointment.updatedAt
        )
    }

    fun toEntity(dto: AppointmentDto): Appointment {
        val customer = customerRepository.findByIdAndDeletedAtIsNull(dto.customerId)
            .orElseThrow { IllegalArgumentException("Customer not found") }
        val service = spaServiceRepository.findByIdAndDeletedAtIsNull(dto.serviceId)
            .orElseThrow { IllegalArgumentException("Service not found") }
        val therapist = if (dto.therapistId != null) {
            therapistRepository.findByIdAndDeletedAtIsNull(dto.therapistId)
                .orElseThrow { IllegalArgumentException("Therapist not found") }
        } else {
            null
        }

        return Appointment(
            id = dto.id,
            customer = customer,
            therapist = therapist,
            service = service,
            appointmentDate = dto.appointmentDate,
            endTime = dto.endTime,
            status = dto.status,
            notes = dto.notes
        )
    }

    fun toDtoList(appointments: List<Appointment>): List<AppointmentDto> {
        return appointments.map { toDto(it) }
    }
}
