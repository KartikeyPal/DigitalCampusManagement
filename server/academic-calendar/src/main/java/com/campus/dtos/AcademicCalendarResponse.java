package com.campus.dtos;

import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AcademicCalendarResponse {

    private UUID id;
    private String academicYear;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<CalendarEventResponse> events;
}

