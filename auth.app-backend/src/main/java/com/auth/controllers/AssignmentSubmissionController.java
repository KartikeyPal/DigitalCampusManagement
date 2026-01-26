package com.auth.controllers;

import com.auth.entities.AssignmentSubmission;
import com.auth.services.AssignmentSubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/submissions")
@RequiredArgsConstructor
public class AssignmentSubmissionController {

    private final AssignmentSubmissionService submissionService;

    @PostMapping("/submit")
    public ResponseEntity<AssignmentSubmission> submit(@RequestBody AssignmentSubmission submission) {
        return ResponseEntity.ok(submissionService.submitAssignment(submission));
    }
}
