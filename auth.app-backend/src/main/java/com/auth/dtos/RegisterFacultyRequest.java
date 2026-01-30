package com.auth.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterFacultyRequest {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 2, message = "Password must be at least 2 characters")
    private String password;

    @NotNull
    private String name;

    private String designation;

    @NotNull
    private UUID departmentId;
}
