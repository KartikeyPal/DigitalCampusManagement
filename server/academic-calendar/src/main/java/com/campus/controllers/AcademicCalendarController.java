package com.campus.controllers;


import com.campus.dtos.AcademicCalendarRequest;
import com.campus.dtos.AcademicCalendarResponse;
import com.campus.dtos.CalendarEventRequest;
import com.campus.dtos.CalendarEventResponse;
import com.campus.entities.AcademicCalendar;
import com.campus.repositories.AcademicCalendarRepository;
import com.campus.services.AcademicCalendarService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class AcademicCalendarController {

    private final AcademicCalendarService service;

    @PostMapping
    public AcademicCalendarResponse create(@RequestBody @Valid AcademicCalendarRequest request) {
        return service.createCalendar(request);
    }

    @GetMapping("/{year}")
    public AcademicCalendarResponse getByYear(@PathVariable String year) {
        return service.getByYear(year);
    }

    @GetMapping("/{year}/events")
    public List<CalendarEventResponse> getEvents(@PathVariable String year) {
        return service.getEvents(year);
    }

    @PostMapping("/{year}/events")
    public CalendarEventResponse addEvent(@PathVariable String year,
                                          @RequestBody CalendarEventRequest request) {
        return service.addEvent(year, request);
    }
}


