package com.campus.services.impl;

import com.campus.dtos.AcademicCalendarRequest;
import com.campus.dtos.AcademicCalendarResponse;
import com.campus.dtos.CalendarEventRequest;
import com.campus.dtos.CalendarEventResponse;
import com.campus.entities.AcademicCalendar;
import com.campus.entities.CalendarEvent;
import com.campus.repositories.AcademicCalendarRepository;
import com.campus.repositories.CalendarEventRepository;
import com.campus.services.AcademicCalendarService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AcademicCalendarServiceImpl implements AcademicCalendarService {

    private final AcademicCalendarRepository calendarRepository;
    private final CalendarEventRepository eventRepository;
    private final ModelMapper mapper;

    @Override
    public AcademicCalendarResponse createCalendar(AcademicCalendarRequest request) {

        AcademicCalendar calendar = mapper.map(request, AcademicCalendar.class);

        return mapper.map(calendarRepository.save(calendar), AcademicCalendarResponse.class);
    }

    @Override
    public AcademicCalendarResponse getByYear(String academicYear) {

        AcademicCalendar calendar = calendarRepository
                .findByAcademicYear(academicYear)
                .orElseThrow(() -> new RuntimeException("Calendar not found"));

        return mapper.map(calendar, AcademicCalendarResponse.class);
    }

    @Override
    public List<CalendarEventResponse> getEvents(String academicYear) {

        return eventRepository
                .findByCalendarAcademicYear(academicYear)
                .stream()
                .map(e -> mapper.map(e, CalendarEventResponse.class))
                .toList();
    }

    @Override
    public CalendarEventResponse addEvent(String academicYear, CalendarEventRequest request) {

        AcademicCalendar calendar = calendarRepository
                .findByAcademicYear(academicYear)
                .orElseThrow(() -> new RuntimeException("Calendar not found"));

        CalendarEvent event = mapper.map(request, CalendarEvent.class);

        event.setCalendar(calendar);

        return mapper.map(eventRepository.save(event), CalendarEventResponse.class);
    }
}

