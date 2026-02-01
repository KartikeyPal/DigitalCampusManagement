package com.auth.dtos;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class AcademicCalendarRequest {
    private String academicYear;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<CalendarEventResponse> events;
}

