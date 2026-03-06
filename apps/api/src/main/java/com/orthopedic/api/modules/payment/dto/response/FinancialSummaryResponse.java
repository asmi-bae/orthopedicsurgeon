package com.orthopedic.api.modules.payment.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class FinancialSummaryResponse {
    private BigDecimal totalRevenue;
    private BigDecimal monthlyRevenue;
    private long totalPayments;
    private long pendingPayments;
}
