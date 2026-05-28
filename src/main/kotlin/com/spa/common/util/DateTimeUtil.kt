package com.spa.common.util

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

object DateTimeUtil {
    private val dateTimeFormatter = DateTimeFormatter.ISO_DATE_TIME
    
    fun getCurrentDateTime(): LocalDateTime = LocalDateTime.now()
    
    fun formatDateTime(dateTime: LocalDateTime): String = dateTime.format(dateTimeFormatter)
    
    fun parseDateTime(dateTimeString: String): LocalDateTime = LocalDateTime.parse(dateTimeString, dateTimeFormatter)
}
