package com.auth.services;

import com.auth.dtos.CreateNotificationRequest;
import com.auth.dtos.NotificationResponseDto;

import java.util.List;

public interface NotificationService {

    void createNotification(Long creatorId, CreateNotificationRequest request);

    List<NotificationResponseDto> getUserNotifications(Long userId);
}

