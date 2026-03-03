package com.orthopedic.api.modules.health.dto.response;

import lombok.Builder;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record VitalSignsResponse(
        UUID id,
        Integer systolic,
        Integer diastolic,
        Integer heartRate,
        BigDecimal temperature,
        BigDecimal weight,
        BigDecimal height,
        BigDecimal bmi,
        Integer oxygenSaturation,
        String notes,
        LocalDateTime recordedAt,
        String recordedByName) {
}
