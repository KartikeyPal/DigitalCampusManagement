package com.auth.controllers;

import com.auth.dtos.StudentDto;
import com.auth.entities.Student;
import com.auth.entities.User;
import com.auth.repositories.StudentRepository;
import com.auth.repositories.UserRepository;
import com.auth.services.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

//For testing purpose only Still work is needed
@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @PostMapping
    public ResponseEntity<StudentDto> create(@Valid @RequestBody StudentDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(studentService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<StudentDto>> getAll() {
        return ResponseEntity.ok(studentService.getAll());
    }
}
