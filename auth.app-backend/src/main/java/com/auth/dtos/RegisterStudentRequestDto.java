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
public class RegisterStudentRequestDto {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 2)
    private String password;

    @NotNull
    private String name;

    @NotNull
    private String rollNumber;

    @NotNull
    private UUID classId;
}
