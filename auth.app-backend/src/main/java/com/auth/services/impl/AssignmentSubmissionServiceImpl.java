package com.auth.services.impl;

import com.auth.entities.AssignmentSubmission;
import com.auth.repositories.AssignmentSubmissionRepository;
import com.auth.services.AssignmentSubmissionService;
import lombok.*;
import org.springframework.stereotype.*;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AssignmentSubmissionServiceImpl implements AssignmentSubmissionService {

    private final AssignmentSubmissionRepository submissionRepository;

    @Override
    public AssignmentSubmission submitAssignment(AssignmentSubmission submission) {
        submission.setSubmittedAt(LocalDateTime.now());
        return submissionRepository.save(submission);
    }
}