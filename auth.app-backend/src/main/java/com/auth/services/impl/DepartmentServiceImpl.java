package com.auth.services.impl;

import com.auth.dtos.DepartmentDto;
import com.auth.entities.Department;
import com.auth.repositories.DepartmentRepository;
import com.auth.services.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final ModelMapper mapper;

//    @Override
//    public DepartmentDto create(DepartmentDto dto) {
//        System.out.println("Result:"+dto.getName());
//
//        if (dto.getName() == null || dto.getName().isBlank()) {
//            throw new IllegalArgumentException("Department name is required");
//        }
//
//        Department department = mapper.map(dto, Department.class);
//        Department saved = departmentRepository.save(department);
//
//        return mapper.map(saved, DepartmentDto.class);
//
//    }

    @Override
    public DepartmentDto create(DepartmentDto dto) {

        if (dto.getName() == null) {
            throw new RuntimeException("DTO name is NULL BEFORE SAVE");
        }

        Department department = new Department();
        department.setName(dto.getName());

        Department saved = departmentRepository.save(department);

        return DepartmentDto.builder()
                .id(saved.getId())
                .name(saved.getName())
                .build();
    }

    @Override
    public List<Department> getAll() {
        return departmentRepository.findAll();
    }

    @Override
    public void delete(UUID id) {
        departmentRepository.deleteById(id);
    }
}
