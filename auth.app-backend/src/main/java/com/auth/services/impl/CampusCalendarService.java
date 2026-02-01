package com.auth.services.impl;

import com.auth.client.AcademicCalendarClient;
import com.auth.dtos.AcademicCalendarRequest;
import com.auth.dtos.AcademicCalendarResponse;
import com.auth.dtos.CalendarEventRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CampusCalendarService {

    private final AcademicCalendarClient calendarClient;

    // ✅ CREATE ACADEMIC YEAR
    public AcademicCalendarResponse createCalendar(
            AcademicCalendarRequest request) {
        return calendarClient.createCalendar(request);
    }

    public AcademicCalendarResponse getCalendar(String year) {
        return calendarClient.getCalendar(year);
    }

    public List<String> getAllYears() {
        return calendarClient.getAllYears();
    }

    public AcademicCalendarResponse addEvent(String year, CalendarEventRequest request) {
        return calendarClient.addEvent(year, request);
    }

    public AcademicCalendarResponse deleteEvent(String year, UUID eventId) {
        return calendarClient.deleteEvent(year, eventId);
    }

    public void deleteCalendar(String year) {
        calendarClient.deleteCalendar(year);
    }

}
