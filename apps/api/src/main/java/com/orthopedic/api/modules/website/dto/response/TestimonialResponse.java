package com.orthopedic.api.modules.website.dto.response;

import lombok.Builder;
import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record TestimonialResponse(
        UUID id,
        String patientName,
        String patientAvatar,
        String content,
        int rating,
        boolean isVerified,
        boolean isFeatured,
        String doctorName,
        LocalDateTime createdAt) {
}
