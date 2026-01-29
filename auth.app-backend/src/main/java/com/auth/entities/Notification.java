package com.auth.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "notifications")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(SqlTypes.BINARY)
    @Column(columnDefinition = "Binary(16)")
    private UUID id;

    private String title;

    @Column(length = 1000)
    private String message;

    @Column(name = "created_by", columnDefinition = "BINARY(16)", nullable = false)
    @JoinColumn(name = "user_id")
    @JdbcTypeCode(SqlTypes.BINARY)
    private UUID createdBy;

    @Column(nullable = false)
    private String targetRole;

    private boolean deletedFromUi = false;

    private LocalDateTime expiresAt;

    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
        expiresAt = createdAt.plusYears(1); // auto delete after 1 year
    }

}

