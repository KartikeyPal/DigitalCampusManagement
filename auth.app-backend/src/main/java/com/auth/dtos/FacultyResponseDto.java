package com.auth.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FacultyResponseDto {
    private UUID id;
    private UUID userId;
    private String userName;
    private UUID departmentId;
    private String departmentName;
    private String designation;
}