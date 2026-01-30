package com.auth.services;

import com.auth.dtos.AssignmentSubmissionRequestDto;
import com.auth.dtos.AssignmentSubmissionResponseDto;

import java.util.List;

public interface AssignmentSubmissionService {
    AssignmentSubmissionRequestDto submitAssignment(AssignmentSubmissionRequestDto submission);
    List<AssignmentSubmissionResponseDto> getAllSubmittedAssignment();
}
