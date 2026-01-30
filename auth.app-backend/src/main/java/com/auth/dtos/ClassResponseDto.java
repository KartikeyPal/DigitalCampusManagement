package com.auth.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClassResponseDto {
    private UUID id;
    private String name;
    private UUID departmentId;
    private String departmentName;
    private UUID userId;
    private String UserName;
}
