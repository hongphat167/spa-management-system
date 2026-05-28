package com.spa.domain.appointment.service

import com.spa.common.exception.BusinessLogicException
import com.spa.common.exception.ResourceNotFoundException
import com.spa.domain.appointment.dto.AppointmentDto
import com.spa.domain.appointment.mapper.AppointmentMapper
import com.spa.domain.appointment.repository.AppointmentRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
@Transactional
class AppointmentService(
    private val appointmentRepository: AppointmentRepository,
    private val appointmentMapper: AppointmentMapper
) {

    fun createAppointment(dto: AppointmentDto): AppointmentDto {
        validateAppointmentTime(dto.appointmentDate, dto.endTime)
        val appointment = appointmentMapper.toEntity(dto)
        val saved = appointmentRepository.save(appointment)
        return appointmentMapper.toDto(saved)
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
