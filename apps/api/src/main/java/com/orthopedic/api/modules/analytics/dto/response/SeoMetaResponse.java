package com.orthopedic.api.modules.analytics.dto.response;

import lombok.Builder;

@Builder
public record SeoMetaResponse(
        String title,
        String description,
        String keywords,
        String ogTitle,
        String ogDescription,
        String ogImage,
        String twitterTitle,
        String twitterDescription,
        String canonicalUrl,
        String structuredDataJson) {
}
