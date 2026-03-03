package com.orthopedic.api.modules.website.dto.response;

import lombok.Builder;

@Builder
public record HomeStatsResponse(
        long totalDoctors,
        long totalPatients,
        long totalAppointments,
        long totalServices,
        String yearsExperience,
        String successRate) {
}
