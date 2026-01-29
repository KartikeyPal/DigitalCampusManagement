package com.auth.services;

import com.auth.dtos.SubjectDto;

import java.util.List;

public interface SubjectService {
    SubjectDto create(SubjectDto dto);
    List<SubjectDto> getAll();
}
