package com.orthopedic.api.modules.patient.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class PatientMedicalHistoryResponse {
    private PatientResponse patient;
    private List<AppointmentSummary> appointments;
    private List<PrescriptionSummary> prescriptions;
    private List<LabReportSummary> labReports;

    @Data
    public static class AppointmentSummary {
        private String date;
        private String doctorName;
        private String service;
        private String status;
    }

    @Data
    public static class PrescriptionSummary {
        private String date;
        private String doctorName;
        private String diagnosis;
        private int medicineCount;
    }

    @Data
    public static class LabReportSummary {
        private String date;
        private String type;
        private String name;
        private String status;
    }
}
