package com.orthopedic.api.modules.website.dto.response;

import lombok.Builder;
import java.util.UUID;

@Builder
public record HeroSlideResponse(
        UUID id,
        String title,
        String subtitle,
        String description,
        String imageUrl,
        String buttonText,
        String buttonLink,
        int displayOrder,
        boolean isActive) {
}
