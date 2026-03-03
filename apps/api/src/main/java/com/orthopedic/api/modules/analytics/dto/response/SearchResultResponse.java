package com.orthopedic.api.modules.analytics.dto.response;

import com.orthopedic.api.modules.blog.dto.response.BlogPostSummaryResponse;
import com.orthopedic.api.modules.doctor.dto.response.DoctorPublicResponse;
import lombok.Builder;
import java.util.List;

@Builder
public record SearchResultResponse(
        String query,
        String type,
        int totalResults,
        List<DoctorPublicResponse> doctors,
        List<Object> services, // Would be ServiceResponse
        List<BlogPostSummaryResponse> blogPosts) {
}
