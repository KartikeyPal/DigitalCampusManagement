package com.auth.controllers;

import com.auth.dtos.ClassDto;
import com.auth.entities.ClassEntity;
import com.auth.entities.Department;
import com.auth.repositories.ClassRepository;
import com.auth.repositories.DepartmentRepository;
import com.auth.services.ClassService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

//For testing purpose only Still work is needed
@RestController
@RequestMapping("/api/classes")
@RequiredArgsConstructor
public class ClassController {

    private final ClassService classService;

    @PostMapping
    public ResponseEntity<ClassDto> create(@Valid @RequestBody ClassDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(classService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<ClassDto>> getAll() {
        return ResponseEntity.ok(classService.getAll());
    }

}
