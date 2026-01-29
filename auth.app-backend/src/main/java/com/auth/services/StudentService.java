package com.auth.services;

import com.auth.dtos.StudentDto;

import java.util.List;
import java.util.UUID;

public interface StudentService {
    StudentDto create(StudentDto dto);

//    StudentDto getById(UUID id);

    List<StudentDto> getAll();
}
