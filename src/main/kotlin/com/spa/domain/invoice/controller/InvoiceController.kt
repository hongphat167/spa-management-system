package com.spa.domain.invoice.controller

import com.spa.domain.invoice.dto.InvoiceDto
import com.spa.domain.invoice.service.InvoiceService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/invoices")
class InvoiceController(
    private val invoiceService: InvoiceService
) {

    @PostMapping
    fun createInvoice(@RequestBody dto: InvoiceDto): ResponseEntity<InvoiceDto> {
        val created = invoiceService.createInvoice(dto)
        return ResponseEntity.status(HttpStatus.CREATED).body(created)
    }

    @GetMapping("/{id}")
    fun getInvoice(@PathVariable id: Long): ResponseEntity<InvoiceDto> {
        val invoice = invoiceService.getInvoiceById(id)
        return ResponseEntity.ok(invoice)
    }

    @GetMapping
    fun getAllInvoices(pageable: Pageable): ResponseEntity<Page<InvoiceDto>> {
        val invoices = invoiceService.getAllInvoices(pageable)
        return ResponseEntity.ok(invoices)
    }

    @GetMapping("/customer/{customerId}")
    fun getInvoicesByCustomer(
        @PathVariable customerId: Long,
        pageable: Pageable
    ): ResponseEntity<Page<InvoiceDto>> {
        val invoices = invoiceService.getInvoicesByCustomerId(customerId, pageable)
        return ResponseEntity.ok(invoices)
    }

    @GetMapping("/pending")
    fun getPendingInvoices(pageable: Pageable): ResponseEntity<Page<InvoiceDto>> {
        val invoices = invoiceService.getPendingInvoices(pageable)
        return ResponseEntity.ok(invoices)
    }

    @PutMapping("/{id}")
    fun updateInvoice(
        @PathVariable id: Long,
        @RequestBody dto: InvoiceDto
    ): ResponseEntity<InvoiceDto> {
        val updated = invoiceService.updateInvoice(id, dto)
        return ResponseEntity.ok(updated)
    }

    @PostMapping("/{id}/pay")
    fun markAsPaid(@PathVariable id: Long): ResponseEntity<InvoiceDto> {
        val paid = invoiceService.markAsPaid(id)
        return ResponseEntity.ok(paid)
    }

    @DeleteMapping("/{id}")
    fun deleteInvoice(@PathVariable id: Long): ResponseEntity<Void> {
        invoiceService.deleteInvoice(id)
        return ResponseEntity.noContent().build()
    }
}
