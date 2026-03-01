package com.orthopedic.api.modules.appointment.dto.response;

import com.orthopedic.api.modules.appointment.entity.Appointment;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
public class AppointmentSummaryResponse {
    private UUID id;
    private LocalDate appointmentDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Appointment.AppointmentStatus status;
    private Appointment.AppointmentType type;
    private String doctorName;
    private String patientName;
    private String serviceName;
}
