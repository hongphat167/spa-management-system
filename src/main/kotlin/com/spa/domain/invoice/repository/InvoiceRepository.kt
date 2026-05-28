package com.spa.domain.invoice.repository

import com.spa.domain.invoice.entity.Invoice
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface InvoiceRepository : JpaRepository<Invoice, Long> {
    fun findByIdAndDeletedAtIsNull(id: Long): Optional<Invoice>
    fun findByAppointmentId(appointmentId: Long): Optional<Invoice>

    @Query("SELECT i FROM Invoice i WHERE i.customer.id = :customerId AND i.deletedAt IS NULL")
    fun findByCustomerId(customerId: Long, pageable: Pageable): Page<Invoice>

    @Query("SELECT i FROM Invoice i WHERE i.paymentStatus = :paymentStatus AND i.deletedAt IS NULL")
    fun findByPaymentStatus(paymentStatus: String, pageable: Pageable): Page<Invoice>

    @Query("SELECT i FROM Invoice i WHERE i.deletedAt IS NULL")
    fun findAllActive(pageable: Pageable): Page<Invoice>
}
