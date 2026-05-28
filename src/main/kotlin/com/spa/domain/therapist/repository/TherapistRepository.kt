package com.spa.domain.therapist.repository

import com.spa.domain.therapist.entity.Therapist
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface TherapistRepository : JpaRepository<Therapist, Long> {
    fun findByIdAndDeletedAtIsNull(id: Long): Optional<Therapist>
    fun findByUserId(userId: Long): Optional<Therapist>

    @Query("SELECT t FROM Therapist t WHERE t.deletedAt IS NULL")
    fun findAllActive(pageable: Pageable): Page<Therapist>

    @Query("SELECT t FROM Therapist t WHERE t.isAvailable = true AND t.deletedAt IS NULL")
    fun findAvailableTherapists(): List<Therapist>
}
