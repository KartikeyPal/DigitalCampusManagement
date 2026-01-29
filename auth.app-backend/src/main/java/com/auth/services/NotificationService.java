package com.auth.services;

import com.auth.dtos.CreateNotificationRequest;
import com.auth.dtos.NotificationResponseDto;
import com.auth.entities.Notification;

import java.util.List;
import java.util.UUID;

public interface NotificationService {

    NotificationResponseDto createNotification(CreateNotificationRequest request, String email);

    void deleteNotificationByAdmin(UUID notificationId);

    List<NotificationResponseDto> getMyNotifications(String email);

}

