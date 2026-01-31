package com.auth.services.impl;

import com.auth.dtos.FacultyDto;
import com.auth.dtos.RegisterFacultyRequest;
import com.auth.dtos.UserRegistrationResponseDto;
import com.auth.entities.Department;
import com.auth.entities.Faculty;
import com.auth.entities.Role;
import com.auth.entities.User;
import com.auth.exceptions.BusinessException;
import com.auth.exceptions.ResourceNotFoundException;
import com.auth.repositories.DepartmentRepository;
import com.auth.repositories.FacultyRepository;
import com.auth.repositories.RoleRepository;
import com.auth.repositories.UserRepository;
import com.auth.services.FacultyRegistrationService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

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

        System.out.println("----------------------------------------------------------------");
        System.out.println(request.getEmail());
//        System.out.println(request.getPassword());
        System.out.println("----------------------------------------------------------------");


        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Department exists
        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new IllegalArgumentException("Department not found"));

        // fetching role
//        Role facultyRole = roleRepository.findByName("ROLE_FACULTY")
//                .orElseThrow(() -> new IllegalStateException("ROLE_FACULTY not found"));
        Role role = resolveRole("ROLE_FACULTY");
        // user Creation
        User user = User.builder()
                .email(request.getEmail())
                .roles(Set.of(role))
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
