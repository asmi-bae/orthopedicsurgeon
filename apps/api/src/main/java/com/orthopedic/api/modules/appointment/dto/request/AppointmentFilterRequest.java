package com.orthopedic.api.modules.appointment.dto.request;

import com.orthopedic.api.modules.appointment.entity.Appointment;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class AppointmentFilterRequest {
    private UUID doctorId;
    private UUID patientId;
    private UUID hospitalId;
    private Appointment.AppointmentStatus status;
    private Appointment.AppointmentType type;
    private LocalDate dateFrom;
    private LocalDate dateTo;
    private String search;
}
