package com.auth.dtos;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class CreateAssignmentRequest {

    private String title;
    private String description;
    private LocalDateTime deadline;

    private UUID subjectId;
    private UUID facultyId;
}
