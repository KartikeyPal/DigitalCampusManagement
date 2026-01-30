package com.auth.services.impl;

import com.auth.dtos.ClassDto;
import com.auth.dtos.ClassResponseDto;
import com.auth.entities.ClassEntity;
import com.auth.entities.Department;
import com.auth.entities.User;
import com.auth.exceptions.ResourceNotFoundException;
import com.auth.repositories.ClassRepository;
import com.auth.repositories.DepartmentRepository;
import com.auth.repositories.UserRepository;
import com.auth.services.ClassService;
import jakarta.transaction.Transactional;
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
    private final UserRepository userRepository;

    @Override
    public ClassDto create(ClassDto dto) {

        Department department = departmentRepository.findById(dto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));

        User user = userRepository.findById(dto.getUserId()).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        ClassEntity entity = mapper.map(dto, ClassEntity.class);
        entity.setDepartment(department);
        entity.setUser(user);
        return mapper.map(classRepository.save(entity), ClassDto.class);
    }

    @Override
    @Transactional
    public List<ClassResponseDto> getAll() {

        return classRepository.findAll()
                .stream()
                .map(c -> ClassResponseDto.builder()
                        .id(c.getId())
                        .name(c.getName())

                        .departmentId(
                                c.getDepartment() != null
                                        ? c.getDepartment().getId()
                                        : null
                        )
                        .departmentName(
                                c.getDepartment() != null
                                        ? c.getDepartment().getName()
                                        : null
                        )

                        .userId(
                                c.getUser() != null
                                        ? c.getUser().getId()
                                        : null
                        )
                        .UserName(
                                c.getUser() != null
                                        ? c.getUser().getName()
                                        : null
                        )
                        .build()
                )
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
