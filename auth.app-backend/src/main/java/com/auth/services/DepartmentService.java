package com.auth.services;

import com.auth.dtos.DepartmentDto;

import java.util.List;
import java.util.UUID;

public interface DepartmentService {

    DepartmentDto create(DepartmentDto dto);

    List<DepartmentDto> getAll();

    void delete(UUID id);
}
