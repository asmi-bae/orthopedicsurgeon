package com.orthopedic.api.modules.hospital.dto.request;

import com.orthopedic.api.modules.hospital.entity.Hospital;
import lombok.Data;

@Data
public class UpdateHospitalRequest {
    private String name;
    private String address;
    private String city;
    private String phone;
    private String email;
    private Hospital.HospitalStatus status;
}
