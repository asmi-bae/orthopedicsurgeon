package com.orthopedic.api.modules.doctor.dto.response;

import com.orthopedic.api.modules.doctor.entity.Doctor.DoctorStatus;
import lombok.Builder;
import java.math.BigDecimal;
import java.util.UUID;

@Builder
public record DoctorPublicResponse(
        UUID id,
        String fullName,
        String specialization,
        String photoUrl,
        String bio,
        String hospitalName,
        String city,
        BigDecimal consultationFee,
        int experienceYears,
        boolean availableForOnline,
        double averageRating,
        int totalReviews,
        int totalAppointments,
        String nextAvailableSlot,
        DoctorStatus status) {
}
