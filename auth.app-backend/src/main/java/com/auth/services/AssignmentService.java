package com.auth.services;

import com.auth.dtos.AssignmentResponseDto;
import com.auth.dtos.CreateAssignmentRequest;
import com.auth.entities.Assignment;

import java.util.List;
import java.util.UUID;

public interface AssignmentService {
    AssignmentResponseDto createAssignment(CreateAssignmentRequest request);
    List<Assignment> getAssignmentsBySubject(UUID subjectId);
    List<AssignmentResponseDto> getAll();
//    Assignment getAssignmentById(UUID id);
}
