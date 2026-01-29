package com.auth.services.impl;

import com.auth.config.AppConstants;
import com.auth.dtos.UserDto;
import com.auth.repositories.RoleRepository;
import com.auth.services.AuthService;
import com.auth.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto registerUser(UserDto userDto) {

        //save the password in the encoded format in the db
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));

        return userService.createUser(userDto);

    }
}
