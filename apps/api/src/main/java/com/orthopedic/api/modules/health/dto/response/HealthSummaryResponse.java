package com.orthopedic.api.modules.health.dto.response;

import java.util.List;
import lombok.Builder;

// Using Object for some of the related objects as their full models aren't provided but implied
@Builder
public record HealthSummaryResponse(
        List<String> activeConditions,
        List<String> allergies,
        List<Object> currentMedications, // Would be PrescriptionSummary
        VitalSignsResponse latestVitals,
        List<Object> upcomingAppointments, // Would be AppointmentSummary
        String bloodGroup,
        int age) {
}
