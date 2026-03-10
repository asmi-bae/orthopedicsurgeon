package com.orthopedic.api.modules.patient.controller;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.modules.health.dto.response.VitalSignsResponse;
import com.orthopedic.api.modules.patient.dto.response.AppointmentSummaryResponse;
import com.orthopedic.api.modules.patient.dto.response.PatientDashboardResponse;
import com.orthopedic.api.modules.patient.service.PatientPortalService;
import com.orthopedic.api.rbac.annotation.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/patient/dashboard")
@RequiredArgsConstructor
@org.springframework.security.access.prepost.PreAuthorize("hasRole('PATIENT')")
public class PatientPortalController {

    private final PatientPortalService portalService;

    // ─── Group J: Patient Dashboard ─────────────────────────────────────────────

    /**
     * J-01: Get the patient's full dashboard summary.
     */
    @GetMapping
    public ResponseEntity<PatientDashboardResponse> getDashboard(@CurrentUser User currentUser) {
        return ResponseEntity.ok(portalService.getDashboard(currentUser.getId()));
    }

    /**
     * J-02: Get upcoming appointments.
     */
    @GetMapping("/appointments/upcoming")
    public ResponseEntity<List<AppointmentSummaryResponse>> getUpcomingAppointments(@CurrentUser User currentUser) {
        return ResponseEntity.ok(portalService.getUpcomingAppointments(currentUser.getId()));
    }

    /**
     * J-03: Get past / completed appointments.
     */
    @GetMapping("/appointments/history")
    public ResponseEntity<List<AppointmentSummaryResponse>> getPastAppointments(@CurrentUser User currentUser) {
        return ResponseEntity.ok(portalService.getPastAppointments(currentUser.getId()));
    }

    // ─── Group K: Health Records ─────────────────────────────────────────────────

    /**
     * K-01: Get latest vital signs.
     */
    @GetMapping("/health/vitals/latest")
    public ResponseEntity<VitalSignsResponse> getLatestVitals(@CurrentUser User currentUser) {
        return ResponseEntity.ok(portalService.getLatestVitals(currentUser.getId()));
    }

    /**
     * K-02: Get vitals history for charting (default 30 days).
     */
    @GetMapping("/health/vitals/chart")
    public ResponseEntity<List<VitalSignsResponse>> getVitalsHistory(
            @CurrentUser User currentUser,
            @RequestParam(defaultValue = "30") int days) {
        return ResponseEntity.ok(portalService.getVitalsHistory(currentUser.getId(), days));
    }
}
