package com.auth.dtos;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class AssignmentResponseDto {
    private UUID id;
    private String title;
    private String description;
    private LocalDateTime deadline;

    private UUID subjectId;
    private String subjectName;

    private UUID facultyId;
    private String facultyName;
}
