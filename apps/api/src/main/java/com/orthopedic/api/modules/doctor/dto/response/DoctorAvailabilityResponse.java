package com.orthopedic.api.modules.doctor.dto.response;

import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Data
public class DoctorAvailabilityResponse {
    private DayOfWeek dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
    private Boolean isAvailable;
    private Integer maxAppointmentsPerSlot;
    private Integer availableSlots;
}
