package com.orthopedic.api.modules.lab.entity;

import com.orthopedic.api.modules.appointment.entity.Appointment;
import com.orthopedic.api.modules.doctor.entity.Doctor;
import com.orthopedic.api.modules.patient.entity.Patient;
import com.orthopedic.api.shared.base.BaseEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "lab_reports", indexes = {
        @Index(name = "idx_lab_reports_patient_id", columnList = "patient_id"),
        @Index(name = "idx_lab_reports_doctor_id", columnList = "doctor_id"),
        @Index(name = "idx_lab_reports_appointment_id", columnList = "appointment_id")
})
public class LabReport extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @Column(nullable = false)
    private String testName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LabTestType testType;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String resultSummary;

    @Column(columnDefinition = "TEXT")
    private String internalNotes;

    private String filePath; // Path to the uploaded document in storage

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LabReportStatus status = LabReportStatus.PENDING;

    private LocalDateTime reportDate;

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public LabTestType getTestType() {
        return testType;
    }

    public void setTestType(LabTestType testType) {
        this.testType = testType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getResultSummary() {
        return resultSummary;
    }

    public void setResultSummary(String resultSummary) {
        this.resultSummary = resultSummary;
    }

    public String getInternalNotes() {
        return internalNotes;
    }

    public void setInternalNotes(String internalNotes) {
        this.internalNotes = internalNotes;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public LabReportStatus getStatus() {
        return status;
    }

    public void setStatus(LabReportStatus status) {
        this.status = status;
    }

    public LocalDateTime getReportDate() {
        return reportDate;
    }

    public void setReportDate(LocalDateTime reportDate) {
        this.reportDate = reportDate;
    }

    public enum LabTestType {
        X_RAY, MRI, CT_SCAN, BLOOD_TEST, URINE_TEST, BIOPSY, OTHER
    }

    public enum LabReportStatus {
        PENDING, IN_PROGRESS, COMPLETED, CANCELLED
    }
}
