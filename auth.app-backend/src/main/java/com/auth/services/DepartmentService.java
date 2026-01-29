package com.auth.services;

import com.auth.dtos.DepartmentDto;
import com.auth.entities.Department;

import java.util.List;
import java.util.UUID;

public interface DepartmentService {

    DepartmentDto create(DepartmentDto dto);

    List<Department> getAll();

    void delete(UUID id);
}
