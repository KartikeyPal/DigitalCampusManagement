package com.auth.services;

import com.auth.dtos.UserDto;

public interface AuthService {

    //register
    UserDto registerUser(UserDto userDto);

    //login
}
