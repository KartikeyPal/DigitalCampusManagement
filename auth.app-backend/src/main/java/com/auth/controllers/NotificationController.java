package com.auth.controllers;

import com.auth.dtos.CreateNotificationRequest;
import com.auth.dtos.NotificationResponseDto;
import com.auth.services.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@AllArgsConstructor
public class NotificationController {

    private final NotificationService service;

    @PostMapping
    public void createNotification(
            @RequestParam Long creatorId,
            @RequestBody CreateNotificationRequest request) {
        service.createNotification(creatorId, request);
    }

    @GetMapping("/user/{userId}")
    public List<NotificationResponseDto> getUserNotifications(
            @PathVariable Long userId) {
        return service.getUserNotifications(userId);
    }
}

