package com.spa.domain.appointment.service

import com.spa.common.exception.BusinessLogicException
import com.spa.common.exception.ResourceNotFoundException
import com.spa.common.exception.ValidationException
import com.spa.domain.appointment.dto.AppointmentDto
import com.spa.domain.appointment.dto.PublicBookingRequestDto
import com.spa.domain.appointment.entity.Appointment
import com.spa.domain.appointment.mapper.AppointmentMapper
import com.spa.domain.appointment.repository.AppointmentRepository
import com.spa.domain.customer.entity.Customer
import com.spa.domain.customer.repository.CustomerRepository
import com.spa.domain.service.repository.SpaServiceRepository
import com.spa.domain.therapist.repository.TherapistRepository
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal
import java.time.LocalDateTime

@Service
@Transactional
class AppointmentService(
    private val appointmentRepository: AppointmentRepository,
    private val appointmentMapper: AppointmentMapper,
    private val customerRepository: CustomerRepository,
    private val spaServiceRepository: SpaServiceRepository,
    private val therapistRepository: TherapistRepository
) {

    fun createAppointment(dto: AppointmentDto): AppointmentDto {
        validateAppointmentTime(dto.appointmentDate, dto.endTime)
        val appointment = appointmentMapper.toEntity(dto)
        val saved = appointmentRepository.save(appointment)
        return appointmentMapper.toDto(saved)
    }

    fun createPublicBooking(request: PublicBookingRequestDto): AppointmentDto {
        val service = spaServiceRepository.findByIdAndDeletedAtIsNull(request.serviceId)
            .orElseThrow { ResourceNotFoundException("Service not found with id: ${request.serviceId}") }

        val customerEmail = request.customerEmail.trim()
        val customer = customerRepository.findByEmail(customerEmail)
            .map { existing ->
                existing.apply {
                    if (deletedAt != null) {
                        restore()
                    }
                    firstName = request.customerFirstName.trim()
                    lastName = request.customerLastName.trim()
                    phone = request.customerPhone?.trim()?.takeIf { it.isNotEmpty() }
                }
            }
            .orElseGet {
                Customer(
                    id = null,
                    email = customerEmail,
                    firstName = request.customerFirstName.trim(),
                    lastName = request.customerLastName.trim(),
                    phone = request.customerPhone?.trim()?.takeIf { it.isNotEmpty() },
                    dateOfBirth = null,
                    loyaltyPoints = 0,
                    totalSpent = BigDecimal.ZERO
                )
            }

        val savedCustomer = try {
            customerRepository.save(customer)
        } catch (ex: DataIntegrityViolationException) {
            throw ValidationException("Customer email already exists: $customerEmail")
        }

        val therapist = request.therapistId?.let { therapistId ->
            therapistRepository.findByIdAndDeletedAtIsNull(therapistId)
                .orElseThrow { ResourceNotFoundException("Therapist not found with id: $therapistId") }
        }

        val endTime = request.appointmentDate.plusMinutes(service.durationMinutes.toLong())
        validateAppointmentTime(request.appointmentDate, endTime)

        if (therapist != null) {
            val conflicts = appointmentRepository.findTherapistAppointmentsInDateRange(
                therapist.id!!,
                request.appointmentDate,
                endTime
            )

            if (conflicts.isNotEmpty()) {
                throw BusinessLogicException("Therapist is not available for the selected time")
            }
        }

        val appointment = Appointment(
            id = null,
            therapist = therapist,
            customer = savedCustomer,
            service = service,
            appointmentDate = request.appointmentDate,
            endTime = endTime,
            status = "SCHEDULED",
            notes = request.notes
        )

        return try {
            appointmentMapper.toDto(appointmentRepository.save(appointment))
        } catch (ex: DataIntegrityViolationException) {
            throw ValidationException(ex.rootCause?.message ?: ex.message ?: "Unable to save booking")
        }
    }

    @Transactional(readOnly = true)
    fun getAppointmentById(id: Long): AppointmentDto {
        val appointment = appointmentRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Appointment not found with id: $id") }
        return appointmentMapper.toDto(appointment)
    }

    @Transactional(readOnly = true)
    fun getAllAppointments(pageable: Pageable): Page<AppointmentDto> {
        return appointmentRepository.findAllActive(pageable)
            .map { appointmentMapper.toDto(it) }
    }

    @Transactional(readOnly = true)
    fun getAppointmentsByCustomerId(customerId: Long, pageable: Pageable): Page<AppointmentDto> {
        return appointmentRepository.findByCustomerId(customerId, pageable)
            .map { appointmentMapper.toDto(it) }
    }

    @Transactional(readOnly = true)
    fun getAppointmentsByTherapistId(therapistId: Long, pageable: Pageable): Page<AppointmentDto> {
        return appointmentRepository.findByTherapistId(therapistId, pageable)
            .map { appointmentMapper.toDto(it) }
    }

    fun updateAppointment(id: Long, dto: AppointmentDto): AppointmentDto {
        val appointment = appointmentRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Appointment not found with id: $id") }
        
        validateAppointmentTime(dto.appointmentDate, dto.endTime)
        
        appointment.apply {
            appointmentDate = dto.appointmentDate
            endTime = dto.endTime
            status = dto.status
            notes = dto.notes
        }
        
        val updated = appointmentRepository.save(appointment)
        return appointmentMapper.toDto(updated)
    }

    fun cancelAppointment(id: Long) {
        val appointment = appointmentRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Appointment not found with id: $id") }
        
        if (appointment.appointmentDate.isBefore(LocalDateTime.now())) {
            throw BusinessLogicException("Cannot cancel past appointments")
        }
        
        appointment.status = "CANCELLED"
        appointmentRepository.save(appointment)
    }

    fun deleteAppointment(id: Long) {
        val appointment = appointmentRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Appointment not found with id: $id") }
        appointment.deletedAt = LocalDateTime.now()
        appointmentRepository.save(appointment)
    }

    private fun validateAppointmentTime(startTime: LocalDateTime, endTime: LocalDateTime) {
        if (startTime.isAfter(endTime)) {
            throw BusinessLogicException("Appointment start time must be before end time")
        }
        if (startTime.isBefore(LocalDateTime.now())) {
            throw BusinessLogicException("Cannot schedule appointment in the past")
        }
    }
}
