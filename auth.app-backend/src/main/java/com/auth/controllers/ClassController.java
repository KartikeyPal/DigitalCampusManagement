package com.auth.controllers;

import com.auth.entities.ClassEntity;
import com.auth.entities.Department;
import com.auth.repositories.ClassRepository;
import com.auth.repositories.DepartmentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

//For testing puropose only Still work is needed
@RestController
@RequestMapping("/test/subjects")
public class ClassController {

    private final ClassRepository classRepository;
    private final DepartmentRepository departmentRepository;

    public ClassController(ClassRepository classRepository, DepartmentRepository departmentRepository){
            this.classRepository = classRepository;
            this.departmentRepository = departmentRepository;
    }

    @PostMapping("/{departmentId}")
    public ClassEntity create(@PathVariable UUID departmentId, @RequestBody ClassEntity classEntity){
        Department dept = departmentRepository.findById(departmentId).orElseThrow();
        classEntity.setDepartment(dept);
        return classRepository.save(classEntity);
    }

}
