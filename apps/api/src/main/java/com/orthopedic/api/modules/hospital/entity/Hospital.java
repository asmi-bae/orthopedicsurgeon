package com.orthopedic.api.modules.hospital.entity;

import com.orthopedic.api.shared.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "hospitals", indexes = {
    @Index(name = "idx_hospitals_status", columnList = "status"),
    @Index(name = "idx_hospitals_city", columnList = "city")
})
public class Hospital extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false, length = 20)
    private String phone;

    private String email;

    @Column(nullable = false, unique = true, length = 50)
    private String licenseNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private HospitalStatus status = HospitalStatus.ACTIVE;

    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ServiceEntity> services = new ArrayList<>();

    public enum HospitalStatus {
        ACTIVE, INACTIVE, SUSPENDED
    }
}
