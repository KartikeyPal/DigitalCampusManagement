package com.auth.services;

import com.auth.dtos.FacultyDto;

import java.util.List;

public interface FacultyService {
    FacultyDto create(FacultyDto dto);

    List<FacultyDto> getAll();
}
