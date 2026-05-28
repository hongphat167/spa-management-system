package com.spa.domain.customer.mapper

import com.spa.domain.customer.dto.CustomerDto
import com.spa.domain.customer.entity.Customer
import org.springframework.stereotype.Component

@Component
class CustomerMapper {

    fun toDto(customer: Customer): CustomerDto {
        return CustomerDto(
            id = customer.id,
            email = customer.email,
            firstName = customer.firstName,
            lastName = customer.lastName,
            phone = customer.phone,
            dateOfBirth = customer.dateOfBirth,
            loyaltyPoints = customer.loyaltyPoints,
            totalSpent = customer.totalSpent,
            createdAt = customer.createdAt,
            updatedAt = customer.updatedAt
        )
    }

    fun toEntity(dto: CustomerDto): Customer {
        return Customer(
            id = dto.id,
            email = dto.email,
            firstName = dto.firstName,
            lastName = dto.lastName,
            phone = dto.phone,
            dateOfBirth = dto.dateOfBirth,
            loyaltyPoints = dto.loyaltyPoints,
            totalSpent = dto.totalSpent
        )
    }

    fun toDtoList(customers: List<Customer>): List<CustomerDto> {
        return customers.map { toDto(it) }
    }
}
