package com.miraisense.server.dto;

import com.miraisense.server.entity.Priority;
import com.miraisense.server.entity.Status;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record TaskResponse(
        Long id,
        String title,
        String description,
        Status status,
        Priority priority,
        LocalDate dueDate,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
