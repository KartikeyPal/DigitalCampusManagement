package com.campus.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AcademicCalendarRequest {

    @NotBlank
    private String academicYear;

    private LocalDate startDate;
    private LocalDate endDate;
}

