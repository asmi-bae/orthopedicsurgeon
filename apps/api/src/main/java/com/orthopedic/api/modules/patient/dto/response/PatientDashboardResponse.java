package com.orthopedic.api.modules.patient.dto.response;

import com.orthopedic.api.modules.health.dto.response.VitalSignsResponse;
import lombok.Builder;
import java.time.LocalDate;
import java.util.List;

@Builder
public record PatientDashboardResponse(
        List<Object> upcomingAppointments, // Would be AppointmentSummary
        long activePrescriptions,
        long pendingPayments,
        long unreadNotifications,
        LocalDate lastVisitDate,
        Object nextAppointment, // Would be AppointmentSummary
        List<Object> recentLabReports, // Would be LabReportSummary
        VitalSignsResponse latestVitals) {
}
