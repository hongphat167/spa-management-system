package com.spa.domain.user.repository

import com.spa.domain.user.entity.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findByEmail(email: String): Optional<User>
    fun findByEmailAndDeletedAtIsNull(email: String): Optional<User>
    fun findByIdAndDeletedAtIsNull(id: Long): Optional<User>

    @Query("SELECT u FROM User u WHERE u.deletedAt IS NULL")
    fun findAllActive(pageable: Pageable): Page<User>

    @Query("SELECT u FROM User u WHERE u.role = :role AND u.deletedAt IS NULL")
    fun findByRole(role: String, pageable: Pageable): Page<User>

    fun existsByEmailAndDeletedAtIsNull(email: String): Boolean
}
