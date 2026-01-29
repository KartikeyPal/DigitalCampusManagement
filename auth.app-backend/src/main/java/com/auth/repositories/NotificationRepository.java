package com.auth.repositories;

import com.auth.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {

    @Query("""
    SELECT n FROM Notification n
    WHERE n.deletedFromUi = false
    AND n.expiresAt > CURRENT_TIMESTAMP
    AND n.id IN (
        SELECT nt.notification.id FROM NotificationTarget nt
        WHERE nt.userId = :userId
    )
    ORDER BY n.createdAt DESC
""")
    List<Notification> findActiveNotifications(@Param("userId") UUID userId);

    @Query("""
    SELECT n
    FROM Notification n
    JOIN NotificationTarget nt ON nt.notification.id = n.id
    WHERE nt.userId = :userId
      AND (
           n.targetRole IS NULL
           OR UPPER(n.targetRole) IN :roles
      )
    ORDER BY n.createdAt DESC
""")
    List<Notification> findUserNotifications(
            UUID userId,
            List<String> roles
    );

    @Query("""
   SELECT n
   FROM Notification n
   JOIN NotificationTarget nt ON nt.notification.id = n.id
   WHERE nt.userId = :userId
   ORDER BY n.createdAt DESC
""")
    List<Notification> findByUserId(UUID userId);


    List<Notification> findByCreatedAtBefore(LocalDateTime date);

    void deleteByExpiresAtBefore(LocalDateTime date);
}
