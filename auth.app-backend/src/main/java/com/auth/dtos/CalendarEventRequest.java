package com.auth.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CalendarEventRequest {
    private String title;
    private String eventType;
    private LocalDate eventDate;
    private String colorCode;
}


