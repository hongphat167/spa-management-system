package com.spa.domain.customer.service

import com.spa.domain.customer.dto.CustomerDto
import com.spa.domain.customer.entity.Customer
import com.spa.domain.customer.mapper.CustomerMapper
import com.spa.domain.customer.repository.CustomerRepository
import com.spa.common.exception.ResourceNotFoundException
import com.spa.common.exception.ValidationException
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class CustomerService(
    private val customerRepository: CustomerRepository,
    private val customerMapper: CustomerMapper
) {

    fun createCustomer(dto: CustomerDto): CustomerDto {
        validateEmailUniqueness(dto.email)
        val customer = customerMapper.toEntity(dto)
        val saved = customerRepository.save(customer)
        return customerMapper.toDto(saved)
    }

    @Transactional(readOnly = true)
    fun getCustomerById(id: Long): CustomerDto {
        val customer = customerRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Customer not found with id: $id") }
        return customerMapper.toDto(customer)
    }

    @Transactional(readOnly = true)
    fun getCustomerByEmail(email: String): CustomerDto {
        val customer = customerRepository.findByEmailAndDeletedAtIsNull(email)
            .orElseThrow { ResourceNotFoundException("Customer not found with email: $email") }
        return customerMapper.toDto(customer)
    }

    @Transactional(readOnly = true)
    fun getAllCustomers(pageable: Pageable): Page<CustomerDto> {
        return customerRepository.findAllByDeletedAtIsNull(pageable)
            .map { customerMapper.toDto(it) }
    }

    fun updateCustomer(id: Long, dto: CustomerDto): CustomerDto {
        val customer = customerRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Customer not found with id: $id") }
        
        if (dto.email != customer.email) {
            validateEmailUniqueness(dto.email)
        }
        
        customer.apply {
            email = dto.email
            firstName = dto.firstName
            lastName = dto.lastName
            phone = dto.phone
            dateOfBirth = dto.dateOfBirth
        }
        
        val updated = customerRepository.save(customer)
        return customerMapper.toDto(updated)
    }

    fun deleteCustomer(id: Long) {
        val customer = customerRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { ResourceNotFoundException("Customer not found with id: $id") }
        customer.deletedAt = java.time.LocalDateTime.now()
        customerRepository.save(customer)
    }

    private fun validateEmailUniqueness(email: String) {
        if (customerRepository.findByEmailAndDeletedAtIsNull(email).isPresent) {
            throw ValidationException("Email already exists: $email")
        }
    }
}
