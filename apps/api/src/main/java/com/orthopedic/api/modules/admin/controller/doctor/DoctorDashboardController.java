package com.orthopedic.api.modules.admin.controller.doctor;

import com.orthopedic.api.modules.admin.dto.dashboard.AdminDashboardResponse;
import com.orthopedic.api.modules.admin.dto.dashboard.DashboardStatsResponse;
import com.orthopedic.api.modules.admin.dto.dashboard.LiveAppointmentResponse;
import com.orthopedic.api.modules.admin.dto.dashboard.QuickStatsResponse;
import com.orthopedic.api.modules.admin.dto.dashboard.TopHospitalResponse;
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

import java.util.List;

@RestController
@RequestMapping("/api/v1/doctor/dashboard")
@RequiredArgsConstructor
@Tag(name = "Doctor Dashboard", description = "Endpoints for retrieving doctor dashboard data")
@PreAuthorize("hasRole('DOCTOR_ADMIN')")
public class DoctorDashboardController {

    private final AdminDashboardService dashboardService;

    @GetMapping
    @Operation(summary = "Get aggregated dashboard data for doctor")
    public ResponseEntity<ApiResponse<AdminDashboardResponse>> getDashboardData() {
        return ResponseEntity.ok(ApiResponse.success("Dashboard data retrieved successfully",
                dashboardService.getDashboardData()));
    }

    @GetMapping("/stats")
    @Operation(summary = "Get dashboard summary stats for doctor")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getStats() {
        return ResponseEntity
                .ok(ApiResponse.success("Stats retrieved", dashboardService.getDashboardStats()));
    }

    @GetMapping("/live-appointments")
    @Operation(summary = "Get live appointments for doctor dashboard")
    public ResponseEntity<ApiResponse<List<LiveAppointmentResponse>>> getLiveAppointments() {
        return ResponseEntity.ok(ApiResponse.success("Live appointments retrieved",
                dashboardService.getLiveAppointments()));
    }

    @GetMapping("/top-hospitals")
    @Operation(summary = "Get top hospitals for doctor dashboard")
    public ResponseEntity<ApiResponse<List<TopHospitalResponse>>> getTopHospitals() {
        return ResponseEntity.ok(
                ApiResponse.success("Top hospitals retrieved", dashboardService.getTopHospitals()));
    }

    @GetMapping("/quick-stats")
    @Operation(summary = "Get quick stats for doctor dashboard")
    public ResponseEntity<ApiResponse<QuickStatsResponse>> getQuickStats() {
        return ResponseEntity
                .ok(ApiResponse.success("Quick stats retrieved", dashboardService.getQuickStats()));
    }
}
