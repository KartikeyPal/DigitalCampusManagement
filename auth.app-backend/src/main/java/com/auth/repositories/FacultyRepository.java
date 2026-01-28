package com.auth.repositories;

import com.auth.entities.Department;
import com.auth.entities.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FacultyRepository extends JpaRepository<Faculty, UUID> {
    List<Faculty> getAllByDepartmentAndDepartment(Department department, Department department1);
}
