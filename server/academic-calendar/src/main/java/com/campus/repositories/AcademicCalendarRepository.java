package com.campus.repositories;

import com.campus.entities.AcademicCalendar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AcademicCalendarRepository extends JpaRepository<AcademicCalendar, UUID> {

    Optional<AcademicCalendar> findByAcademicYear(String academicYear);
}


