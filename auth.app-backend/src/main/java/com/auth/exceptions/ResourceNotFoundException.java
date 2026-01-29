package com.auth.exceptions;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends BusinessException {

    public ResourceNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }

    public ResourceNotFoundException() {
        super("Resource not found!!", HttpStatus.NOT_FOUND);
    }
}

