package com.orthopedic.api.modules.appointment.dto.response;

import com.orthopedic.api.modules.appointment.entity.Appointment;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
public class AppointmentResponse {
    private UUID id;
    private PatientSummary patient;
    private DoctorSummary doctor;
    private ServiceSummary service;
    private HospitalSummary hospital;
    private LocalDate appointmentDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Appointment.AppointmentStatus status;
    private Appointment.AppointmentType type;
    private String chiefComplaint;
    private String notes;
    private String cancellationReason;

    @Data
    public static class PatientSummary {
        private UUID id;
        private String fullName;
        private String phone;
    }

    @Data
    public static class DoctorSummary {
        private UUID id;
        private String fullName;
        private String specialization;
    }

    @Data
    public static class ServiceSummary {
        private UUID id;
        private String name;
        private Integer durationMinutes;
    }

    @Data
    public static class HospitalSummary {
        private UUID id;
        private String name;
        private String city;
    }
}
