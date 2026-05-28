package com.spa.domain.invoice.service

import com.spa.common.dto.PaginatedResponse
import com.spa.common.dto.PaginationRequest
import com.spa.domain.invoice.entity.Invoice
import com.spa.domain.invoice.repository.InvoiceRepository
import com.spa.exception.ResourceNotFoundException
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime
import java.math.BigDecimal

@Service
@Transactional
class InvoiceService(private val invoiceRepository: InvoiceRepository) {

    fun createInvoice(invoice: Invoice): Invoice {
        invoice.paymentStatus = "PENDING"
        return invoiceRepository.save(invoice)
    }

    fun updateInvoice(id: Long, invoice: Invoice): Invoice {
        val existing = invoiceRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Invoice not found with id: $id") }

        existing.totalAmount = invoice.totalAmount
        existing.taxAmount = invoice.taxAmount
        existing.discountAmount = invoice.discountAmount
        existing.dueAt = invoice.dueAt

        return invoiceRepository.save(existing)
    }

    fun getInvoiceById(id: Long): Invoice {
        return invoiceRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Invoice not found with id: $id") }
    }

    fun getInvoiceByAppointmentId(appointmentId: Long): Invoice {
        return invoiceRepository.findByAppointmentId(appointmentId)
            .orElseThrow { ResourceNotFoundException("Invoice not found for appointment: $appointmentId") }
    }

    fun getCustomerInvoices(customerId: Long, paginationRequest: PaginationRequest): PaginatedResponse<Invoice> {
        val pageable = PageRequest.of(paginationRequest.getPage(), paginationRequest.getSize())
        val page = invoiceRepository.findByCustomerId(customerId, pageable)

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

    fun getAllInvoices(paginationRequest: PaginationRequest): PaginatedResponse<Invoice> {
        val pageable = PageRequest.of(paginationRequest.getPage(), paginationRequest.getSize())
        val page = invoiceRepository.findAllActive(pageable)

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

    fun markAsPaid(id: Long): Invoice {
        val invoice = invoiceRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Invoice not found with id: $id") }
        invoice.paymentStatus = "PAID"
        invoice.paidAt = LocalDateTime.now()
        return invoiceRepository.save(invoice)
    }

    fun deleteInvoice(id: Long) {
        val invoice = invoiceRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Invoice not found with id: $id") }
        invoice.delete()
        invoiceRepository.save(invoice)
    }
}
