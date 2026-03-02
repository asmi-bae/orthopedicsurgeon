package com.orthopedic.api.modules.prescription.dto.response;

import com.orthopedic.api.modules.prescription.entity.Prescription;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

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

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getAppointmentId() { return appointmentId; }
    public void setAppointmentId(UUID appointmentId) { this.appointmentId = appointmentId; }

    public PatientSummary getPatient() { return patient; }
    public void setPatient(PatientSummary patient) { this.patient = patient; }

    public DoctorSummary getDoctor() { return doctor; }
    public void setDoctor(DoctorSummary doctor) { this.doctor = doctor; }

    public String getDiagnosis() { return diagnosis; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }

    public String getSymptoms() { return symptoms; }
    public void setSymptoms(String symptoms) { this.symptoms = symptoms; }

    public String getPhysicalExamination() { return physicalExamination; }
    public void setPhysicalExamination(String physicalExamination) { this.physicalExamination = physicalExamination; }

    public String getAdvice() { return advice; }
    public void setAdvice(String advice) { this.advice = advice; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public List<MedicineResponse> getMedicines() { return medicines; }
    public void setMedicines(List<MedicineResponse> medicines) { this.medicines = medicines; }

    public Prescription.PrescriptionStatus getStatus() { return status; }
    public void setStatus(Prescription.PrescriptionStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

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
        private String hospitalName;

        public UUID getId() { return id; }
        public void setId(UUID id) { this.id = id; }

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }

        public String getSpecialization() { return specialization; }
        public void setSpecialization(String specialization) { this.specialization = specialization; }

        public String getHospitalName() { return hospitalName; }
        public void setHospitalName(String hospitalName) { this.hospitalName = hospitalName; }
    }

    public static class MedicineResponse {
        private String medicineName;
        private String dosage;
        private String frequency;
        private String duration;
        private String instructions;

        public String getMedicineName() { return medicineName; }
        public void setMedicineName(String medicineName) { this.medicineName = medicineName; }

        public String getDosage() { return dosage; }
        public void setDosage(String dosage) { this.dosage = dosage; }

        public String getFrequency() { return frequency; }
        public void setFrequency(String frequency) { this.frequency = frequency; }

        public String getDuration() { return duration; }
        public void setDuration(String duration) { this.duration = duration; }

        public String getInstructions() { return instructions; }
        public void setInstructions(String instructions) { this.instructions = instructions; }
    }
}
