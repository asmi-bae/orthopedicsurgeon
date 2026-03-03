package com.orthopedic.api.modules.blog.dto.response;

import com.orthopedic.api.modules.blog.entity.BlogPost.BlogPostStatus;
import lombok.experimental.SuperBuilder;
import lombok.Getter;
import java.time.LocalDateTime;
import java.util.UUID;

@SuperBuilder
@Getter
public class BlogPostSummaryResponse {
    private UUID id;
    private String title;
    private String slug;
    private String excerpt;
    private String featuredImageUrl;
    private String authorName;
    private String authorAvatar;
    private String categoryName;
    private String categorySlug;
    private BlogPostStatus status;
    private boolean isFeatured;
    private int viewCount;
    private int readTimeMinutes;
    private int commentsCount;
    private LocalDateTime publishedAt;
}
