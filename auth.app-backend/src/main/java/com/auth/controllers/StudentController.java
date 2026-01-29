package com.auth.controllers;

import com.auth.entities.Student;
import com.auth.entities.User;
import com.auth.repositories.StudentRepository;
import com.auth.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
//For testing puropose only Still work is needed

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    public StudentController(StudentRepository studentRepository,
                                 UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    }


    @PostMapping("/{userId}")
    public Student createStudent(@PathVariable UUID userId, @RequestBody Student student){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        student.setId(user.getId());
        student.setUser(user);

        return studentRepository.save(student);
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}
