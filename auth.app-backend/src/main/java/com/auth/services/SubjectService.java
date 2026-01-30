package com.auth.services;

import com.auth.dtos.SubjectDto;
import com.auth.dtos.SubjectResponseDto;

import java.util.List;

public interface SubjectService {
    SubjectDto create(SubjectDto dto);
    List<SubjectResponseDto> getAll();
}
