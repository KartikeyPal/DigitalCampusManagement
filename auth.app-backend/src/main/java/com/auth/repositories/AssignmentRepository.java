package com.auth.repositories;

import com.auth.entities.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, UUID> {
    // Custom query to find all assignments for a specific subject
    List<Assignment> findBySubjectId(UUID subjectId);

    // Custom query to find assignments created by a specific faculty member
    List<Assignment> findByFacultyId(UUID facultyId);
}
