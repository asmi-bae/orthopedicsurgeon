package com.orthopedic.api.modules.appointment.dto.request;

import com.orthopedic.api.modules.appointment.entity.Appointment;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
public class BookAppointmentRequest {
    @NotNull(message = "Doctor ID is required")
    private UUID doctorId;

    @NotNull(message = "Service ID is required")
    private UUID serviceId;

    @NotNull(message = "Appointment date is required")
    @FutureOrPresent(message = "Appointment date must be today or in the future")
    private LocalDate appointmentDate;

    @NotNull(message = "Start time is required")
    private LocalTime startTime;

    @NotNull(message = "Appointment type is required")
    private Appointment.AppointmentType type;

    @NotBlank(message = "Chief complaint is required")
    private String chiefComplaint;

    private UUID patientId; // Required if booked by staff/admin
}
