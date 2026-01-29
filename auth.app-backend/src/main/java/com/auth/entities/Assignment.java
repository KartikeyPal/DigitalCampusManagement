package com.auth.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "assignments")
public class Assignment {

    @Id
    @GeneratedValue
    @Column(name = "assignment_id")
    private UUID id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDateTime deadline;

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @ManyToOne
    @JoinColumn(name = "faculty_id", nullable = false)
    private User faculty;
}
