package com.auth.controllers;

import com.auth.dtos.RegisterFacultyRequest;
import com.auth.dtos.RegisterStudentRequestDto;
import com.auth.dtos.UserRegistrationResponseDto;
import com.auth.services.FacultyRegistrationService;
import com.auth.services.StudentRegistrationService;
import jakarta.persistence.PrePersist;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminRegistrationController {

    private final StudentRegistrationService studentRegistrationService;
    private final FacultyRegistrationService facultyRegistrationService;

    @PostMapping("/students")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserRegistrationResponseDto> registerStudent(
            @Valid @RequestBody RegisterStudentRequestDto request
    ) {
        System.out.println("----------------------------------------------------------------");
        System.out.println(request.getEmail());
        System.out.println(request.getPassword());
        System.out.println("----------------------------------------------------------------");

        UserRegistrationResponseDto response =
                studentRegistrationService.register(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/faculty")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserRegistrationResponseDto> registerFaculty(
            @Valid @RequestBody RegisterFacultyRequest request
    ) {
        UserRegistrationResponseDto response =
                facultyRegistrationService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
