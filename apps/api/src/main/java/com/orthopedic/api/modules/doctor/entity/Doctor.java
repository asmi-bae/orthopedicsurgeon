package com.orthopedic.api.modules.doctor.entity;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.modules.hospital.entity.Hospital;
import com.orthopedic.api.shared.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "doctors", indexes = {
    @Index(name = "idx_doctors_hospital_id", columnList = "hospital_id"),
    @Index(name = "idx_doctors_status", columnList = "status"),
    @Index(name = "idx_doctors_specialization", columnList = "specialization")
})
public class Doctor extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    @Column(nullable = false)
    private String specialization;

    @Column(nullable = false, unique = true, length = 50)
    private String licenseNumber;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(nullable = false)
    private Integer experienceYears;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal consultationFee;

    @Column(nullable = false)
    private Boolean availableForOnline = true;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DoctorStatus status = DoctorStatus.ACTIVE;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DoctorAvailability> availabilities = new ArrayList<>();

    public enum DoctorStatus {
        ACTIVE, INACTIVE, ON_LEAVE, SUSPENDED
    }
}
