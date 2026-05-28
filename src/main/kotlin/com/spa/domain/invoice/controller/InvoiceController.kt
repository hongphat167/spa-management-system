package com.spa.domain.invoice.controller

import com.spa.common.dto.ApiResponse
import com.spa.common.dto.PaginationRequest
import com.spa.domain.invoice.dto.InvoiceDto
import com.spa.domain.invoice.mapper.InvoiceMapper
import com.spa.domain.invoice.service.InvoiceService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/invoices")
class InvoiceController(
    private val invoiceService: InvoiceService,
    private val invoiceMapper: InvoiceMapper
) {

    @PostMapping
    fun createInvoice(@RequestBody dto: InvoiceDto): ResponseEntity<ApiResponse<InvoiceDto>> {
        val invoice = invoiceMapper.toEntity(dto)
        val created = invoiceService.createInvoice(invoice)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Invoice created successfully",
                data = invoiceMapper.toDto(created)
            ),
            HttpStatus.CREATED
        )
    }

    @PutMapping("/{id}")
    fun updateInvoice(
        @PathVariable id: Long,
        @RequestBody dto: InvoiceDto
    ): ResponseEntity<ApiResponse<InvoiceDto>> {
        val invoice = invoiceMapper.toEntity(dto)
        val updated = invoiceService.updateInvoice(id, invoice)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Invoice updated successfully",
                data = invoiceMapper.toDto(updated)
            ),
            HttpStatus.OK
        )
    }

    @GetMapping("/{id}")
    fun getInvoice(@PathVariable id: Long): ResponseEntity<ApiResponse<InvoiceDto>> {
        val invoice = invoiceService.getInvoiceById(id)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Invoice retrieved successfully",
                data = invoiceMapper.toDto(invoice)
            ),
            HttpStatus.OK
        )
    }

    @GetMapping("/appointment/{appointmentId}")
    fun getInvoiceByAppointment(@PathVariable appointmentId: Long): ResponseEntity<ApiResponse<InvoiceDto>> {
        val invoice = invoiceService.getInvoiceByAppointmentId(appointmentId)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Invoice retrieved successfully",
                data = invoiceMapper.toDto(invoice)
            ),
            HttpStatus.OK
        )
    }

    @GetMapping
    fun getAllInvoices(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<ApiResponse<Any>> {
        val paginationRequest = PaginationRequest(page, size)
        val result = invoiceService.getAllInvoices(paginationRequest)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Invoices retrieved successfully",
                data = result.content.map { invoiceMapper.toDto(it) },
                meta = mapOf(
                    "page" to result.page,
                    "size" to result.size,
                    "totalElements" to result.totalElements,
                    "totalPages" to result.totalPages,
                    "hasNext" to result.hasNext,
                    "hasPrevious" to result.hasPrevious
                )
            ),
            HttpStatus.OK
        )
    }

    @GetMapping("/customer/{customerId}")
    fun getCustomerInvoices(
        @PathVariable customerId: Long,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<ApiResponse<Any>> {
        val paginationRequest = PaginationRequest(page, size)
        val result = invoiceService.getCustomerInvoices(customerId, paginationRequest)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Customer invoices retrieved successfully",
                data = result.content.map { invoiceMapper.toDto(it) },
                meta = mapOf(
                    "page" to result.page,
                    "size" to result.size,
                    "totalElements" to result.totalElements,
                    "totalPages" to result.totalPages,
                    "hasNext" to result.hasNext,
                    "hasPrevious" to result.hasPrevious
                )
            ),
            HttpStatus.OK
        )
    }

    @PatchMapping("/{id}/pay")
    fun markAsPaid(@PathVariable id: Long): ResponseEntity<ApiResponse<InvoiceDto>> {
        val invoice = invoiceService.markAsPaid(id)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Invoice marked as paid successfully",
                data = invoiceMapper.toDto(invoice)
            ),
            HttpStatus.OK
        )
    }

    @DeleteMapping("/{id}")
    fun deleteInvoice(@PathVariable id: Long): ResponseEntity<ApiResponse<Any>> {
        invoiceService.deleteInvoice(id)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Invoice deleted successfully"
            ),
            HttpStatus.OK
        )
    }
}
