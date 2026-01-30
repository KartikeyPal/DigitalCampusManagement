package com.auth.dtos;

import com.auth.entities.Department;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentResponseDto {
    private UUID id;
    private UUID userId;
    private String name;
    private String email;
    private String rollNumber;
    private UUID classId;
    private String className;
    private UUID departmentId;
    private String departmentName;
}
