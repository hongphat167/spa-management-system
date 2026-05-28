package com.spa.domain.customer.controller

import com.spa.common.dto.ApiResponse
import com.spa.common.dto.PaginationRequest
import com.spa.domain.customer.dto.CustomerDto
import com.spa.domain.customer.mapper.CustomerMapper
import com.spa.domain.customer.service.CustomerService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.math.BigDecimal

@RestController
@RequestMapping("/api/v1/customers")
class CustomerController(
    private val customerService: CustomerService,
    private val customerMapper: CustomerMapper
) {

    @PostMapping
    fun createCustomer(@RequestBody dto: CustomerDto): ResponseEntity<ApiResponse<CustomerDto>> {
        val customer = customerMapper.toEntity(dto)
        val created = customerService.createCustomer(customer)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Customer created successfully",
                data = customerMapper.toDto(created)
            ),
            HttpStatus.CREATED
        )
    }

    @PutMapping("/{id}")
    fun updateCustomer(
        @PathVariable id: Long,
        @RequestBody dto: CustomerDto
    ): ResponseEntity<ApiResponse<CustomerDto>> {
        val customer = customerMapper.toEntity(dto)
        val updated = customerService.updateCustomer(id, customer)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Customer updated successfully",
                data = customerMapper.toDto(updated)
            ),
            HttpStatus.OK
        )
    }

    @GetMapping("/{id}")
    fun getCustomer(@PathVariable id: Long): ResponseEntity<ApiResponse<CustomerDto>> {
        val customer = customerService.getCustomerById(id)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Customer retrieved successfully",
                data = customerMapper.toDto(customer)
            ),
            HttpStatus.OK
        )
    }

    @GetMapping
    fun getAllCustomers(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<ApiResponse<Any>> {
        val paginationRequest = PaginationRequest(page, size)
        val result = customerService.getAllCustomers(paginationRequest)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Customers retrieved successfully",
                data = result.content.map { customerMapper.toDto(it) },
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

    @DeleteMapping("/{id}")
    fun deleteCustomer(@PathVariable id: Long): ResponseEntity<ApiResponse<Any>> {
        customerService.deleteCustomer(id)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Customer deleted successfully"
            ),
            HttpStatus.OK
        )
    }

    @PostMapping("/{id}/loyalty-points")
    fun addLoyaltyPoints(
        @PathVariable id: Long,
        @RequestParam points: Int
    ): ResponseEntity<ApiResponse<CustomerDto>> {
        customerService.addLoyaltyPoints(id, points)
        val customer = customerService.getCustomerById(id)
        return ResponseEntity(
            ApiResponse(
                status = "SUCCESS",
                message = "Loyalty points added successfully",
                data = customerMapper.toDto(customer)
            ),
            HttpStatus.OK
        )
    }
}
