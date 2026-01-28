package com.auth.controllers;

import com.auth.dtos.SubjectDto;
import com.auth.entities.Subject;
import com.auth.repositories.ClassRepository;
import com.auth.repositories.FacultyRepository;
import com.auth.repositories.SubjectRepository;
import com.auth.repositories.UserRepository;
import com.auth.services.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
//For testing purpose only Still work is needed
@RestController
@RequestMapping("/api/subjects")
@RequiredArgsConstructor
public class SubjectController {

    private final SubjectService subjectService;

    @PostMapping
    public ResponseEntity<SubjectDto> create(@RequestBody SubjectDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(subjectService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<SubjectDto>> getAll() {
        return ResponseEntity.ok(subjectService.getAll());
    }

}
