package com.auth.services;

import com.auth.dtos.RegisterStudentRequestDto;
import com.auth.dtos.UserRegistrationResponseDto;

public interface StudentRegistrationService {

    UserRegistrationResponseDto register(RegisterStudentRequestDto request);
}
