package com.orthopedic.api.modules.website.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record CreateHeroSlideRequest(
        @NotBlank String title,
        String subtitle,
        String description,
        String imageUrl,
        String buttonText,
        String buttonLink,
        @Min(0) int displayOrder,
        boolean isActive) {
}
