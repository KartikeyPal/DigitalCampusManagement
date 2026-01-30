package com.auth.controllers;

import com.auth.dtos.AssignmentSubmissionRequestDto;
import com.auth.dtos.AssignmentSubmissionResponseDto;
import com.auth.entities.AssignmentSubmission;
import com.auth.services.AssignmentSubmissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
@RequiredArgsConstructor
public class AssignmentSubmissionController {

    private final AssignmentSubmissionService submissionService;

    @PostMapping("/submit")
    public ResponseEntity<AssignmentSubmissionRequestDto> submit(
            @Valid @RequestBody AssignmentSubmissionRequestDto submission
    ) {
        return ResponseEntity.ok(submissionService.submitAssignment(submission));
    }

    @GetMapping
    public ResponseEntity<List<AssignmentSubmissionResponseDto>> getAllSubmittedAssignment(){
        return ResponseEntity.ok(submissionService.getAllSubmittedAssignment());
    }
}
