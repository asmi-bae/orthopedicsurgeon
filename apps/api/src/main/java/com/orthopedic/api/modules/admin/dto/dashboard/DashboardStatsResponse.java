package com.orthopedic.api.modules.admin.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {
    private BigDecimal totalRevenue;
    private long medicalStaffCount;
    private long newPatientsCount;
    private String systemStatus;

    // Growth trends (placeholders for now)
    private String revenueTrend;
    private String staffTrend;
    private String patientTrend;
}
