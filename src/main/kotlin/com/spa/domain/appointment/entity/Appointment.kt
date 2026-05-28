package com.spa.domain.appointment.entity

import com.spa.common.entity.BaseEntity
import com.spa.domain.customer.entity.Customer
import com.spa.domain.service.entity.SpaService
import com.spa.domain.therapist.entity.Therapist
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "appointments", indexes = [
    Index(name = "idx_appointments_customer_id", columnList = "customer_id"),
    Index(name = "idx_appointments_service_id", columnList = "service_id"),
    Index(name = "idx_appointments_therapist_id", columnList = "therapist_id"),
    Index(name = "idx_appointments_appointment_date", columnList = "appointment_date"),
    Index(name = "idx_appointments_status", columnList = "status")
])
class Appointment(
    id: Long?,
    therapist: Therapist?,
    customer: Customer,
    service: SpaService,
    appointmentDate: LocalDateTime,
    endTime: LocalDateTime,
    status: String,
    notes: String?
) : BaseEntity() {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    var customer: Customer? = null

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", nullable = false)
    var service: SpaService? = null

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "therapist_id")
    var therapist: Therapist? = null

    @Column(name = "appointment_date", nullable = false)
    var appointmentDate: LocalDateTime = LocalDateTime.now()

    @Column(name = "end_time", nullable = false)
    var endTime: LocalDateTime = LocalDateTime.now()

    @Column(name = "status", nullable = false, length = 50)
    var status: String = "SCHEDULED"

    @Column(name = "notes", columnDefinition = "TEXT")
    var notes: String? = null

    fun isCompleted(): Boolean = status == "COMPLETED"
    fun isCancelled(): Boolean = status == "CANCELLED"
    fun isPending(): Boolean = status == "SCHEDULED"
}
