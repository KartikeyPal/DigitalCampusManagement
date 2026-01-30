package com.auth.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentSubmissionRequestDto {
    private UUID id;
    @NotNull(message = "assignment id is required")
    private UUID assignmentId;
    @NotNull(message = "student Id is required")
    private UUID studentId;
    private String fileUrl;

}
