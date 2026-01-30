package com.auth.services;

import com.auth.dtos.RegisterFacultyRequest;
import com.auth.dtos.UserRegistrationResponseDto;

public interface FacultyRegistrationService {

    UserRegistrationResponseDto register(RegisterFacultyRequest request);
}
