package com.auth.services;

import com.auth.entities.Assignment;

import java.util.List;
import java.util.UUID;

public interface AssignmentService {
    Assignment createAssignment(Assignment assignment);
    List<Assignment> getAssignmentsBySubject(UUID subjectId);
//    Assignment getAssignmentById(UUID id);
}
