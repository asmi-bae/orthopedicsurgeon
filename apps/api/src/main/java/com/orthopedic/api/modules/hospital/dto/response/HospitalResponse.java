package com.orthopedic.api.modules.hospital.dto.response;

import com.orthopedic.api.modules.hospital.entity.Hospital;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
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
}
