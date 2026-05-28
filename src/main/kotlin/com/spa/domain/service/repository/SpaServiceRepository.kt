package com.spa.domain.service.repository

import com.spa.domain.service.entity.SpaService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface SpaServiceRepository : JpaRepository<SpaService, Long> {
    fun findByIdAndDeletedAtIsNull(id: Long): Optional<SpaService>

    @Query("SELECT s FROM SpaService s WHERE s.deletedAt IS NULL")
    fun findAllActive(pageable: Pageable): Page<SpaService>

    @Query(
        """
    SELECT s
    FROM SpaService s
    WHERE s.isActive = true
    AND s.deletedAt IS NULL
"""
    )
    fun findAllActiveServices(
        pageable: Pageable
    ): Page<SpaService>
}
