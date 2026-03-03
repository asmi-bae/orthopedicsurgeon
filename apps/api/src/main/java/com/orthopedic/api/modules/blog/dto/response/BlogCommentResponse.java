package com.orthopedic.api.modules.blog.dto.response;

import lombok.Builder;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Builder
public record BlogCommentResponse(
        UUID id,
        String content,
        String authorName,
        String authorAvatar,
        boolean isVerified,
        LocalDateTime createdAt,
        List<BlogCommentResponse> replies) {
}
