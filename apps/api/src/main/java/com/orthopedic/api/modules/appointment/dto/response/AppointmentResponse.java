package com.orthopedic.api.modules.appointment.dto.response;

import com.orthopedic.api.modules.appointment.entity.Appointment;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

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

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public PatientSummary getPatient() { return patient; }
    public void setPatient(PatientSummary patient) { this.patient = patient; }

    public DoctorSummary getDoctor() { return doctor; }
    public void setDoctor(DoctorSummary doctor) { this.doctor = doctor; }

    public ServiceSummary getService() { return service; }
    public void setService(ServiceSummary service) { this.service = service; }

    public HospitalSummary getHospital() { return hospital; }
    public void setHospital(HospitalSummary hospital) { this.hospital = hospital; }

    public LocalDate getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(LocalDate appointmentDate) { this.appointmentDate = appointmentDate; }

    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }

    public Appointment.AppointmentStatus getStatus() { return status; }
    public void setStatus(Appointment.AppointmentStatus status) { this.status = status; }

    public Appointment.AppointmentType getType() { return type; }
    public void setType(Appointment.AppointmentType type) { this.type = type; }

    public String getChiefComplaint() { return chiefComplaint; }
    public void setChiefComplaint(String chiefComplaint) { this.chiefComplaint = chiefComplaint; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getCancellationReason() { return cancellationReason; }
    public void setCancellationReason(String cancellationReason) { this.cancellationReason = cancellationReason; }

    public static class PatientSummary {
        private UUID id;
        private String fullName;
        private String phone;

        public UUID getId() { return id; }
        public void setId(UUID id) { this.id = id; }

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }

        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
    }

    public static class DoctorSummary {
        private UUID id;
        private String fullName;
        private String specialization;

        public UUID getId() { return id; }
        public void setId(UUID id) { this.id = id; }

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }

        public String getSpecialization() { return specialization; }
        public void setSpecialization(String specialization) { this.specialization = specialization; }
    }

    public static class ServiceSummary {
        private UUID id;
        private String name;
        private Integer durationMinutes;

        public UUID getId() { return id; }
        public void setId(UUID id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public Integer getDurationMinutes() { return durationMinutes; }
        public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
    }

    public static class HospitalSummary {
        private UUID id;
        private String name;
        private String city;

        public UUID getId() { return id; }
        public void setId(UUID id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getCity() { return city; }
        public void setCity(String city) { this.city = city; }
    }
}
