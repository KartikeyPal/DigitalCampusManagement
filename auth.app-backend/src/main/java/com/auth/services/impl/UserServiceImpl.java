package com.auth.services.impl;

import com.auth.config.AppConstants;
import com.auth.dtos.RoleDto;
import com.auth.dtos.UserDto;
import com.auth.entities.Provider;
import com.auth.entities.Role;
import com.auth.entities.User;
import com.auth.exceptions.BusinessException;
import com.auth.exceptions.ResourceNotFoundException;
import com.auth.helpers.UserHelper;
import com.auth.repositories.RoleRepository;
import com.auth.repositories.UserRepository;
import com.auth.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public UserDto createUser(UserDto userDto) {
        if(userDto.getEmail() == null || userDto.getEmail().isBlank()){
            throw new BusinessException("Email is required", HttpStatus.BAD_REQUEST);
        }
        if(userRepository.existsByEmail(userDto.getEmail())){
            throw new BusinessException(
                    "User with given email already exists",
                    HttpStatus.CONFLICT
            );        }

        User user = modelMapper.map(userDto, User.class);
        user.setProvider(userDto.getProvider() != null ? userDto.getProvider() : Provider.LOCAL);

        String requestedRole = userDto.getRole();

        Role role = resolveRole(requestedRole);
        user.setRoles(Set.of(role));

        User savedUser = userRepository.save(user);

        UserDto response = modelMapper.map(savedUser, UserDto.class);

        response.setRole(
                savedUser.getRoles()
                        .stream()
                        .findFirst()
                        .map(Role::getName)
                        .orElse(null)
        );

        return response;

    }

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository
                        .findByEmail(email)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found with the given email"));

        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public UserDto updateUser(UserDto userDto, String userId) {
        UUID uuid = UserHelper.parseUUID(userId);
        User existingUser = userRepository.findById(uuid).orElseThrow(() -> new ResourceNotFoundException("User is not found for this id"));

        if(userDto.getName() != null) existingUser.setName(userDto.getName());
        if(userDto.getPassword() != null) existingUser.setPassword(userDto.getPassword());
        if(userDto.getProvider() != null) existingUser.setProvider(userDto.getProvider());
        if(userDto.getImage() != null) existingUser.setImage(userDto.getImage());
        existingUser.setEnable(userDto.isEnable());
        existingUser.setUpdatedAt(Instant.now());
        User updatedUser = userRepository.save(existingUser);

        return modelMapper.map(updatedUser, UserDto.class);
    }

    @Override
    public void deleteUser(String userId) {
        UUID uuid = UserHelper.parseUUID(userId);
        User user = userRepository.findById(uuid).orElseThrow(() -> new ResourceNotFoundException("User not found for this id"));
        userRepository.delete(user);
    }

    @Override
    public UserDto getUserById(String userId) {
        User user = userRepository.findById(UserHelper.parseUUID(userId)).orElseThrow(() -> new ResourceNotFoundException("User not found for this id"));

        return modelMapper.map(user, UserDto.class);
    }

    @Override
    @Transactional
    public Iterable<UserDto> getAllUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(user -> {
                    UserDto dto = modelMapper.map(user, UserDto.class);

                    dto.setRoles(
                            user.getRoles()
                                    .stream()
                                    .map(role -> modelMapper.map(role, RoleDto.class))
                                    .collect(java.util.stream.Collectors.toSet())
                    );

                    return dto;
                })
                .toList();
    }


    private Role resolveRole(String requestedRole) {

        String tempRole;

        if (requestedRole == null || requestedRole.isBlank()) {
            tempRole = "ROLE_STUDENT";
        } else {
            tempRole = requestedRole.toUpperCase();
            if (!tempRole.startsWith("ROLE_")) {
                tempRole = "ROLE_" + tempRole;
            }
        }

        final String roleName = tempRole; // ✅ effectively final

        if (!Set.of(
                "ROLE_STUDENT",
                "ROLE_ADMIN",
                "ROLE_FACULTY",
                "ROLE_HOD"
        ).contains(roleName)) {
            throw new BusinessException(
                    "Invalid role: " + requestedRole,
                    HttpStatus.BAD_REQUEST
            );        }

        return roleRepository.findByName(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleName));

    }


}
