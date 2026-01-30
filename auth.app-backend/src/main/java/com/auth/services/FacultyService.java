package com.auth.services;

import com.auth.dtos.FacultyDto;
import com.auth.dtos.FacultyResponseDto;
import com.auth.entities.Faculty;

import java.util.List;
import java.util.UUID;

public interface FacultyService {
    FacultyDto create(FacultyDto dto);
    FacultyDto update(UUID id, FacultyDto dto);
    List<FacultyResponseDto> getAll();
}
