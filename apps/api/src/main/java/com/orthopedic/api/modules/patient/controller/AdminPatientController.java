package com.orthopedic.api.modules.patient.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/patients")
@RequiredArgsConstructor
@Tag(name = "Admin Patient", description = "Admin endpoints for patient management")
public class AdminPatientController {

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "List all patients")
    public ResponseEntity<List<Object>> getPatients() {
        // Dummy returning empty list
        return ResponseEntity.ok(List.of());
    }
}
