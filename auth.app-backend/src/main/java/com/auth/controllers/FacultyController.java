package com.auth.controllers;

import com.auth.dtos.FacultyDto;
import com.auth.entities.Faculty;
import com.auth.entities.User;
import com.auth.repositories.FacultyRepository;
import com.auth.repositories.UserRepository;
import com.auth.services.FacultyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

//For testing purpose only Still work is needed
@RestController
@RequestMapping("/api/faculties")
@RequiredArgsConstructor
public class FacultyController {

    private final FacultyService facultyService;

    @PostMapping
    public ResponseEntity<FacultyDto> create(@Valid @RequestBody FacultyDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(facultyService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<FacultyDto>> getAll() {

        System.out.println("faslkdfjlasdjf;sjdf;ksjdflk;sjdflkasjdflksajdfljasdl;f");
        return ResponseEntity.ok(facultyService.getAll());
    }

}
