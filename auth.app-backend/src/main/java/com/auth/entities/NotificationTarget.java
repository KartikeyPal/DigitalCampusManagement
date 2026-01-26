package com.auth.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "notification_targets")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationTarget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notification_id")
    private Notification notification;

    private String targetType; // USER, ROLE, CLASS, CLUB, DEPARTMENT

    private Long targetId;
}

