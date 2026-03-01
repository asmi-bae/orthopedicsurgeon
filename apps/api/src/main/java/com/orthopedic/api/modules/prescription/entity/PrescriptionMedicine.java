package com.orthopedic.api.modules.prescription.entity;

import com.orthopedic.api.shared.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "prescription_medicines")
public class PrescriptionMedicine extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id", nullable = false)
    private Prescription prescription;

    @Column(nullable = false)
    private String medicineName;

    @Column(nullable = false)
    private String dosage; // e.g., 500mg

    @Column(nullable = false)
    private String frequency; // e.g., 1-0-1

    @Column(nullable = false)
    private String duration; // e.g., 7 days

    @Column(columnDefinition = "TEXT")
    private String instructions; // e.g., After food
}
