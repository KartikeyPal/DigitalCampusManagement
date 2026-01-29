package com.auth.controllers;

import com.auth.dtos.ClassDto;
import com.auth.dtos.UserDto;
import com.auth.entities.ClassEntity;
import com.auth.entities.Department;
import com.auth.repositories.ClassRepository;
import com.auth.repositories.DepartmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

//For testing puropose only Still work is needed
@RestController
@RequestMapping("/api/class")
public class ClassController {

    private final ClassRepository classRepository;
    private final DepartmentRepository departmentRepository;

    public ClassController(ClassRepository classRepository, DepartmentRepository departmentRepository){
            this.classRepository = classRepository;
            this.departmentRepository = departmentRepository;
    }

    @PostMapping("/{departmentId}")
    public ClassEntity create(@PathVariable UUID departmentId, @RequestBody ClassDto classDto){
        Department dept = departmentRepository.findById(departmentId).orElseThrow();
        classDto.setDepartment(dept);
        return classRepository.save();
    }
    public ResponseEntity<Iterable<ClassDto>> getAllClass(){
        return ResponseEntity.ok(classRepository.findAll());
    }

}
