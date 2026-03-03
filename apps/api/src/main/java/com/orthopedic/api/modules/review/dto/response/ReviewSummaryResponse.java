package com.orthopedic.api.modules.review.dto.response;

import lombok.Builder;
import java.util.Map;

@Builder
public record ReviewSummaryResponse(
        double averageRating,
        long totalReviews,
        Map<Integer, Long> ratingBreakdown) {
}
