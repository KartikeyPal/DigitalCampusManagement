package com.auth.repositories;

import com.auth.entities.NotificationTarget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NotificationTargetRepository
        extends JpaRepository<NotificationTarget, UUID> {
}

