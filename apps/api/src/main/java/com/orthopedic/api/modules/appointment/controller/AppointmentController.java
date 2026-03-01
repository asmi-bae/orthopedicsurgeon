package com.orthopedic.api.modules.appointment.controller;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.modules.appointment.dto.request.AppointmentFilterRequest;
import com.orthopedic.api.modules.appointment.dto.request.BookAppointmentRequest;
import com.orthopedic.api.modules.appointment.dto.response.AppointmentResponse;
import com.orthopedic.api.modules.appointment.dto.response.AppointmentSummaryResponse;
import com.orthopedic.api.modules.appointment.service.AppointmentService;
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
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
@Tag(name = "Appointment Management", description = "Endpoints for booking and managing appointments")
public class AppointmentController extends BaseController {

    private final AppointmentService appointmentService;

    @GetMapping
    @Operation(summary = "List appointments based on user role and filters")
    public ResponseEntity<ApiResponse<PageResponse<AppointmentSummaryResponse>>> getAppointments(
            AppointmentFilterRequest filters,
            @CurrentUser User currentUser,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "DESC") String direction) {
        
        Pageable pageable = PageableUtils.createPageable(page, size, sort, direction, 
                Arrays.asList("appointmentDate", "startTime", "status", "createdAt"));
        
        return ok(appointmentService.getAppointments(filters, pageable, currentUser));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get appointment detail by ID")
    public ResponseEntity<ApiResponse<AppointmentResponse>> getById(
            @PathVariable UUID id, 
            @CurrentUser User currentUser) {
        return ok(appointmentService.getAppointmentById(id, currentUser));
    }

    @PostMapping
    @Operation(summary = "Book a new appointment")
    public ResponseEntity<ApiResponse<AppointmentResponse>> book(
            @Valid @RequestBody BookAppointmentRequest request, 
            @CurrentUser User currentUser) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Appointment booked successfully", 
                        appointmentService.bookAppointment(request, currentUser)));
    }

    @PostMapping("/{id}/confirm")
    @Operation(summary = "Confirm a pending appointment")
    public ResponseEntity<ApiResponse<AppointmentResponse>> confirm(@PathVariable UUID id) {
        return ok("Appointment confirmed", appointmentService.confirmAppointment(id));
    }

    @PostMapping("/{id}/start")
    @Operation(summary = "Start an appointment (Doctor only)")
    public ResponseEntity<ApiResponse<AppointmentResponse>> start(@PathVariable UUID id) {
        return ok("Appointment started", appointmentService.startAppointment(id));
    }

    @PostMapping("/{id}/complete")
    @Operation(summary = "Complete an appointment (Doctor only)")
    public ResponseEntity<ApiResponse<AppointmentResponse>> complete(@PathVariable UUID id) {
        return ok("Appointment completed", appointmentService.completeAppointment(id));
    }

    @PostMapping("/{id}/cancel")
    @Operation(summary = "Cancel an appointment with a reason")
    public ResponseEntity<ApiResponse<AppointmentResponse>> cancel(
            @PathVariable UUID id, 
            @RequestParam String reason, 
            @CurrentUser User currentUser) {
        return ok("Appointment cancelled", appointmentService.cancelAppointment(id, reason, currentUser));
    }
}
