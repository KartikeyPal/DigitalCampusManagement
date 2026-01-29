package com.auth.services.impl;

import com.auth.dtos.CreateNotificationRequest;
import com.auth.dtos.NotificationResponseDto;
import com.auth.entities.Notification;
import com.auth.entities.NotificationTarget;
import com.auth.repositories.NotificationRepository;
import com.auth.repositories.NotificationTargetRepository;
import com.auth.services.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepo;
    private final NotificationTargetRepository targetRepo;

    @Override
    public void createNotification(Long creatorId, CreateNotificationRequest request) {

        Notification notification = new Notification();
        notification.setTitle(request.getTitle());
        notification.setMessage(request.getMessage());
        notification.setCreatedBy(creatorId);

        notificationRepo.save(notification);

        NotificationTarget target = new NotificationTarget();
        target.setNotification(notification);
        target.setTargetType(request.getTargetType());
        target.setTargetId(request.getTargetId());

        targetRepo.save(target);
    }

    @Override
    public List<NotificationResponseDto> getUserNotifications(Long userId) {

        return notificationRepo
                .findActiveNotifications("USER", userId)
                .stream()
                .map(n -> {
                    NotificationResponseDto dto = new NotificationResponseDto();
                    dto.setId(n.getId());
                    dto.setTitle(n.getTitle());
                    dto.setMessage(n.getMessage());
                    dto.setCreatedAt(n.getCreatedAt());
                    return dto;
                })
                .toList();
    }
}

