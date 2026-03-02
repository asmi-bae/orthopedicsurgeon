package com.orthopedic.api.modules.hospital.dto.response;

import com.orthopedic.api.modules.hospital.entity.Hospital;
import java.time.LocalDateTime;
import java.util.UUID;

public class HospitalResponse {
    private UUID id;
    private String name;
    private String address;
    private String city;
    private String phone;
    private String email;
    private String licenseNumber;
    private Hospital.HospitalStatus status;
    private LocalDateTime createdAt;
    private int doctorCount;
    private int serviceCount;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

    public Hospital.HospitalStatus getStatus() { return status; }
    public void setStatus(Hospital.HospitalStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public int getDoctorCount() { return doctorCount; }
    public void setDoctorCount(int doctorCount) { this.doctorCount = doctorCount; }

    public int getServiceCount() { return serviceCount; }
    public void setServiceCount(int serviceCount) { this.serviceCount = serviceCount; }
}
