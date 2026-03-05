package com.orthopedic.api.modules.admin.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuickStatsResponse {
    private long appointmentsToday;
    private long pendingPrescriptions;
    private long activeHospitals;
    private String openInvoicesAmount;
}
