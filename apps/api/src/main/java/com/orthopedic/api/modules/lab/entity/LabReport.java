package com.orthopedic.api.modules.lab.entity;

import com.orthopedic.api.modules.appointment.entity.Appointment;
import com.orthopedic.api.modules.doctor.entity.Doctor;
import com.orthopedic.api.modules.patient.entity.Patient;
import com.orthopedic.api.shared.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
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

    public enum LabTestType {
        X_RAY, MRI, CT_SCAN, BLOOD_TEST, URINE_TEST, BIOPSY, OTHER
    }

    public enum LabReportStatus {
        PENDING, IN_PROGRESS, COMPLETED, CANCELLED
    }
}
