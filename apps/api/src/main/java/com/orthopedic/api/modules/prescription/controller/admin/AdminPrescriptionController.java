package com.orthopedic.api.modules.prescription.controller.admin;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.modules.prescription.dto.response.PrescriptionResponse;
import com.orthopedic.api.modules.prescription.service.PrescriptionService;
import com.orthopedic.api.rbac.annotation.CurrentUser;
import com.orthopedic.api.shared.base.BaseController;
import com.orthopedic.api.shared.dto.ApiResponse;
import com.orthopedic.api.shared.dto.PageResponse;
import com.orthopedic.api.shared.util.PageableUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/doctor/prescriptions")
@Tag(name = "Admin Prescription Management", description = "Endpoints for administrators and staff to view all patient prescriptions")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class AdminPrescriptionController extends BaseController {

    private final PrescriptionService prescriptionService;

    public AdminPrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @GetMapping
    @Operation(summary = "Get list of all prescriptions")
    public ResponseEntity<ApiResponse<PageResponse<PrescriptionResponse>>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "DESC") String direction) {

        Pageable pageable = PageableUtils.createPageable(page, size, sort, direction,
                Collections.singletonList("createdAt"));

        return ok(prescriptionService.getAllPrescriptions(pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get prescription detail by ID")
    public ResponseEntity<ApiResponse<PrescriptionResponse>> getById(
            @PathVariable UUID id,
            @CurrentUser User currentUser) {
        return ok(prescriptionService.getPrescriptionById(id, currentUser));
    }

    @GetMapping("/patient/{patientId}")
    @Operation(summary = "Get prescriptions for a specific patient")
    public ResponseEntity<ApiResponse<PageResponse<PrescriptionResponse>>> getByPatient(
            @PathVariable UUID patientId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "DESC") String direction,
            @CurrentUser User currentUser) {

        Pageable pageable = PageableUtils.createPageable(page, size, sort, direction,
                Collections.singletonList("createdAt"));

        return ok(prescriptionService.getPatientPrescriptions(patientId, pageable, currentUser));
    }
}
