package com.auth.controllers;

import com.auth.dtos.CreateNotificationRequest;
import com.auth.dtos.NotificationResponseDto;
import com.auth.services.NotificationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notifications")
@AllArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    public ResponseEntity<?> create(
            @Valid @RequestBody CreateNotificationRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName(); // ✅ email (correct)

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(notificationService.createNotification(request, email));
    }


    @GetMapping("/user/{userId}")
    public List<NotificationResponseDto> getUserNotifications(
            @PathVariable UUID userId
    ) {
        return notificationService.getUserNotifications(userId);
    }
}


