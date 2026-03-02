package com.orthopedic.api.modules.lab.dto.response;

import com.orthopedic.api.modules.lab.entity.LabReport;

import java.time.LocalDateTime;
import java.util.UUID;

public class LabReportResponse {
    private UUID id;
    private UUID appointmentId;
    private PatientSummary patient;
    private DoctorSummary doctor;
    private String testName;
    private LabReport.LabTestType testType;
    private String description;
    private String resultSummary;
    private String filePath;
    private LabReport.LabReportStatus status;
    private LocalDateTime reportDate;
    private LocalDateTime createdAt;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getAppointmentId() { return appointmentId; }
    public void setAppointmentId(UUID appointmentId) { this.appointmentId = appointmentId; }

    public PatientSummary getPatient() { return patient; }
    public void setPatient(PatientSummary patient) { this.patient = patient; }

    public DoctorSummary getDoctor() { return doctor; }
    public void setDoctor(DoctorSummary doctor) { this.doctor = doctor; }

    public String getTestName() { return testName; }
    public void setTestName(String testName) { this.testName = testName; }

    public LabReport.LabTestType getTestType() { return testType; }
    public void setTestType(LabReport.LabTestType testType) { this.testType = testType; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getResultSummary() { return resultSummary; }
    public void setResultSummary(String resultSummary) { this.resultSummary = resultSummary; }

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }

    public LabReport.LabReportStatus getStatus() { return status; }
    public void setStatus(LabReport.LabReportStatus status) { this.status = status; }

    public LocalDateTime getReportDate() { return reportDate; }
    public void setReportDate(LocalDateTime reportDate) { this.reportDate = reportDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static class PatientSummary {
        private UUID id;
        private String fullName;

        public UUID getId() { return id; }
        public void setId(UUID id) { this.id = id; }

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
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
}
