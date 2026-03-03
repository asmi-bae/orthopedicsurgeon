package com.orthopedic.api.modules.health.dto.response;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class PatientDashboardResponse {
    private List<Object> upcomingAppointments;
    private Long activePrescriptions;
    private Long pendingPayments;
    private Long unreadNotifications;
    private LocalDate lastVisitDate;
    private Object nextAppointment;
    private List<Object> recentLabReports;
    private VitalSignsResponse latestVitals;
}
