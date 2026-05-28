package com.spa.common.entity

import jakarta.persistence.*
import java.time.LocalDateTime

/**
 * Base entity class with common fields
 */
@MappedSuperclass
abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Column(name = "created_at", nullable = false, updatable = false)
    var createdAt: LocalDateTime = LocalDateTime.now()

    @Column(name = "updated_at", nullable = false)
    var updatedAt: LocalDateTime = LocalDateTime.now()

    @Column(name = "deleted_at")
    var deletedAt: LocalDateTime? = null

    fun isDeleted(): Boolean = deletedAt != null

    fun delete() {
        deletedAt = LocalDateTime.now()
    }

    fun restore() {
        deletedAt = null
    }

    @PreUpdate
    fun preUpdate() {
        updatedAt = LocalDateTime.now()
    }
}
