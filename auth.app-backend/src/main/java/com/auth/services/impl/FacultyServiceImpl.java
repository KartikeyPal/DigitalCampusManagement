package com.auth.services.impl;

import com.auth.dtos.FacultyDto;
import com.auth.dtos.FacultyResponseDto;
import com.auth.entities.Department;
import com.auth.entities.Faculty;
import com.auth.entities.User;
import com.auth.exceptions.ResourceNotFoundException;
import com.auth.repositories.DepartmentRepository;
import com.auth.repositories.FacultyRepository;
import com.auth.repositories.UserRepository;
import com.auth.services.FacultyService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FacultyServiceImpl implements FacultyService {

    private final FacultyRepository facultyRepository;
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final ModelMapper mapper;

    @Override
    @Transactional
    public FacultyDto create(FacultyDto dto) {

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Department department = departmentRepository.findById(dto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));

        // Build entity manually
        Faculty faculty = new Faculty();
        faculty.setDesignation(dto.getDesignation());
        faculty.setUser(user);
        faculty.setDepartment(department);

        Faculty saved = facultyRepository.save(faculty);

        // ModelMapper ONLY here (safe)
        FacultyDto response = mapper.map(saved, FacultyDto.class);
        response.setUserId(user.getId());
        response.setDepartmentId(department.getId());

        return response;
    }


    @Override
    @Transactional
    public List<FacultyResponseDto> getAll() {

        return facultyRepository.findAll()
                .stream()
                .map(f -> FacultyResponseDto.builder()
                        .id(f.getId())
                        .userId(
                                f.getUser() != null ? f.getUser().getId() : null
                        )
                        .userName(
                                f.getUser() != null ? f.getUser().getName() : null
                        )
                        .departmentId(
                                f.getDepartment() != null ? f.getDepartment().getId() : null
                        )
                        .departmentName(
                                f.getDepartment() != null ? f.getDepartment().getName() : null
                        )
                        .build()
                )
                .toList();
    }

}

