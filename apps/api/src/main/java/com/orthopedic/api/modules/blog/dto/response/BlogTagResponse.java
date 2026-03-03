package com.orthopedic.api.modules.blog.dto.response;

import lombok.Builder;
import java.util.UUID;

@Builder
public record BlogTagResponse(
        UUID id,
        String name,
        String slug) {
}
