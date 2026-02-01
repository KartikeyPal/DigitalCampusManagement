package com.auth.controllers;

import com.auth.dtos.AcademicCalendarRequest;
import com.auth.dtos.AcademicCalendarResponse;
import com.auth.dtos.CalendarEventRequest;
import com.auth.services.impl.CampusCalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/campus/calendar")
@RequiredArgsConstructor
public class CampusCalendarController {

    private final CampusCalendarService service;

    // ✅ CREATE ACADEMIC YEAR
    @PostMapping
    public AcademicCalendarResponse createCalendar(
            @RequestBody AcademicCalendarRequest request) {
        return service.createCalendar(request);
    }

    @GetMapping("/{year}")
    public AcademicCalendarResponse viewCalendar(@PathVariable String year) {
        return service.getCalendar(year);
    }

    @GetMapping("/years")
    @PreAuthorize("hasAnyRole('ADMIN','STUDENT','FACULTY')")
    public List<String> getAllYears() {
        return service.getAllYears();
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{year}/events")
    public AcademicCalendarResponse addEvent(@PathVariable String year,
            @RequestBody CalendarEventRequest request) {
        return service.addEvent(year, request);
    }

    @DeleteMapping("/{year}/events/{eventId}")
    @PreAuthorize("hasRole('ADMIN')")
    public AcademicCalendarResponse deleteEvent(@PathVariable String year, @PathVariable UUID eventId) {

        return service.deleteEvent(year, eventId);
    }

    @DeleteMapping("/{year}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCalendar(@PathVariable String year) {
        service.deleteCalendar(year);
    }
}

