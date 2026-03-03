package com.orthopedic.api.modules.review.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import java.util.UUID;

@Builder
public record CreateReviewRequest(
        @NotNull UUID doctorId,
        @NotNull UUID appointmentId,
        @NotNull @Min(1) @Max(5) Integer rating,
        @Size(max = 1000) String reviewText) {
}
