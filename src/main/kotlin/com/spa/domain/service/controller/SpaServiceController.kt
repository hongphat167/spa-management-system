package com.spa.domain.service.controller

import com.spa.domain.service.dto.SpaServiceDto
import com.spa.domain.service.service.SpaServiceService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/services")
class SpaServiceController(
    private val spaServiceService: SpaServiceService
) {

    @PostMapping
    fun createService(@RequestBody dto: SpaServiceDto): ResponseEntity<SpaServiceDto> {
        val created = spaServiceService.createService(dto)
        return ResponseEntity.status(HttpStatus.CREATED).body(created)
    }

    @GetMapping("/{id}")
    fun getService(@PathVariable id: Long): ResponseEntity<SpaServiceDto> {
        val service = spaServiceService.getServiceById(id)
        return ResponseEntity.ok(service)
    }

    @GetMapping
    fun getAllServices(pageable: Pageable): ResponseEntity<Page<SpaServiceDto>> {
        val services = spaServiceService.getAllServices(pageable)
        return ResponseEntity.ok(services)
    }

    @GetMapping("/active")
    fun getActiveServices(pageable: Pageable): ResponseEntity<Page<SpaServiceDto>> {
        val services = spaServiceService.getActiveServices(pageable)
        return ResponseEntity.ok(services)
    }

    @PutMapping("/{id}")
    fun updateService(
        @PathVariable id: Long,
        @RequestBody dto: SpaServiceDto
    ): ResponseEntity<SpaServiceDto> {
        val updated = spaServiceService.updateService(id, dto)
        return ResponseEntity.ok(updated)
    }

    @DeleteMapping("/{id}")
    fun deleteService(@PathVariable id: Long): ResponseEntity<Void> {
        spaServiceService.deleteService(id)
        return ResponseEntity.noContent().build()
    }
}
