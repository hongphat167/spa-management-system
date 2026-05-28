package com.spa.domain.customer.repository

import com.spa.domain.customer.entity.Customer
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface CustomerRepository : JpaRepository<Customer, Long> {
    fun findByEmail(email: String): Optional<Customer>
    fun findByEmailAndDeletedAtIsNull(email: String): Optional<Customer>
    fun findByIdAndDeletedAtIsNull(id: Long): Optional<Customer>

    @Query(
        """
        SELECT c FROM Customer c
    """
    )
    fun findAllActive(pageable: Pageable): Page<Customer>

    fun existsByEmailAndDeletedAtIsNull(email: String): Boolean
}
