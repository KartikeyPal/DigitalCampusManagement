package com.auth.services.impl;

import com.auth.dtos.AssignmentResponseDto;
import com.auth.dtos.CreateAssignmentRequest;
import com.auth.entities.Assignment;
import com.auth.entities.Subject;
import com.auth.entities.User;
import com.auth.repositories.AssignmentRepository;
import com.auth.repositories.SubjectRepository;
import com.auth.repositories.UserRepository;
import com.auth.services.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AssignmentServiceImpl implements AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;

    @Override
    public AssignmentResponseDto createAssignment(CreateAssignmentRequest request) {

        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        User faculty = userRepository.findById(request.getFacultyId())
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        Assignment assignment = new Assignment();
        assignment.setTitle(request.getTitle());
        assignment.setDescription(request.getDescription());
        assignment.setDeadline(request.getDeadline());
        assignment.setSubject(subject);
        assignment.setFaculty(faculty);

        Assignment saved = assignmentRepository.save(assignment);

        return AssignmentResponseDto.builder()
                .id(saved.getId())
                .title(saved.getTitle())
                .description(saved.getDescription())
                .deadline(saved.getDeadline())
                .subjectId(subject.getId())
                .subjectName(subject.getName())
                .facultyId(faculty.getId())
                .facultyName(faculty.getName())
                .build();
    }



    @Override
    public List<Assignment> getAssignmentsBySubject(UUID subjectId) {
        return assignmentRepository.findBySubjectId(subjectId);
    }

    @Override
    public List<AssignmentResponseDto> getAll() {
        return assignmentRepository.findAll()
                .stream()
                .map(a -> AssignmentResponseDto.builder()
                        .id(a.getId())
                        .title(a.getTitle())
                        .description(a.getDescription())
                        .deadline(a.getDeadline())
                        .subjectId(
                                a.getSubject() != null ? a.getSubject().getId() : null
                        )
                        .subjectName(
                                a.getSubject() != null ? a.getSubject().getName() : null
                        )
                        .facultyId(
                                a.getFaculty() != null ? a.getFaculty().getId() : null
                        )
                        .facultyName(
                                a.getFaculty() != null ? a.getFaculty().getName() : null
                        )
                        .build()
                )
                .toList();
    }

}