package com.spa.domain.user.entity

import com.spa.common.entity.BaseEntity
import jakarta.persistence.*

@Entity
@Table(name = "users", indexes = [
    Index(name = "idx_users_email", columnList = "email"),
    Index(name = "idx_users_is_active", columnList = "is_active")
])
class User(
        id: Long? = null,
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        phone: String? = null,
        role: String = "CUSTOMER",
        isActive: Boolean = true
    ) : BaseEntity() {

    @Column(name = "email", nullable = false, unique = true, length = 255)
    var email: String = ""

    @Column(name = "password", nullable = false, length = 255)
    var password: String = ""

    @Column(name = "first_name", nullable = false, length = 100)
    var firstName: String = ""

    @Column(name = "last_name", nullable = false, length = 100)
    var lastName: String = ""

    @Column(name = "phone", length = 20)
    var phone: String? = null

    @Column(name = "role", nullable = false, length = 50)
    var role: String = "CUSTOMER"

    @Column(name = "is_active", nullable = false)
    var isActive: Boolean = true

    init {
        this.id = id
        this.email = email
        this.password = password
        this.firstName = firstName
        this.lastName = lastName
        this.phone = phone
        this.role = role
        this.isActive = isActive
    }

    fun getFullName(): String = "$firstName $lastName"
}
