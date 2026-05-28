package com.spa.domain.invoice.service

import com.spa.domain.invoice.dto.InvoiceDto
import com.spa.domain.invoice.entity.Invoice
import com.spa.domain.invoice.mapper.InvoiceMapper
import com.spa.domain.invoice.repository.InvoiceRepository
import com.spa.common.exception.ResourceNotFoundException
import com.spa.common.exception.BusinessLogicException
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
@Transactional
class InvoiceService(
    private val invoiceRepository: InvoiceRepository,
    private val invoiceMapper: InvoiceMapper
) {

    fun createInvoice(dto: InvoiceDto): InvoiceDto {
        val invoice = invoiceMapper.toEntity(dto)
        val saved = invoiceRepository.save(invoice)
        return invoiceMapper.toDto(saved)
    }

    @Transactional(readOnly = true)
    fun getInvoiceById(id: Long): InvoiceDto {
        val invoice = invoiceRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Invoice not found with id: $id") }
        return invoiceMapper.toDto(invoice)
    }

    @Transactional(readOnly = true)
    fun getAllInvoices(pageable: Pageable): Page<InvoiceDto> {
        return invoiceRepository.findAllByDeletedAtIsNull(pageable)
            .map { invoiceMapper.toDto(it) }
    }

    @Transactional(readOnly = true)
    fun getInvoicesByCustomerId(customerId: Long, pageable: Pageable): Page<InvoiceDto> {
        return invoiceRepository.findAllByCustomerIdAndDeletedAtIsNull(customerId, pageable)
            .map { invoiceMapper.toDto(it) }
    }

    @Transactional(readOnly = true)
    fun getPendingInvoices(pageable: Pageable): Page<InvoiceDto> {
        return invoiceRepository.findAllByPaymentStatusAndDeletedAtIsNull("PENDING", pageable)
            .map { invoiceMapper.toDto(it) }
    }

    fun updateInvoice(id: Long, dto: InvoiceDto): InvoiceDto {
        val invoice = invoiceRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Invoice not found with id: $id") }
        
        invoice.apply {
            totalAmount = dto.totalAmount
            taxAmount = dto.taxAmount
            discountAmount = dto.discountAmount
            dueAt = dto.dueAt
        }
        
        val updated = invoiceRepository.save(invoice)
        return invoiceMapper.toDto(updated)
    }

    fun markAsPaid(id: Long): InvoiceDto {
        val invoice = invoiceRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Invoice not found with id: $id") }
        
        if (invoice.paymentStatus == "PAID") {
            throw BusinessLogicException("Invoice is already paid")
        }
        
        invoice.apply {
            paymentStatus = "PAID"
            paidAt = LocalDateTime.now()
        }
        
        val updated = invoiceRepository.save(invoice)
        return invoiceMapper.toDto(updated)
    }

    fun deleteInvoice(id: Long) {
        val invoice = invoiceRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Invoice not found with id: $id") }
        invoice.deletedAt = LocalDateTime.now()
        invoiceRepository.save(invoice)
    }
}
