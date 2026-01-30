package com.auth.services.impl;

import com.auth.dtos.StudentDto;
import com.auth.entities.ClassEntity;
import com.auth.entities.Department;
import com.auth.entities.Student;
import com.auth.entities.User;
import com.auth.exceptions.ResourceNotFoundException;
import com.auth.helpers.UserHelper;
import com.auth.repositories.ClassRepository;
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
    private final ClassRepository classRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public StudentDto create(StudentDto studentDto) {

        User user = userRepository.findById(studentDto.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
        System.out.println(user.getEmail());
        boolean isStudent = user.getRoles()
                .stream()
                .anyMatch(role -> role.getName().equals("ROLE_STUDENT"));
        System.out.println(isStudent);
        if (!isStudent) {
            throw new IllegalStateException(
                    "Only users with ROLE_STUDENT can be registered as Student"
            );
        }


        if (studentRepository.existsByUserId(user.getId())) {
            throw new IllegalStateException(
                    "Student already exists for this user"
            );
        }


        ClassEntity classEntity = classRepository.findById(studentDto.getClassId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Class not found"));
        System.out.println(classEntity.getName());
        Student student = new Student();
        student.setUser(user);
        student.setRollNumber(studentDto.getRollNumber());
        student.setClassName(classEntity);
        System.out.println(student.getId());

        Student savedStudent = studentRepository.save(student);

        return modelMapper.map(savedStudent, StudentDto.class);
    }



    @Override
    public List<StudentDto> getAll() {
        return studentRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    private StudentDto mapToDto(Student student) {
        return StudentDto.builder()
                .id(student.getId())
                .userId(student.getUser().getId())
                .rollNumber(student.getRollNumber())
                .classId(student.getClassName().getId())
                .build();
    }
}


