package com.orthopedic.api.modules.blog.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import java.util.UUID;

@Builder
public record AddCommentRequest(
        @NotBlank @Size(min = 3, max = 2000) String content,
        UUID parentCommentId,
        String guestName,
        String guestEmail) {
}
