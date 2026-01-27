package com.auth.controllers;

import com.auth.entities.Faculty;
import com.auth.entities.User;
import com.auth.repositories.FacultyRepository;
import com.auth.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
//For testing puropose only Still work is needed

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    private final FacultyRepository facultyRepository;
    private final UserRepository userRepository;

    public FacultyController(FacultyRepository facultyRepository,
                                 UserRepository userRepository) {
        this.facultyRepository = facultyRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/{userId}")
    public Faculty createFaculty(
            @PathVariable UUID userId,
            @RequestBody Faculty faculty
    ) {
        System.out.println("workgin");
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        faculty.setId(user.getId());
        faculty.setUser(user);

        return facultyRepository.save(faculty);
    }
}
