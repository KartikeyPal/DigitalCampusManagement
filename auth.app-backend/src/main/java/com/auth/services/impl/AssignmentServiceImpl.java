package com.auth.services.impl;

import com.auth.entities.Assignment;
import com.auth.repositories.AssignmentRepository;
import com.auth.services.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AssignmentServiceImpl implements AssignmentService {

    private final AssignmentRepository assignmentRepository;

    @Override
    public Assignment createAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    @Override
    public List<Assignment> getAssignmentsBySubject(UUID subjectId) {
        return assignmentRepository.findBySubjectId(subjectId);
    }

    @Override
    public List<Assignment> getAll() {
        return List.of();
    }
}