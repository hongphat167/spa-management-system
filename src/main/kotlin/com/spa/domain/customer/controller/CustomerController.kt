package com.spa.domain.customer.controller

import com.spa.domain.customer.dto.CustomerDto
import com.spa.domain.customer.service.CustomerService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/customers")
class CustomerController(
    private val customerService: CustomerService
) {

    @PostMapping
    fun createCustomer(@RequestBody dto: CustomerDto): ResponseEntity<CustomerDto> {
        val created = customerService.createCustomer(dto)
        return ResponseEntity.status(HttpStatus.CREATED).body(created)
    }

    @GetMapping("/{id}")
    fun getCustomer(@PathVariable id: Long): ResponseEntity<CustomerDto> {
        val customer = customerService.getCustomerById(id)
        return ResponseEntity.ok(customer)
    }

    @GetMapping("/email/{email}")
    fun getCustomerByEmail(@PathVariable email: String): ResponseEntity<CustomerDto> {
        val customer = customerService.getCustomerByEmail(email)
        return ResponseEntity.ok(customer)
    }

    @GetMapping
    fun getAllCustomers(pageable: Pageable): ResponseEntity<Page<CustomerDto>> {
        val customers = customerService.getAllCustomers(pageable)
        return ResponseEntity.ok(customers)
    }

    @PutMapping("/{id}")
    fun updateCustomer(
        @PathVariable id: Long,
        @RequestBody dto: CustomerDto
    ): ResponseEntity<CustomerDto> {
        val updated = customerService.updateCustomer(id, dto)
        return ResponseEntity.ok(updated)
    }

    @DeleteMapping("/{id}")
    fun deleteCustomer(@PathVariable id: Long): ResponseEntity<Void> {
        customerService.deleteCustomer(id)
        return ResponseEntity.noContent().build()
    }
}
