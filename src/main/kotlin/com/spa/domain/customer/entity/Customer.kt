package com.spa.domain.customer.entity

import com.spa.common.entity.BaseEntity
import jakarta.persistence.*
import java.time.LocalDate
import java.math.BigDecimal

@Entity
@Table(name = "customers", indexes = [
    Index(name = "idx_customers_email", columnList = "email"),
    Index(name = "idx_customers_is_active", columnList = "is_active")
])
class Customer : BaseEntity() {
    @Column(name = "email", nullable = false, unique = true, length = 255)
    var email: String = ""

    @Column(name = "first_name", nullable = false, length = 100)
    var firstName: String = ""

    @Column(name = "last_name", nullable = false, length = 100)
    var lastName: String = ""

    @Column(name = "phone", length = 20)
    var phone: String? = null

    @Column(name = "date_of_birth")
    var dateOfBirth: LocalDate? = null

    @Column(name = "loyalty_points", nullable = false)
    var loyaltyPoints: Int = 0

    @Column(name = "total_spent", nullable = false, precision = 10, scale = 2)
    var totalSpent: BigDecimal = BigDecimal.ZERO

    @Column(name = "is_active", nullable = false)
    var isActive: Boolean = true

    fun getFullName(): String = "$firstName $lastName"

    fun addLoyaltyPoints(points: Int) {
        loyaltyPoints += points
    }

    fun spendAmount(amount: BigDecimal) {
        totalSpent += amount
    }
}
