package com.orthopedic.api.modules.blog.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import java.util.List;
import java.util.UUID;

@Builder
public record CreateBlogPostRequest(
        @NotBlank @Size(max = 300) String title,
        @Size(max = 500) String excerpt,
        @NotBlank String content,
        String featuredImageUrl,
        String slug,
        UUID categoryId,
        List<String> tagNames,
        boolean isFeatured,
        String metaTitle,
        String metaDescription,
        String metaKeywords) {
}
