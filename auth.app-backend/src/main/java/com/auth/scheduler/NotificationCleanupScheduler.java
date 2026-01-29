package com.auth.scheduler;

import com.auth.entities.Notification;
import com.auth.repositories.NotificationRepository;
import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@EnableScheduling
public class NotificationCleanupScheduler {

    private final NotificationRepository repository;

    public NotificationCleanupScheduler(NotificationRepository repository) {
        this.repository = repository;
    }

    // 🔹 Hide from UI after 1 month
    @Scheduled(cron = "0 0 2 * * ?")
    @Transactional
    public void hideOldNotifications() {

        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);

        List<Notification> oldNotifications =
                repository.findByCreatedAtBefore(oneMonthAgo);

        for (Notification n : oldNotifications) {
            n.setDeletedFromUi(true);
        }

         repository.saveAll(oldNotifications);
    }

    // 🔥 Delete permanently after 1 year
    @Scheduled(cron = "0 0 3 * * ?")
    public void deleteExpiredNotifications() {
        repository.deleteByExpiresAtBefore(LocalDateTime.now());
    }
}
