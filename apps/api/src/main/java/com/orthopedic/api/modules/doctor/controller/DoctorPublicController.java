package com.orthopedic.api.modules.doctor.controller;

import com.orthopedic.api.modules.doctor.dto.response.DoctorPublicResponse;
import com.orthopedic.api.modules.review.service.impl.ReviewServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/public/doctors")
@RequiredArgsConstructor
@Tag(name = "Public Doctor", description = "Public endpoints for doctors")
public class DoctorPublicController {

    private final ReviewServiceImpl reviewService;

    @GetMapping("/{id}")
    @Operation(summary = "Get doctor public profile")
    public ResponseEntity<DoctorPublicResponse> getDoctor(@PathVariable UUID id) {
        // Dummy response for compilation
        return ResponseEntity.ok(DoctorPublicResponse.builder().id(id).build());
    }

    @GetMapping("/{id}/reviews/summary")
    @Operation(summary = "Get doctor review summary")
    public ResponseEntity<?> getDoctorReviewSummary(@PathVariable UUID id) {
        return ResponseEntity.ok(reviewService.getDoctorReviewSummary(id));
    }
}
