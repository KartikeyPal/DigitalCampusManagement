package com.auth.controllers;

import com.auth.entities.Department;
import com.auth.repositories.DepartmentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//For testing puropose only Still work is needed

@RestController
@RequestMapping("/api/department")
public class DepartmentController {
    private final DepartmentRepository departmentRepository;

    public DepartmentController(DepartmentRepository departmentRepository){
        this.departmentRepository  = departmentRepository;
    }

    @PostMapping("/create")
    public Department create(@RequestBody Department department){
        System.out.println(department);

        return departmentRepository.save(department);
    }

    @GetMapping
    public List<Department> getAll(){
        return departmentRepository.findAll();
    }
}
