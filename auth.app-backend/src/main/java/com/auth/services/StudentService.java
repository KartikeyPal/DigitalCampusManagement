package com.auth.services;

import com.auth.dtos.StudentDto;
import com.auth.dtos.StudentResponseDto;

import java.util.List;
import java.util.UUID;

public interface StudentService {
    StudentDto create(StudentDto dto);

//    StudentDto getById(UUID id);

    List<StudentResponseDto> getAll();
}
