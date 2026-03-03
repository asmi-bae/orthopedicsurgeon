package com.orthopedic.api.modules.blog.dto.response;

import lombok.experimental.SuperBuilder;
import lombok.Getter;
import java.util.List;

@SuperBuilder
@Getter
public class BlogPostResponse extends BlogPostSummaryResponse {
    private String content;
    private List<BlogTagResponse> tags;
    private String metaTitle;
    private String metaDescription;
    private String metaKeywords;
    private List<BlogPostSummaryResponse> relatedPosts;
}
