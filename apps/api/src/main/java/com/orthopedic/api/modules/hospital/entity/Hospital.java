package com.orthopedic.api.modules.hospital.entity;

import com.orthopedic.api.shared.base.BaseEntity;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "hospitals", indexes = {
        @Index(name = "idx_hospitals_status", columnList = "status"),
        @Index(name = "idx_hospitals_city", columnList = "city"),
        @Index(name = "idx_hospitals_deleted", columnList = "deleted")
}, uniqueConstraints = {
        @UniqueConstraint(name = "unique_single_hospital", columnNames = { "single_hospital_key" })
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

    @Column(name = "single_hospital_key", nullable = false, updatable = false)
    private Integer singleHospitalKey = 1;

    public Integer getSingleHospitalKey() {
        return singleHospitalKey;
    }

    public void setSingleHospitalKey(Integer singleHospitalKey) {
        this.singleHospitalKey = singleHospitalKey;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public HospitalStatus getStatus() {
        return status;
    }

    public void setStatus(HospitalStatus status) {
        this.status = status;
    }

    public List<ServiceEntity> getServices() {
        return services;
    }

    public void setServices(List<ServiceEntity> services) {
        this.services = services;
    }

    public enum HospitalStatus {
        ACTIVE, INACTIVE, SUSPENDED
    }
}
