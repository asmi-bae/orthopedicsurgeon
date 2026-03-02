package com.orthopedic.api.modules.patient.entity;

import com.orthopedic.api.shared.base.BaseEntity;
import jakarta.persistence.*;
@Entity
@Table(name = "patient_allergies")
public class PatientAllergy extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @Column(nullable = false)
    private String allergy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Severity severity;

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public String getAllergy() {
        return allergy;
    }

    public void setAllergy(String allergy) {
        this.allergy = allergy;
    }

    public Severity getSeverity() {
        return severity;
    }

    public void setSeverity(Severity severity) {
        this.severity = severity;
    }

    public enum Severity {
        MILD, MODERATE, SEVERE
    }
}
