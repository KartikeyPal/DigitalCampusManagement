package com.auth.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class AcademicCalendarResponse {

    private String academicYear;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<CalendarEventResponse> events;
}

