package com.orthopedic.api.modules.patient.controller.doctor;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.modules.patient.dto.response.PatientResponse;
import com.orthopedic.api.modules.patient.dto.response.PatientSummaryResponse;
import com.orthopedic.api.modules.patient.service.PatientService;
import com.orthopedic.api.rbac.annotation.CurrentUser;
import com.orthopedic.api.shared.base.BaseController;
import com.orthopedic.api.shared.dto.ApiResponse;
import com.orthopedic.api.shared.dto.PageResponse;
import com.orthopedic.api.shared.util.PageableUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/doctor/patients")
@Tag(name = "Doctor Patient Management", description = "Endpoints for doctors to manage patient records and medical history")
@PreAuthorize("hasAnyRole('DOCTOR_ADMIN', 'SUPER_ADMIN')")
@RequiredArgsConstructor
public class DoctorPatientController extends BaseController {

    private final PatientService patientService;

    @GetMapping
    @Operation(summary = "List all patients for doctor")
    public ResponseEntity<ApiResponse<PageResponse<PatientSummaryResponse>>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "DESC") String direction) {

        Pageable pageable = PageableUtils.createPageable(page, size, sort, direction,
                Collections.singletonList("createdAt"));

        return ok(patientService.getAllPatients(null, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get patient detail by ID for doctor")
    public ResponseEntity<ApiResponse<PatientResponse>> getById(
            @PathVariable UUID id,
            @CurrentUser User currentUser) {
        return ok(patientService.getPatientById(id));
    }
}
