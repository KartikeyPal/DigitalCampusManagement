package com.auth.client;

import com.auth.dtos.AcademicCalendarRequest;
import com.auth.dtos.AcademicCalendarResponse;
import com.auth.dtos.CalendarEventRequest;
import com.auth.dtos.CalendarEventResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@FeignClient(
        name = "academic-calendar-service",
        url = "${calendar.service.url}"
)
public interface AcademicCalendarClient {

    // ✅ CREATE YEAR
    @PostMapping("/api/calendar")
    AcademicCalendarResponse createCalendar(
            @RequestBody AcademicCalendarRequest request
    );

    @GetMapping("/api/calendar/{year}")
    AcademicCalendarResponse getCalendar(@PathVariable("year") String year);

    @GetMapping("/api/calendar/years")
    List<String> getAllYears();

    @PostMapping("/api/calendar/{year}/events")
    AcademicCalendarResponse addEvent(@PathVariable("year") String year,
                                      @RequestBody CalendarEventRequest request);

    @DeleteMapping("/api/calendar/{year}/events/{eventId}")
    AcademicCalendarResponse deleteEvent(@PathVariable String year, @PathVariable UUID eventId);

    @DeleteMapping("/api/calendar/{year}")
    void deleteCalendar(@PathVariable String year);

}

