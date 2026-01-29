package com.auth.dtos;

import org.springframework.http.HttpStatus;

public record ErrorResponse(
        int status,
        String error,
        String message,
        String path
) {}

