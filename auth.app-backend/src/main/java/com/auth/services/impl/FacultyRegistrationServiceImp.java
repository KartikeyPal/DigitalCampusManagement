package com.auth.services.impl;

import com.auth.dtos.FacultyDto;
import com.auth.dtos.RegisterFacultyRequest;
import com.auth.dtos.UserRegistrationResponseDto;
import com.auth.entities.Department;
import com.auth.entities.Faculty;
import com.auth.entities.Role;
import com.auth.entities.User;
import com.auth.repositories.DepartmentRepository;
import com.auth.repositories.FacultyRepository;
import com.auth.repositories.RoleRepository;
import com.auth.repositories.UserRepository;
import com.auth.services.FacultyRegistrationService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class FacultyRegistrationServiceImp implements FacultyRegistrationService {

    private final UserRepository userRepository;
    private final FacultyRepository facultyRepository;
    private final RoleRepository roleRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserRegistrationResponseDto register(RegisterFacultyRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Department exists
        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new IllegalArgumentException("Department not found"));

        // fetching role
        Role facultyRole = roleRepository.findByName("ROLE_FACULTY")
                .orElseThrow(() -> new IllegalStateException("ROLE_FACULTY not found"));

        // user Creation
        User user = User.builder()
                .email(request.getEmail())
                .name(request.getName())
                .password(passwordEncoder.encode(request.getPassword()))
                .enable(true)
                .build();

        User savedUser = userRepository.save(user);

        // faculty creation
        FacultyDto facultyDto = FacultyDto.builder()
                .departmentId(department.getId())
                .userId(savedUser.getId())
                .build();

        Faculty faculty = new Faculty();
        faculty.setUser(savedUser);
        faculty.setDepartment(department);
        faculty.setDesignation(request.getDesignation());

        facultyRepository.save(faculty);

        // Generating the response
        return UserRegistrationResponseDto.builder()
                .userId(savedUser.getId())
                .email(savedUser.getEmail())
                .role("ROLE_FACULTY")
                .build();
    }
}
