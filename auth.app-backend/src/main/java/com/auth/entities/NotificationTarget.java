package com.auth.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "notification_targets")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationTarget {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "notificationTarget_id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notification_id")
    private Notification notification;

    private String targetType; // USER, ROLE, CLASS, CLUB, DEPARTMENT

    private Long targetId;
}

