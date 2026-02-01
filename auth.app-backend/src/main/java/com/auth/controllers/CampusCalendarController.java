package com.auth.controllers;

import com.auth.dtos.AcademicCalendarResponse;
import com.auth.dtos.CalendarEventRequest;
import com.auth.services.impl.CampusCalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/campus/calendar")
@RequiredArgsConstructor
public class CampusCalendarController {

    private final CampusCalendarService service;

    @GetMapping("/{year}")
    public AcademicCalendarResponse viewCalendar(@PathVariable String year) {
        return service.getCalendar(year);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{year}/events")
    public AcademicCalendarResponse addEvent(@PathVariable String year,
            @RequestBody CalendarEventRequest request) {
        return service.addEvent(year, request);
    }
}

