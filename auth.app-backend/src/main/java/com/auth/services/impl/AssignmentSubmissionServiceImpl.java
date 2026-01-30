package com.auth.services.impl;

import com.auth.dtos.AssignmentSubmissionRequestDto;
import com.auth.dtos.AssignmentSubmissionResponseDto;
import com.auth.entities.Assignment;
import com.auth.entities.AssignmentSubmission;
import com.auth.entities.Student;
import com.auth.entities.User;
import com.auth.exceptions.ResourceNotFoundException;
import com.auth.repositories.AssignmentRepository;
import com.auth.repositories.AssignmentSubmissionRepository;
import com.auth.repositories.StudentRepository;
import com.auth.repositories.UserRepository;
import com.auth.services.AssignmentSubmissionService;
import jakarta.transaction.Transactional;
import lombok.*;
import org.springframework.stereotype.*;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AssignmentSubmissionServiceImpl
        implements AssignmentSubmissionService {

    private final AssignmentSubmissionRepository submissionRepository;
    private final AssignmentRepository assignmentRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    @Override
    public AssignmentSubmissionRequestDto submitAssignment(AssignmentSubmissionRequestDto request) {

        //Fetching assignment
        Assignment assignment = assignmentRepository.findById(request.getAssignmentId())
                .orElseThrow(() -> new IllegalArgumentException("Assignment not found"));


        //Fetching Student
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));


        AssignmentSubmission submission = new AssignmentSubmission();


        submission.setAssignment(assignment);
        submission.setStudent(student);
        submission.setFileUrl(request.getFileUrl());

        AssignmentSubmission saved = submissionRepository.save(submission);

        return AssignmentSubmissionRequestDto.builder()
                .id(saved.getId())
                .assignmentId(assignment.getId())
                .studentId(student.getId())
                .fileUrl(saved.getFileUrl())
                .build();
    }

    @Override
    public List<AssignmentSubmissionResponseDto> getAllSubmittedAssignment() {

        //fetching AllAssignment
        List<AssignmentSubmission> assignmentSubmissions = submissionRepository.findAll();
        return assignmentSubmissions.stream().map(this::mapToDto).toList();
    }

    private AssignmentSubmissionResponseDto mapToDto(AssignmentSubmission as){
        return AssignmentSubmissionResponseDto.builder()
                .id(as.getId())
                .assignmentId(as.getAssignment().getId())
                .assignmentTitle(as.getAssignment().getTitle())
                .assignmentSubject(as.getAssignment().getSubject().getName())
                .assignmentFaculty(as.getAssignment().getFaculty().getUsername())
                .studentId(as.getStudent().getId())
                .studentName(as.getStudent().getUser().getName())
                .studentRollNumber(as.getStudent().getRollNumber())
                .departmentName(as.getStudent().getClassName().getDepartment().getName())
                .className(as.getStudent().getClassName().getName())
                .submissionTime(as.getSubmittedAt().toString())
                .fileUrl(as.getFileUrl())
                .build();
    }
}