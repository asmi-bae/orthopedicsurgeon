package com.orthopedic.api.modules.review.controller.doctor;

import com.orthopedic.api.modules.review.dto.response.ReviewResponse;
import com.orthopedic.api.modules.review.service.impl.ReviewServiceImpl;
import com.orthopedic.api.shared.base.BaseController;
import com.orthopedic.api.shared.dto.ApiResponse;
import com.orthopedic.api.shared.util.PageableUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/reviews")
@Tag(name = "Doctor Review Management", description = "Endpoints for doctors to view and moderate patient reviews")
@PreAuthorize("hasRole('DOCTOR_ADMIN')")
@RequiredArgsConstructor
public class DoctorReviewController extends BaseController {

    private final ReviewServiceImpl reviewService;

    @GetMapping
    @Operation(summary = "Get all reviews for doctor")
    public ResponseEntity<ApiResponse<com.orthopedic.api.shared.dto.PageResponse<ReviewResponse>>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "DESC") String direction) {

        Pageable pageable = PageableUtils.createPageable(page, size, sort, direction,
                Collections.singletonList("createdAt"));

        return ok(reviewService.getPendingReviews(pageable));
    }

    @PostMapping("/{id}/approve")
    @Operation(summary = "Approve a review")
    public ResponseEntity<ApiResponse<Void>> approve(@PathVariable UUID id) {
        reviewService.publishReview(id);
        return ok("Review approved", null);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a review")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        reviewService.deleteReview(id);
        return ok("Review deleted", null);
    }
}
