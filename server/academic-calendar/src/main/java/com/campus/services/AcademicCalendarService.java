package com.campus.services;

import com.campus.dtos.AcademicCalendarRequest;
import com.campus.dtos.AcademicCalendarResponse;
import com.campus.dtos.CalendarEventRequest;
import com.campus.dtos.CalendarEventResponse;

import java.util.List;

public interface AcademicCalendarService {

    AcademicCalendarResponse createCalendar(
            AcademicCalendarRequest request);

    AcademicCalendarResponse getByYear(String academicYear);

    List<CalendarEventResponse> getEvents(String academicYear);

    CalendarEventResponse addEvent(
            String academicYear,
            CalendarEventRequest request);
}

