package com.orthopedic.api.modules.analytics.service.impl;

import com.orthopedic.api.modules.analytics.dto.response.SearchResultResponse;
import com.orthopedic.api.modules.analytics.entity.SearchLog;
import com.orthopedic.api.modules.analytics.repository.SearchLogRepository;
import com.orthopedic.api.modules.blog.dto.response.BlogPostSummaryResponse;
import com.orthopedic.api.modules.blog.entity.BlogPost.BlogPostStatus;
import com.orthopedic.api.modules.blog.repository.BlogPostRepository;
import com.orthopedic.api.modules.doctor.dto.response.DoctorPublicResponse;
import com.orthopedic.api.modules.doctor.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl {

        private final DoctorRepository doctorRepository;
        private final BlogPostRepository blogPostRepository;
        private final SearchLogRepository searchLogRepository;

        public SearchResultResponse search(String query, String type, String ipAddress) {
                List<DoctorPublicResponse> doctors = List.of();
                List<BlogPostSummaryResponse> posts = List.of();
                int total = 0;

                if (type == null || type.equals("all") || type.equals("doctors")) {
                        // Simulated search
                        total += doctorRepository.count();
                        doctors = doctorRepository.findAll(PageRequest.of(0, 5)).getContent().stream()
                                        .map(d -> DoctorPublicResponse.builder()
                                                        .id(d.getId())
                                                        .fullName(d.getUser().getFirstName() + " "
                                                                        + d.getUser().getLastName())
                                                        .specialization(d.getSpecialization())
                                                        .build())
                                        .toList();
                }

                if (type == null || type.equals("all") || type.equals("blog")) {
                        List<com.orthopedic.api.modules.blog.entity.BlogPost> blogPosts = blogPostRepository
                                        .findTop5ByStatusOrderByViewCountDesc(BlogPostStatus.PUBLISHED);
                        posts = blogPosts.stream()
                                        .map(p -> (BlogPostSummaryResponse) BlogPostSummaryResponse.builder()
                                                        .id(p.getId())
                                                        .title(p.getTitle())
                                                        .slug(p.getSlug())
                                                        .excerpt(p.getExcerpt())
                                                        .build())
                                        .toList();
                        total += posts.size();
                }

                logSearchAsync(query, type, total, ipAddress);

                return SearchResultResponse.builder()
                                .query(query)
                                .type(type)
                                .totalResults(total)
                                .doctors(doctors)
                                .services(List.of())
                                .blogPosts(posts)
                                .build();
        }

        @Async
        public void logSearchAsync(String query, String type, int resultCount, String ipAddress) {
                SearchLog log = SearchLog.builder()
                                .query(query)
                                .resultCount(resultCount)
                                .ipAddress(ipAddress)
                                .filters(type != null ? java.util.Map.of("type", type) : null)
                                .build();
                searchLogRepository.save(log);
        }
}
