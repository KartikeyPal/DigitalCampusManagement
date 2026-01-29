package com.auth.controllers;

import com.auth.dtos.CreateNotificationRequest;
import com.auth.dtos.NotificationResponseDto;
import com.auth.services.NotificationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
        String email = authentication.getName();

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(notificationService.createNotification(request, email));
    }

    @GetMapping
    public List<NotificationResponseDto> myNotifications(
            Authentication authentication
    ) {
         return notificationService.getMyNotifications(authentication.getName());
    }

    @GetMapping("/allNotifications")
    public ResponseEntity<List<NotificationResponseDto>> getAllNotification(){
        return ResponseEntity.ok(notificationService.getAll());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteNotificationByAdmin(
            @PathVariable UUID id
    ) {
        notificationService.deleteNotificationByAdmin(id);
        return ResponseEntity.noContent().build();
    }


}


