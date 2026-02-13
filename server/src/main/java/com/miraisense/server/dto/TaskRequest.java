package com.miraisense.server.dto;

import com.miraisense.server.entity.Priority;
import com.miraisense.server.entity.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record TaskRequest(
        @NotBlank(message = "Title is required")
        @Size(min = 1, max = 100, message = "Title cannot exceed 100 characters")
        String title,
        @Size(max = 1000, message = "Description cannot exceed 1000 characters")
        String description,
        Priority priority,
        LocalDate dueDate,
        Status status
) {
}
