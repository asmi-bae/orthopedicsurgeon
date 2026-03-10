package com.orthopedic.api.modules.doctor.controller;

import com.orthopedic.api.modules.doctor.dto.request.DoctorFilterRequest;
import com.orthopedic.api.modules.doctor.dto.response.DoctorResponse;
import com.orthopedic.api.modules.doctor.dto.response.DoctorSummaryResponse;
import com.orthopedic.api.modules.doctor.service.DoctorService;
import com.orthopedic.api.modules.review.service.impl.ReviewServiceImpl;
import com.orthopedic.api.shared.dto.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/doctors")
@RequiredArgsConstructor
@Tag(name = "Public Doctor", description = "Public endpoints for doctors")
public class DoctorPublicController {

    private final DoctorService doctorService;
    private final ReviewServiceImpl reviewService;

    @GetMapping
    @Operation(summary = "Search and filter doctors")
    public ResponseEntity<PageResponse<DoctorSummaryResponse>> getAllDoctors(
            @ModelAttribute DoctorFilterRequest filters,
            Pageable pageable) {
        return ResponseEntity.ok(doctorService.getAllDoctors(filters, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get doctor public profile")
    public ResponseEntity<DoctorResponse> getDoctor(@PathVariable UUID id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }

    @GetMapping("/{id}/available-slots")
    @Operation(summary = "Get available appointment slots for a doctor")
    public ResponseEntity<List<LocalTime>> getAvailableSlots(
            @PathVariable UUID id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(doctorService.getAvailableSlots(id, date));
    }

    @GetMapping("/{id}/reviews/summary")
    @Operation(summary = "Get doctor review summary")
    public ResponseEntity<?> getDoctorReviewSummary(@PathVariable UUID id) {
        return ResponseEntity.ok(reviewService.getDoctorReviewSummary(id));
    }
}
