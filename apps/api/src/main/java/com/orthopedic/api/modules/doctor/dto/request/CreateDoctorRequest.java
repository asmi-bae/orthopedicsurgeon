package com.orthopedic.api.modules.doctor.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
public class CreateDoctorRequest {
    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Hospital ID is required")
    private UUID hospitalId;

    @NotBlank(message = "Specialization is required")
    private String specialization;

    @NotBlank(message = "License number is required")
    private String licenseNumber;

    private String bio;

    @NotNull(message = "Experience years is required")
    @Positive
    private Integer experienceYears;

    @NotNull(message = "Consultation fee is required")
    @Positive
    private BigDecimal consultationFee;

    private Boolean availableForOnline = true;

    private List<AvailabilityRequest> availabilities;
}
