package com.orthopedic.api.modules.hospital.dto.response;

import com.orthopedic.api.modules.hospital.entity.Hospital;
import lombok.Data;

import java.util.UUID;

@Data
public class HospitalSummaryResponse {
    private UUID id;
    private String name;
    private String city;
    private Hospital.HospitalStatus status;
}
