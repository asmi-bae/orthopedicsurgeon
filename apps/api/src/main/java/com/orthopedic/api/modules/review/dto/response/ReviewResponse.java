package com.orthopedic.api.modules.review.dto.response;

import lombok.Builder;
import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record ReviewResponse(
        UUID id,
        String patientDisplayName,
        int rating,
        String reviewText,
        boolean isVerified,
        boolean isPublished,
        LocalDateTime createdAt) {
}
