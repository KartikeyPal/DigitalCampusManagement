package com.auth.services;

import com.auth.dtos.ClassDto;
import com.auth.dtos.ClassResponseDto;

import java.util.List;
import java.util.UUID;

public interface ClassService {
    ClassDto create(ClassDto dto);

    ClassDto getById(UUID id);

    List<ClassResponseDto> getAll();

    ClassDto update(UUID id, ClassDto dto);

    void delete(UUID id);
}
