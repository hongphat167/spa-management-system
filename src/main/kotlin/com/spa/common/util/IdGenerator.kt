package com.spa.common.util

import java.util.UUID

object IdGenerator {
    fun generateId(): String = UUID.randomUUID().toString()
    
    fun generateShortId(): String = UUID.randomUUID().toString().substring(0, 8)
}
