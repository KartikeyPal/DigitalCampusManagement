package com.auth.services;

import com.auth.dtos.ClassDto;

import java.util.List;
import java.util.UUID;

public interface ClassService {
    ClassDto create(ClassDto dto);

    ClassDto getById(UUID id);

    List<ClassDto> getAll();

    ClassDto update(UUID id, ClassDto dto);

    void delete(UUID id);
}
