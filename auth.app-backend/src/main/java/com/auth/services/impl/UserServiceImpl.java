package com.auth.services.impl;

import com.auth.config.AppConstants;
import com.auth.dtos.UserDto;
import com.auth.entities.Provider;
import com.auth.entities.Role;
import com.auth.entities.User;
import com.auth.exceptions.ResourceNotFoundException;
import com.auth.helpers.UserHelper;
import com.auth.repositories.RoleRepository;
import com.auth.repositories.UserRepository;
import com.auth.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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
            throw new IllegalArgumentException("Email is required");
        }
        if(userRepository.existsByEmail(userDto.getEmail())){
            throw new IllegalArgumentException("User with given email is already exists");
        }

        User user = modelMapper.map(userDto, User.class);
        user.setProvider(userDto.getProvider() != null ? userDto.getProvider() : Provider.LOCAL);

        Role role = resolveRole(userDto.getRole());
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
                .map(user -> modelMapper.map(user, UserDto.class))
                .toList();
    }

    private Role resolveRole(String requestedRole) {

        // Default role
        if (requestedRole == null || requestedRole.isBlank()) {
            return roleRepository.findByName("ROLE_"+AppConstants.STUDENT_ROLE)
                    .orElseThrow(() -> new RuntimeException("ROLE_STUDENT not found"));
        }

        String role = requestedRole.toUpperCase();

        // Whitelist allowed roles
        if (!role.equals("STUDENT") && !role.equals("FACULTY") && !role.equals("HOD") && !role.equals("ADMIN")) {
            throw new IllegalArgumentException("Invalid role: " + requestedRole);
        }

        return roleRepository.findByName("ROLE_" + role)
                .orElseThrow(() -> new RuntimeException("Role not found"));
    }

}
