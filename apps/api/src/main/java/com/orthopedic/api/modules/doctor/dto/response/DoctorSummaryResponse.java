package com.orthopedic.api.modules.doctor.dto.response;

import com.orthopedic.api.modules.doctor.entity.Doctor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class DoctorSummaryResponse {
    private UUID id;
    private String fullName;
    private String specialization;
    private String hospitalName;
    private BigDecimal consultationFee;
    private Boolean availableForOnline;
    private Doctor.DoctorStatus status;
}
