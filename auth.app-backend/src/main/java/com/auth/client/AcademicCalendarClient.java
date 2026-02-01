package com.auth.client;

import com.auth.dtos.AcademicCalendarRequest;
import com.auth.dtos.AcademicCalendarResponse;
import com.auth.dtos.CalendarEventRequest;
import com.auth.dtos.CalendarEventResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

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

    @PostMapping("/api/calendar/{year}/events")
    AcademicCalendarResponse addEvent(@PathVariable("year") String year,
                                      @RequestBody CalendarEventRequest request);
}

