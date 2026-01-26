package com.auth.repositories;

import com.auth.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("""
        SELECT n FROM Notification n
        WHERE n.deletedFromUi = false
        AND n.expiresAt > CURRENT_TIMESTAMP
        AND n.id IN (
            SELECT nt.notification.id FROM NotificationTarget nt
            WHERE nt.targetType = :type AND nt.targetId = :targetId
        )
        ORDER BY n.createdAt DESC
    """)
    List<Notification> findActiveNotifications(
            @Param("type") String type,
            @Param("targetId") Long targetId
    );

    List<Notification> findByCreatedAtBefore(LocalDateTime date);

    void deleteByExpiresAtBefore(LocalDateTime date);
}
