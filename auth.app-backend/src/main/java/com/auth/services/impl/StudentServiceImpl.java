package com.auth.services.impl;

import com.auth.dtos.StudentDto;
import com.auth.entities.Department;
import com.auth.entities.Student;
import com.auth.entities.User;
import com.auth.exceptions.ResourceNotFoundException;
import com.auth.repositories.DepartmentRepository;
import com.auth.repositories.StudentRepository;
import com.auth.repositories.UserRepository;
import com.auth.services.StudentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final ModelMapper mapper;

    @Override
    @Transactional
    public StudentDto create(StudentDto dto) {

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Department department = departmentRepository.findById(dto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));

        Student student = new Student();
        student.setRollNumber(dto.getRollNumber());
        student.setClassName(dto.getClassName());
        student.setUser(user);
        student.setDepartment(department);

        Student saved = studentRepository.save(student);

        return mapper.map(saved, StudentDto.class);
    }

    @Override
    public StudentDto getById(UUID id) {
        return mapper.map(
                studentRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Student not found")),
                StudentDto.class
        );
    }

    @Override
    public List<StudentDto> getAll() {
        return studentRepository.findAll()
                .stream()
                .map(s -> mapper.map(s, StudentDto.class))
                .toList();
    }
}

