package com.orthopedic.api.modules.health.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Builder;
import java.math.BigDecimal;
import java.util.UUID;

@Builder
public record RecordVitalsRequest(
        UUID appointmentId,
        @Min(60) @Max(250) Integer bloodPressureSystolic,
        @Min(40) @Max(150) Integer bloodPressureDiastolic,
        @Min(30) @Max(250) Integer heartRate,
        @DecimalMin("35.0") @DecimalMax("42.0") BigDecimal temperature,
        @DecimalMin("1.0") @DecimalMax("500.0") BigDecimal weight,
        @DecimalMin("50.0") @DecimalMax("250.0") BigDecimal height,
        @Min(50) @Max(100) Integer oxygenSaturation,
        String notes) {
}
