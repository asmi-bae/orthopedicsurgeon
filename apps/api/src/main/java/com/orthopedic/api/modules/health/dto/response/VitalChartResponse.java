package com.orthopedic.api.modules.health.dto.response;

import java.util.List;
import lombok.Builder;

@Builder
public record VitalChartResponse(
        String metric,
        String period,
        List<ChartDataPoint> dataPoints) {
}
