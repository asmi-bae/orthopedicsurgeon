package com.orthopedic.api.modules.website.dto.response;

import lombok.Builder;
import java.util.UUID;

@Builder
public record FaqResponse(
        UUID id,
        String question,
        String answer,
        String category,
        int displayOrder) {
}
