package com.auth.repositories;

import com.auth.entities.NotificationTarget;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationTargetRepository
        extends JpaRepository<NotificationTarget, Long> {
}

