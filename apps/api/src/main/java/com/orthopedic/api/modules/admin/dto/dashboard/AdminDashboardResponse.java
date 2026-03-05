package com.orthopedic.api.modules.admin.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponse {
    private DashboardStatsResponse stats;
    private List<LiveAppointmentResponse> liveAppointments;
    private List<TopHospitalResponse> topHospitals;
    private QuickStatsResponse quickStats;
}
