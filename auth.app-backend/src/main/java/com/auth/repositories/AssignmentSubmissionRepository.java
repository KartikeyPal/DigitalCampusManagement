package com.auth.repositories;

import com.auth.entities.AssignmentSubmission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AssignmentSubmissionRepository
        extends JpaRepository<AssignmentSubmission, UUID> {

    List<AssignmentSubmission> findByAssignment_Id(UUID assignmentId);

    List<AssignmentSubmission> findByStudent_Id(UUID studentId);
}
