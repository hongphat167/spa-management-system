package com.spa.domain.customer.service

import com.spa.common.dto.PaginatedResponse
import com.spa.common.dto.PaginationRequest
import com.spa.domain.customer.entity.Customer
import com.spa.domain.customer.repository.CustomerRepository
import com.spa.exception.ConflictException
import com.spa.exception.ResourceNotFoundException
import com.spa.exception.ValidationException
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal

@Service
@Transactional
class CustomerService(private val customerRepository: CustomerRepository) {

    fun createCustomer(customer: Customer): Customer {
        if (customerRepository.existsByEmailAndDeletedAtIsNull(customer.email)) {
            throw ConflictException("Customer with email ${customer.email} already exists")
        }
        return customerRepository.save(customer)
    }

    fun updateCustomer(id: Long, customer: Customer): Customer {
        val existing = customerRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Customer not found with id: $id") }

        if (existing.email != customer.email && customerRepository.existsByEmailAndDeletedAtIsNull(customer.email)) {
            throw ConflictException("Customer with email ${customer.email} already exists")
        }

        existing.email = customer.email
        existing.firstName = customer.firstName
        existing.lastName = customer.lastName
        existing.phone = customer.phone
        existing.dateOfBirth = customer.dateOfBirth

        return customerRepository.save(existing)
    }

    fun getCustomerById(id: Long): Customer {
        return customerRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Customer not found with id: $id") }
    }

    fun getCustomerByEmail(email: String): Customer {
        return customerRepository.findByEmailAndDeletedAtIsNull(email)
            .orElseThrow { ResourceNotFoundException("Customer not found with email: $email") }
    }

    fun getAllCustomers(paginationRequest: PaginationRequest): PaginatedResponse<Customer> {
        val pageable = PageRequest.of(paginationRequest.getPage(), paginationRequest.getSize())
        val page = customerRepository.findAllActive(pageable)

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

    fun deleteCustomer(id: Long) {
        val customer = customerRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Customer not found with id: $id") }
        customer.delete()
        customerRepository.save(customer)
    }

    fun addLoyaltyPoints(customerId: Long, points: Int) {
        val customer = customerRepository.findByIdAndDeletedAtIsNull(customerId)
            .orElseThrow { ResourceNotFoundException("Customer not found with id: $customerId") }
        customer.addLoyaltyPoints(points)
        customerRepository.save(customer)
    }

    fun recordSpending(customerId: Long, amount: BigDecimal) {
        val customer = customerRepository.findByIdAndDeletedAtIsNull(customerId)
            .orElseThrow { ResourceNotFoundException("Customer not found with id: $customerId") }
        customer.spendAmount(amount)
        customerRepository.save(customer)
    }
}
