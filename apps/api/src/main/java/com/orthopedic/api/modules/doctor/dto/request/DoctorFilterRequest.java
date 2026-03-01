package com.orthopedic.api.modules.doctor.dto.request;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
public class DoctorFilterRequest {
    private String specialization;
    private UUID hospitalId;
    private String city;
    private Boolean availableForOnline;
    private BigDecimal minFee;
    private BigDecimal maxFee;
    private LocalDate availableOnDate;
}
