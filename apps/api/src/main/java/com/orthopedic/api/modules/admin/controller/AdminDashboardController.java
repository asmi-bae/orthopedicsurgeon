package com.orthopedic.api.modules.admin.controller;

import com.orthopedic.api.modules.admin.dto.dashboard.AdminDashboardResponse;
import com.orthopedic.api.modules.admin.service.AdminDashboardService;
import com.orthopedic.api.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/dashboard")
@RequiredArgsConstructor
@Tag(name = "Admin Dashboard", description = "Endpoints for retrieving admin dashboard data")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class AdminDashboardController {

    private final AdminDashboardService dashboardService;

    @GetMapping
    @Operation(summary = "Get aggregated dashboard data")
    public ResponseEntity<ApiResponse<AdminDashboardResponse>> getDashboardData() {
        return ResponseEntity.ok(ApiResponse.success("Dashboard data retrieved successfully",
                dashboardService.getDashboardData()));
    }

    @GetMapping("/stats")
    @Operation(summary = "Get dashboard summary stats")
    public ResponseEntity<ApiResponse<com.orthopedic.api.modules.admin.dto.dashboard.DashboardStatsResponse>> getStats() {
        return ResponseEntity
                .ok(ApiResponse.success("Stats retrieved", dashboardService.getDashboardStats()));
    }

    @GetMapping("/live-appointments")
    @Operation(summary = "Get live appointments for dashboard")
    public ResponseEntity<ApiResponse<java.util.List<com.orthopedic.api.modules.admin.dto.dashboard.LiveAppointmentResponse>>> getLiveAppointments() {
        return ResponseEntity.ok(ApiResponse.success("Live appointments retrieved",
                dashboardService.getLiveAppointments()));
    }

    @GetMapping("/top-hospitals")
    @Operation(summary = "Get top hospitals for dashboard")
    public ResponseEntity<ApiResponse<java.util.List<com.orthopedic.api.modules.admin.dto.dashboard.TopHospitalResponse>>> getTopHospitals() {
        return ResponseEntity.ok(
                ApiResponse.success("Top hospitals retrieved", dashboardService.getTopHospitals()));
    }

    @GetMapping("/quick-stats")
    @Operation(summary = "Get quick stats for dashboard")
    public ResponseEntity<ApiResponse<com.orthopedic.api.modules.admin.dto.dashboard.QuickStatsResponse>> getQuickStats() {
        return ResponseEntity
                .ok(ApiResponse.success("Quick stats retrieved", dashboardService.getQuickStats()));
    }
}
