package com.auth.services;

import com.auth.dtos.FacultyDto;
import com.auth.dtos.FacultyResponseDto;
import com.auth.entities.Faculty;

import java.util.List;

public interface FacultyService {
    FacultyDto create(FacultyDto dto);

    List<FacultyResponseDto> getAll();
}
