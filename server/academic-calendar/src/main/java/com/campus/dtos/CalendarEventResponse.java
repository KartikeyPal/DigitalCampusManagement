package com.campus.dtos;

import com.campus.entities.EventType;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CalendarEventResponse {

    private UUID id;
    private String title;
    private String eventType;
    private LocalDate eventDate;
    private String colorCode;
}

