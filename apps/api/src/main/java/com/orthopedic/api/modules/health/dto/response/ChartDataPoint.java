package com.orthopedic.api.modules.health.dto.response;

import lombok.Builder;
import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
public record ChartDataPoint(
        LocalDate date,
        BigDecimal value) {
}
