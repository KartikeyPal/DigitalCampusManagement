package com.auth.dtos;

import com.auth.entities.Department;
import com.auth.entities.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClassDto {
    private UUID id;
    private String name;
    private Department department;
    public User classTeacher;
}
