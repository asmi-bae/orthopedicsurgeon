package com.orthopedic.api.modules.patient.controller;

import com.orthopedic.api.modules.patient.dto.request.CreatePatientRequest;
import com.orthopedic.api.modules.patient.dto.request.PatientFilterRequest;
import com.orthopedic.api.modules.patient.dto.response.PatientMedicalHistoryResponse;
import com.orthopedic.api.modules.patient.dto.response.PatientResponse;
import com.orthopedic.api.modules.patient.dto.response.PatientSummaryResponse;
import com.orthopedic.api.modules.patient.service.PatientService;
import com.orthopedic.api.shared.base.BaseController;
import com.orthopedic.api.shared.dto.ApiResponse;
import com.orthopedic.api.shared.dto.PageResponse;
import com.orthopedic.api.shared.util.PageableUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/patients")
@Tag(name = "Patient Management", description = "Endpoints for managing patient profiles and medical records")
public class PatientController extends BaseController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping
    @Operation(summary = "List all patients with filters (Admin/Staff/Doctor only)")
    public ResponseEntity<ApiResponse<PageResponse<PatientSummaryResponse>>> getAll(
            PatientFilterRequest filters,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "DESC") String direction) {

        Pageable pageable = PageableUtils.createPageable(page, size, sort, direction,
                Arrays.asList("dateOfBirth", "createdAt", "status"));

        return ok(patientService.getAllPatients(filters, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get patient details by ID")
    public ResponseEntity<ApiResponse<PatientResponse>> getById(@PathVariable UUID id) {
        return ok(patientService.getPatientById(id));
    }

    @PostMapping
    @Operation(summary = "Create a new patient profile (Admin/Staff only)")
    public ResponseEntity<ApiResponse<PatientResponse>> create(@Valid @RequestBody CreatePatientRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(patientService.createPatient(request)));
    }

    @GetMapping("/{id}/history")
    @Operation(summary = "Get full medical history of a patient")
    public ResponseEntity<ApiResponse<PatientMedicalHistoryResponse>> getHistory(@PathVariable UUID id) {
        return ok(patientService.getMedicalHistory(id));
    }
}
