package com.orthopedic.api.modules.hospital.controller;

import com.orthopedic.api.modules.hospital.dto.request.CreateHospitalRequest;
import com.orthopedic.api.modules.hospital.dto.request.CreateServiceRequest;
import com.orthopedic.api.modules.hospital.dto.request.UpdateHospitalRequest;
import com.orthopedic.api.modules.hospital.dto.request.UpdateServiceRequest;
import com.orthopedic.api.modules.hospital.dto.response.HospitalResponse;
import com.orthopedic.api.modules.hospital.dto.response.HospitalSummaryResponse;
import com.orthopedic.api.modules.hospital.dto.response.ServiceResponse;
import com.orthopedic.api.modules.hospital.entity.Hospital;
import com.orthopedic.api.modules.hospital.entity.ServiceEntity;
import com.orthopedic.api.modules.hospital.service.HospitalService;
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
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/hospitals")
@Tag(name = "Hospital Management", description = "Endpoints for managing hospitals and their services")
public class HospitalController extends BaseController {

    private final HospitalService hospitalService;

    public HospitalController(HospitalService hospitalService) {
        this.hospitalService = hospitalService;
    }

    @GetMapping("/summary")
    @Operation(summary = "Get lightweight hospital summary for public listing")
    public ResponseEntity<ApiResponse<List<HospitalSummaryResponse>>> getSummary() {
        return ok(hospitalService.getHospitalSummary());
    }

    @GetMapping
    @Operation(summary = "Get all hospitals with filtering and pagination")
    public ResponseEntity<ApiResponse<PageResponse<HospitalResponse>>> getAll(
            @RequestParam(required = false) Hospital.HospitalStatus status,
            @RequestParam(required = false) String city,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "DESC") String direction) {

        Pageable pageable = PageableUtils.createPageable(page, size, sort, direction,
                Arrays.asList("name", "city", "status", "createdAt"));

        return ok(hospitalService.getAllHospitals(status, city, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get hospital by ID")
    public ResponseEntity<ApiResponse<HospitalResponse>> getById(@PathVariable UUID id) {
        return ok(hospitalService.getHospitalById(id));
    }

    @PostMapping
    @Operation(summary = "Create a new hospital (Super Admin only)")
    public ResponseEntity<ApiResponse<HospitalResponse>> create(@Valid @RequestBody CreateHospitalRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(hospitalService.createHospital(request)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update hospital details")
    public ResponseEntity<ApiResponse<HospitalResponse>> update(@PathVariable UUID id,
            @Valid @RequestBody UpdateHospitalRequest request) {
        return ok(hospitalService.updateHospital(id, request));
    }
    @GetMapping("/services")
    @Operation(summary = "Get all services across all hospitals")
    public ResponseEntity<ApiResponse<PageResponse<ServiceResponse>>> getAllServices(
            @RequestParam(required = false) ServiceEntity.ServiceStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "DESC") String direction) {

        Pageable pageable = PageableUtils.createPageable(page, size, sort, direction,
                Arrays.asList("name", "category", "status", "createdAt"));

        return ok(hospitalService.getAllServices(status, pageable));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Soft delete a hospital")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        hospitalService.deleteHospital(id);
        return ok("Hospital deactivated successfully", null);
    }

    @GetMapping("/{id}/services")
    @Operation(summary = "Get all services of a hospital")
    public ResponseEntity<ApiResponse<List<ServiceResponse>>> getServices(@PathVariable UUID id) {
        return ok(hospitalService.getServicesByHospital(id));
    }

    @PostMapping("/{id}/services")
    @Operation(summary = "Add a service to a hospital")
    public ResponseEntity<ApiResponse<ServiceResponse>> addService(@PathVariable UUID id,
            @Valid @RequestBody CreateServiceRequest request) {
        request.setHospitalId(id);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(hospitalService.createService(request)));
    }

    @PutMapping("/{id}/services/{serviceId}")
    @Operation(summary = "Update a hospital service")
    public ResponseEntity<ApiResponse<ServiceResponse>> updateService(
            @PathVariable UUID id,
            @PathVariable UUID serviceId,
            @Valid @RequestBody UpdateServiceRequest request) {
        return ok(hospitalService.updateService(serviceId, request));
    }

    @DeleteMapping("/{id}/services/{serviceId}")
    @Operation(summary = "Deactivate a hospital service")
    public ResponseEntity<ApiResponse<Void>> deleteService(@PathVariable UUID id, @PathVariable UUID serviceId) {
        hospitalService.deleteService(serviceId);
        return ok("Service deactivated successfully", null);
    }
}
