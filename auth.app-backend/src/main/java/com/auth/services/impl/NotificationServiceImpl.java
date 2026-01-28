package com.auth.services.impl;

import com.auth.dtos.CreateNotificationRequest;
import com.auth.dtos.NotificationResponseDto;
import com.auth.entities.Notification;
import com.auth.entities.NotificationTarget;
import com.auth.entities.User;
import com.auth.exceptions.ResourceNotFoundException;
import com.auth.repositories.NotificationRepository;
import com.auth.repositories.NotificationTargetRepository;
import com.auth.repositories.UserRepository;
import com.auth.services.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationTargetRepository notificationTargetRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public NotificationResponseDto createNotification(
            CreateNotificationRequest request,
            String email
    ) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Notification notification = new Notification();
        notification.setTitle(request.getTitle());
        notification.setMessage(request.getMessage());
        notification.setCreatedBy(user.getId());

        Notification savedNotification =  notificationRepository.save(notification); // ✅ save ONCE

        NotificationTarget target = new NotificationTarget();
        target.setUserId(user.getId());
        target.setNotification(savedNotification);

        notificationTargetRepository.save(target); // ✅ save ONCE

        return modelMapper.map(savedNotification, NotificationResponseDto.class);
    }



    @Override
    public List<NotificationResponseDto> getUserNotifications(UUID userId) {

        return notificationRepository
                .findActiveNotifications(userId)
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

