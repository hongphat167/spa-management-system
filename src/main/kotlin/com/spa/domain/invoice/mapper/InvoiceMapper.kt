package com.spa.domain.invoice.mapper

import com.spa.domain.invoice.dto.InvoiceDto
import com.spa.domain.invoice.entity.Invoice
import com.spa.domain.appointment.repository.AppointmentRepository
import com.spa.domain.customer.repository.CustomerRepository
import org.springframework.stereotype.Component

@Component
class InvoiceMapper(
    private val appointmentRepository: AppointmentRepository,
    private val customerRepository: CustomerRepository
) {

    fun toDto(invoice: Invoice): InvoiceDto {
        return InvoiceDto(
            id = invoice.id,
            appointmentId = invoice.appointment.id!!,
            customerId = invoice.customer.id!!,
            totalAmount = invoice.totalAmount,
            taxAmount = invoice.taxAmount,
            discountAmount = invoice.discountAmount,
            paymentStatus = invoice.paymentStatus,
            dueAt = invoice.dueAt,
            paidAt = invoice.paidAt,
            createdAt = invoice.createdAt,
            updatedAt = invoice.updatedAt
        )
    }

    fun toEntity(dto: InvoiceDto): Invoice {
        val appointment = appointmentRepository.findByIdAndDeletedAtIsNull(dto.appointmentId)
            .orElseThrow { IllegalArgumentException("Appointment not found") }
        val customer = customerRepository.findByIdAndDeletedAtIsNull(dto.customerId)
            .orElseThrow { IllegalArgumentException("Customer not found") }

        return Invoice(
            id = dto.id,
            appointment = appointment,
            customer = customer,
            totalAmount = dto.totalAmount,
            taxAmount = dto.taxAmount,
            discountAmount = dto.discountAmount,
            paymentStatus = dto.paymentStatus,
            dueAt = dto.dueAt,
            paidAt = dto.paidAt
        )
    }

    fun toDtoList(invoices: List<Invoice>): List<InvoiceDto> {
        return invoices.map { toDto(it) }
    }
}
