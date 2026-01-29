package com.auth.services.impl;

import com.auth.dtos.ClassDto;
import com.auth.entities.ClassEntity;
import com.auth.entities.Department;
import com.auth.exceptions.ResourceNotFoundException;
import com.auth.repositories.ClassRepository;
import com.auth.repositories.DepartmentRepository;
import com.auth.services.ClassService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClassServiceImpl implements ClassService {

    private final ClassRepository classRepository;
    private final DepartmentRepository departmentRepository;
    private final ModelMapper mapper;

    @Override
    public ClassDto create(ClassDto dto) {

        Department department = departmentRepository.findById(dto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));

        ClassEntity entity = mapper.map(dto, ClassEntity.class);
        entity.setDepartment(department);

        return mapper.map(classRepository.save(entity), ClassDto.class);
    }

    @Override
    public List<ClassDto> getAll() {
        return classRepository.findAll()
                .stream()
                .map(e -> mapper.map(e, ClassDto.class))
                .toList();
    }

    @Override
    public ClassDto getById(UUID id) {
        return mapper.map(
                classRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Class not found")),
                ClassDto.class
        );
    }

    @Override
    public ClassDto update(UUID id, ClassDto dto) {
        ClassEntity entity = classRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Class not found"));

        mapper.map(dto, entity);
        return mapper.map(classRepository.save(entity), ClassDto.class);
    }

    @Override
    public void delete(UUID id) {
        classRepository.deleteById(id);
    }
}
