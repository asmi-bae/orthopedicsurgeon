package com.orthopedic.api.modules.prescription.dto.response;

import com.orthopedic.api.modules.prescription.entity.Prescription;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class PrescriptionResponse {
    private UUID id;
    private UUID appointmentId;
    private PatientSummary patient;
    private DoctorSummary doctor;
    private String diagnosis;
    private String symptoms;
    private String physicalExamination;
    private String advice;
    private String notes;
    private List<MedicineResponse> medicines;
    private Prescription.PrescriptionStatus status;
    private LocalDateTime createdAt;

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
        private String hospitalName;
    }

    @Data
    public static class MedicineResponse {
        private String medicineName;
        private String dosage;
        private String frequency;
        private String duration;
        private String instructions;
    }
}
