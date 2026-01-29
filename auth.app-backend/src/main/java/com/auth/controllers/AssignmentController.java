package com.auth.controllers;

import com.auth.entities.Assignment;
import com.auth.services.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService assignmentService;

    @PostMapping("/create")
    public ResponseEntity<Assignment> create(@RequestBody Assignment assignment) {
        return ResponseEntity.ok(assignmentService.createAssignment(assignment));
    }

    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<Assignment>> getBySubject(@PathVariable UUID subjectId) {
        return ResponseEntity.ok(assignmentService.getAssignmentsBySubject(subjectId));
    }
}