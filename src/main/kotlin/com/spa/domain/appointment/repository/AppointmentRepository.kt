package com.spa.domain.appointment.repository

import com.spa.domain.appointment.entity.Appointment
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.LocalDateTime
import java.util.Optional

@Repository
interface AppointmentRepository : JpaRepository<Appointment, Long> {
    fun findByIdAndDeletedAtIsNull(id: Long): Optional<Appointment>

    @Query("SELECT a FROM Appointment a WHERE a.customer.id = :customerId AND a.deletedAt IS NULL")
    fun findByCustomerId(customerId: Long, pageable: Pageable): Page<Appointment>

    @Query("SELECT a FROM Appointment a WHERE a.therapist.id = :therapistId AND a.deletedAt IS NULL")
    fun findByTherapistId(therapistId: Long, pageable: Pageable): Page<Appointment>

    @Query("SELECT a FROM Appointment a WHERE a.appointmentDate BETWEEN :startDate AND :endDate AND a.therapist.id = :therapistId AND a.status != 'CANCELLED' AND a.deletedAt IS NULL")
    fun findTherapistAppointmentsInDateRange(
        therapistId: Long,
        startDate: LocalDateTime,
        endDate: LocalDateTime
    ): List<Appointment>

    @Query("SELECT a FROM Appointment a WHERE a.deletedAt IS NULL")
    fun findAllActive(pageable: Pageable): Page<Appointment>

    @Query("SELECT a FROM Appointment a WHERE a.status = :status AND a.deletedAt IS NULL")
    fun findByStatus(status: String, pageable: Pageable): Page<Appointment>
}
