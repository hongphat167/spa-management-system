package com.spa.domain.invoice.entity

import com.spa.common.entity.BaseEntity
import com.spa.domain.appointment.entity.Appointment
import com.spa.domain.customer.entity.Customer
import jakarta.persistence.*
import java.time.LocalDateTime
import java.math.BigDecimal

@Entity
@Table(name = "invoices", indexes = [
    Index(name = "idx_invoices_customer_id", columnList = "customer_id"),
    Index(name = "idx_invoices_payment_status", columnList = "payment_status"),
    Index(name = "idx_invoices_issued_at", columnList = "issued_at")
])
class Invoice : BaseEntity() {
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id", nullable = false, unique = true)
    var appointment: Appointment? = null

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    var customer: Customer? = null

    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    var totalAmount: BigDecimal = BigDecimal.ZERO

    @Column(name = "tax_amount", nullable = false, precision = 10, scale = 2)
    var taxAmount: BigDecimal = BigDecimal.ZERO

    @Column(name = "discount_amount", nullable = false, precision = 10, scale = 2)
    var discountAmount: BigDecimal = BigDecimal.ZERO

    @Column(name = "payment_status", nullable = false, length = 50)
    var paymentStatus: String = "PENDING"

    @Column(name = "issued_at", nullable = false)
    var issuedAt: LocalDateTime = LocalDateTime.now()

    @Column(name = "due_at")
    var dueAt: LocalDateTime? = null

    @Column(name = "paid_at")
    var paidAt: LocalDateTime? = null

    fun isPaid(): Boolean = paymentStatus == "PAID"
    fun isOverdue(): Boolean = paymentStatus == "PENDING" && dueAt != null && LocalDateTime.now() > dueAt!!
}
