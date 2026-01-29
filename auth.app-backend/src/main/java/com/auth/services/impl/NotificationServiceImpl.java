package com.auth.services.impl;

import com.auth.dtos.CreateNotificationRequest;
import com.auth.dtos.NotificationResponseDto;
import com.auth.entities.Notification;
import com.auth.entities.NotificationTarget;
import com.auth.entities.Role;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
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

        String targetRole = request.getTargetRole().toUpperCase();
        notification.setTargetRole(targetRole);

        Notification savedNotification =  notificationRepository.save(notification); // ✅ save ONCE

        List<String> allowedRoles = resolveAllowedViewerRoles(targetRole);

        List<User> usersToNotify = userRepository.findUsersByRoleNames(allowedRoles);

        List<NotificationTarget> targets = new ArrayList<>();

        for (User u : usersToNotify) {
            NotificationTarget target = new NotificationTarget();
            target.setUserId(u.getId());
            target.setNotification(savedNotification);
            targets.add(target);
        }

        //testing
        System.out.println("Target role: " + targetRole);
        System.out.println("Allowed roles: " + allowedRoles);
        System.out.println("Users found: " + usersToNotify.size());

        if (!targets.isEmpty()) {
            notificationTargetRepository.saveAll(targets);
            notificationTargetRepository.flush();
        }

        return modelMapper.map(savedNotification, NotificationResponseDto.class);
    }

    @Override
    public List<NotificationResponseDto> getMyNotifications(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return notificationRepository
                .findByUserId(user.getId())
                .stream()
                .map(n -> modelMapper.map(n, NotificationResponseDto.class))
                .toList();
    }

    @Override
    @Transactional
    public void deleteNotificationByAdmin(UUID notificationId) {

        notificationTargetRepository.deleteByNotificationId(notificationId);

        notificationRepository.deleteById(notificationId);
    }


    private List<String> resolveAllowedViewerRoles(String targetRole) {

        if (targetRole == null) return List.of();

        targetRole = targetRole.toUpperCase();

        return switch (targetRole) {
            case "STUDENT" -> List.of("ROLE_STUDENT", "ROLE_FACULTY", "ROLE_HOD", "ROLE_ADMIN");
            case "FACULTY" -> List.of("ROLE_FACULTY", "ROLE_HOD", "ROLE_ADMIN");
            case "HOD" -> List.of("ROLE_HOD", "ROLE_ADMIN");
            case "ADMIN" -> List.of("ROLE_ADMIN");
            default -> List.of();
        };
    }

}

