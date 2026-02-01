package com.campus.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "calendar_events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CalendarEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String title;          // Holiday / Exam / Cultural Event
    private String eventType;      // HOLIDAY, EXAM, SESSION
    private LocalDate eventDate;
    private String colorCode;      // UI color mapping

    @ManyToOne
    @JoinColumn(name = "calendar_id")
    private AcademicCalendar calendar;
}

