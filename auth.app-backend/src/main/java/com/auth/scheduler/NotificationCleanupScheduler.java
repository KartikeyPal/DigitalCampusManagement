package com.auth.scheduler;

import com.auth.repositories.NotificationRepository;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@EnableScheduling
public class NotificationCleanupScheduler {

    private final NotificationRepository repository;

    public NotificationCleanupScheduler(NotificationRepository repository) {
        this.repository = repository;
    }

    // 🔹 Hide from UI after 1 month
    @Scheduled(cron = "0 0 2 * * ?")
    public void hideOldNotifications() {
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
        repository.findByCreatedAtBefore(oneMonthAgo)
                .forEach(n -> n.setDeletedFromUi(true));
    }

    // 🔥 Delete permanently after 1 year
    @Scheduled(cron = "0 0 3 * * ?")
    public void deleteExpiredNotifications() {
        repository.deleteByExpiresAtBefore(LocalDateTime.now());
    }
}
