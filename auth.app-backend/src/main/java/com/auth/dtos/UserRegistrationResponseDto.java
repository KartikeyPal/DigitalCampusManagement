package com.auth.dtos;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class UserRegistrationResponseDto {

    private UUID userId;
    private String email;
    private String role;
}
