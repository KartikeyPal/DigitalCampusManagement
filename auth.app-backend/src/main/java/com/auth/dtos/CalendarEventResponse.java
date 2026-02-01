package com.auth.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
public class CalendarEventResponse {

    private UUID id;
    private String title;
    private String eventType;
    private LocalDate eventDate;
    private String colorCode;
}

