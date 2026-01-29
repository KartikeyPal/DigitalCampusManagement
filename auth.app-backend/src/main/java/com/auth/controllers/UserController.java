package com.auth.controllers;

import com.auth.dtos.UserDto;
import com.auth.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    //create user api
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userDto));
    }

    //get all user api
    @GetMapping
    public ResponseEntity<Iterable<UserDto>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    //get user by email
    @GetMapping("/email/{emailId}")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable String emailId){
        return ResponseEntity.ok(userService.getUserByEmail(emailId));
    }

    //delete user
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable String userId){
        userService.deleteUser(userId);
    }

    //update user
    @PutMapping("/{userId}")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto, @PathVariable String userId){
        return ResponseEntity.ok(userService.updateUser(userDto, userId));
    }

    //get user by id
    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable String userId){
        return ResponseEntity.ok(userService.getUserById(userId));
    }
}
