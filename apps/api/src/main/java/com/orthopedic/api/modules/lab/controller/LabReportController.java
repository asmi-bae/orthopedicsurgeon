package com.orthopedic.api.modules.lab.controller;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.modules.lab.dto.request.CreateLabReportRequest;
import com.orthopedic.api.modules.lab.dto.request.UpdateLabReportResultRequest;
import com.orthopedic.api.modules.lab.dto.response.LabReportResponse;
import com.orthopedic.api.modules.lab.service.LabReportService;
import com.orthopedic.api.rbac.annotation.CurrentUser;
import com.orthopedic.api.shared.base.BaseController;
import com.orthopedic.api.shared.dto.ApiResponse;
import com.orthopedic.api.shared.dto.PageResponse;
import com.orthopedic.api.shared.util.PageableUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/lab-reports")
@RequiredArgsConstructor
@Tag(name = "Lab Report Management", description = "Endpoints for managing diagnostic tests and reports")
public class LabReportController extends BaseController {

    private final LabReportService labReportService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'DOCTOR')")
    @Operation(summary = "Request a new lab test")
    public ResponseEntity<ApiResponse<LabReportResponse>> create(@Valid @RequestBody CreateLabReportRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Lab report request created", labReportService.createReportRequest(request)));
    }

    @PutMapping("/{id}/result")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @Operation(summary = "Update lab report results and status (Staff only)")
    public ResponseEntity<ApiResponse<LabReportResponse>> updateResult(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateLabReportResultRequest request) {
        return ok("Lab report updated", labReportService.updateReportResult(id, request));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get lab report by ID")
    public ResponseEntity<ApiResponse<LabReportResponse>> getById(
            @PathVariable UUID id,
            @CurrentUser User currentUser) {
        return ok(labReportService.getReportById(id, currentUser));
    }

    @GetMapping("/patient/{patientId}")
    @Operation(summary = "Get all lab reports for a patient")
    public ResponseEntity<ApiResponse<PageResponse<LabReportResponse>>> getByPatient(
            @PathVariable UUID patientId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "DESC") String direction,
            @CurrentUser User currentUser) {
        
        Pageable pageable = PageableUtils.createPageable(page, size, sort, direction, 
                Arrays.asList("createdAt", "reportDate"));
        
        return ok(labReportService.getPatientReports(patientId, pageable, currentUser));
    }
}
