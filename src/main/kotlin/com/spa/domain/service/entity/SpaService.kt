package com.spa.domain.service.entity

import com.spa.common.entity.BaseEntity
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Index
import jakarta.persistence.Table
import java.math.BigDecimal

@Entity
@Table(name = "spa_services", indexes = [
    Index(name = "idx_spa_services_is_active", columnList = "is_active")
])
class SpaService(
    id: Long?,
    name: String,
    description: String?,
    imageUrl: String?,
    price: BigDecimal,
    durationMinutes: Int,
    isActive: Boolean
) : BaseEntity() {
    @Column(name = "name", nullable = false, length = 255)
    var name: String = ""

    @Column(name = "description", columnDefinition = "TEXT")
    var description: String? = null

    @Column(name = "image_url", columnDefinition = "TEXT")
    var imageUrl: String? = null

    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    var price: BigDecimal = BigDecimal.ZERO

    @Column(name = "duration_minutes", nullable = false)
    var durationMinutes: Int = 0

    @Column(name = "is_active", nullable = false)
    var isActive: Boolean = true

    init {
        this.id = id
        this.name = name
        this.description = description
        this.imageUrl = imageUrl
        this.price = price
        this.durationMinutes = durationMinutes
        this.isActive = isActive
    }
}
