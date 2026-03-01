package com.orthopedic.api.modules.hospital.entity;

import com.orthopedic.api.shared.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "services", indexes = {
    @Index(name = "idx_services_hospital_id", columnList = "hospital_id"),
    @Index(name = "idx_services_category", columnList = "category")
})
public class ServiceEntity extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Integer durationMinutes;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceCategory category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceStatus status = ServiceStatus.ACTIVE;

    public enum ServiceCategory {
        CONSULTATION, DIAGNOSTIC, SURGICAL, PHYSIOTHERAPY, RADIOLOGY, EMERGENCY
    }

    public enum ServiceStatus {
        ACTIVE, INACTIVE
    }
}
