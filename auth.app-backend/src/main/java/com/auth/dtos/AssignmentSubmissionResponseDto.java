package com.auth.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentSubmissionResponseDto {
    private UUID id;
    private UUID assignmentId;
    private String assignmentTitle;
    private String assignmentSubject;
    private String assignmentFaculty;
    private UUID studentId;
    private String studentName;
    private String studentRollNumber;
    private String departmentName;
    private String className;
    private String submissionTime;
    private String fileUrl;
}
