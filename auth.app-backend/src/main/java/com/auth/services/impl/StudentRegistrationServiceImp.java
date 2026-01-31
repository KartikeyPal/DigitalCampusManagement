package com.auth.services.impl;

import com.auth.dtos.RegisterStudentRequestDto;
import com.auth.dtos.StudentDto;
import com.auth.dtos.UserRegistrationResponseDto;
import com.auth.entities.ClassEntity;
import com.auth.entities.Role;
import com.auth.entities.Student;
import com.auth.entities.User;
import com.auth.exceptions.BusinessException;
import com.auth.exceptions.ResourceNotFoundException;
import com.auth.repositories.ClassRepository;
import com.auth.repositories.RoleRepository;
import com.auth.repositories.StudentRepository;
import com.auth.repositories.UserRepository;
import com.auth.services.StudentRegistrationService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentRegistrationServiceImp implements StudentRegistrationService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final RoleRepository roleRepository;
    private final ClassRepository classRepository;
    private final PasswordEncoder passwordEncoder;

    // @Autowired
    // private PasswordEncoder encoder;

    @Override
    @Transactional
    public UserRegistrationResponseDto register(RegisterStudentRequestDto request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        ClassEntity classEntity = classRepository.findById(request.getClassId())
                .orElseThrow(() -> new IllegalArgumentException("Class not found"));
//
//        Role studentRole = roleRepository.findByName("ROLE_STUDENT")
//                .orElseThrow(() -> new IllegalStateException("ROLE_STUDENT not found"));
        Role role = resolveRole("ROLE_STUDENT");

        //enc password;
        String encPass = passwordEncoder.encode(request.getPassword());

        User user = User.builder()
                .name(request.getName())
                .roles(Set.of(role))
                .email(request.getEmail())
                .password(passwordEncoder.encode(encPass))
                .enable(true)
                .build();
        System.out.println("--------------------------------------------------------");

        User savedUser = userRepository.save(user);

        System.out.println(savedUser.getUsername());
        System.out.println("--------------------------------------------------------");

        StudentDto student = StudentDto.builder()
                .rollNumber(request.getRollNumber())
                .classId(classEntity.getId())
                .userId(savedUser.getId())
                .build();
        Student stu = new Student();
        stu.setId(student.getId());
        stu.setUser(user);
        stu.setRollNumber(student.getRollNumber());
        stu.setClassName(classEntity);

        System.out.println("--------------------------------------------------------");

        studentRepository.save(stu);

        return UserRegistrationResponseDto.builder()
                .userId(savedUser.getId())
                .email(savedUser.getEmail())
                .role("ROLE_STUDENT")
                .build();
    }

    private Role resolveRole(String requestedRole) {

        String tempRole;

        if (requestedRole == null || requestedRole.isBlank()) {
            tempRole = "ROLE_STUDENT";
        } else {
            tempRole = requestedRole.toUpperCase();
            if (!tempRole.startsWith("ROLE_")) {
                tempRole = "ROLE_" + tempRole;
            }
        }

        final String roleName = tempRole; // ✅ effectively final

        if (!Set.of(
                "ROLE_STUDENT",
                "ROLE_ADMIN",
                "ROLE_FACULTY",
                "ROLE_HOD"
        ).contains(roleName)) {
            throw new BusinessException(
                    "Invalid role: " + requestedRole,
                    HttpStatus.BAD_REQUEST
            );        }

        return roleRepository.findByName(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleName));

    }
}
