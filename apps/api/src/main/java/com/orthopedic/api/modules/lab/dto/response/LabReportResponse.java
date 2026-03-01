package com.orthopedic.api.modules.lab.dto.response;

import com.orthopedic.api.modules.lab.entity.LabReport;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
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

    @Data
    public static class PatientSummary {
        private UUID id;
        private String fullName;
    }

    @Data
    public static class DoctorSummary {
        private UUID id;
        private String fullName;
        private String specialization;
    }
}
