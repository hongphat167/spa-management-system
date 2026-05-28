package com.spa.domain.therapist.controller

import com.spa.domain.therapist.dto.TherapistDto
import com.spa.domain.therapist.service.TherapistService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/therapists")
class TherapistController(
    private val therapistService: TherapistService
) {

    @PostMapping
    fun createTherapist(@RequestBody dto: TherapistDto): ResponseEntity<TherapistDto> {
        val created = therapistService.createTherapist(dto)
        return ResponseEntity.status(HttpStatus.CREATED).body(created)
    }

    @GetMapping("/{id}")
    fun getTherapist(@PathVariable id: Long): ResponseEntity<TherapistDto> {
        val therapist = therapistService.getTherapistById(id)
        return ResponseEntity.ok(therapist)
    }

    @GetMapping
    fun getAllTherapists(pageable: Pageable): ResponseEntity<Page<TherapistDto>> {
        val therapists = therapistService.getAllTherapists(pageable)
        return ResponseEntity.ok(therapists)
    }

    @GetMapping("/available")
    fun getAvailableTherapists(pageable: Pageable): ResponseEntity<Page<TherapistDto>> {
        val therapists = therapistService.getAvailableTherapists(pageable)
        return ResponseEntity.ok(therapists)
    }

    @PutMapping("/{id}")
    fun updateTherapist(
        @PathVariable id: Long,
        @RequestBody dto: TherapistDto
    ): ResponseEntity<TherapistDto> {
        val updated = therapistService.updateTherapist(id, dto)
        return ResponseEntity.ok(updated)
    }

    @DeleteMapping("/{id}")
    fun deleteTherapist(@PathVariable id: Long): ResponseEntity<Void> {
        therapistService.deleteTherapist(id)
        return ResponseEntity.noContent().build()
    }
}
