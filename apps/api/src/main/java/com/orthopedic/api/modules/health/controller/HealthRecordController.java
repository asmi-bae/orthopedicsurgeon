package com.orthopedic.api.modules.health.controller;

import com.orthopedic.api.modules.health.dto.request.RecordVitalsRequest;
import com.orthopedic.api.modules.health.dto.response.PatientDashboardResponse;
import com.orthopedic.api.modules.health.dto.response.VitalSignsResponse;
import com.orthopedic.api.modules.health.service.impl.HealthRecordServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/patient/health")
@RequiredArgsConstructor
@Tag(name = "Patient Health", description = "Endpoints for patient health records")
public class HealthRecordController {

    private final HealthRecordServiceImpl healthRecordService;

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('PATIENT')")
    @Operation(summary = "Get patient health dashboard")
    public ResponseEntity<PatientDashboardResponse> getDashboard() {
        // Authenticated user ID should be extracted here, using a dummy UUID for
        // compilation
        UUID patientId = UUID.randomUUID();
        return ResponseEntity.ok(healthRecordService.getPatientDashboard(patientId));
    }

    @PostMapping("/vitals")
    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR')")
    @Operation(summary = "Record vital signs")
    public ResponseEntity<VitalSignsResponse> recordVitals(@Valid @RequestBody RecordVitalsRequest request) {
        // Dummy IDs for compilation
        UUID patientId = UUID.randomUUID();
        Long recordedById = 1L;
        return ResponseEntity.ok(healthRecordService.recordVitals(patientId, request, recordedById));
    }
}
