package com.auth.services.impl;

import com.auth.client.AcademicCalendarClient;
import com.auth.dtos.AcademicCalendarResponse;
import com.auth.dtos.CalendarEventRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CampusCalendarService {

    private final AcademicCalendarClient calendarClient;

    public AcademicCalendarResponse getCalendar(String year) {
        return calendarClient.getCalendar(year);
    }

    public AcademicCalendarResponse addEvent(String year, CalendarEventRequest request) {
        return calendarClient.addEvent(year, request);
    }
}
