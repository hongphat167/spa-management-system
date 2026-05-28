package com.spa.domain.therapist.entity

import com.spa.common.entity.BaseEntity
import com.spa.domain.user.entity.User
import jakarta.persistence.*

@Entity
@Table(name = "therapists", indexes = [
    Index(name = "idx_therapists_user_id", columnList = "user_id"),
    Index(name = "idx_therapists_is_available", columnList = "is_available")
])
class Therapist(id: Long?, specialization: String?, experienceYears: Int, isAvailable: Boolean) : BaseEntity() {
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    var user: User? = null

    @Column(name = "specialization", length = 255)
    var specialization: String? = null

    @Column(name = "experience_years")
    var experienceYears: Int = 0

    @Column(name = "is_available", nullable = false)
    var isAvailable: Boolean = true
}
