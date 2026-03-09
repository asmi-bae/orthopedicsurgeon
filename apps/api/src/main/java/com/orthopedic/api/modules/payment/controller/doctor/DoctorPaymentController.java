package com.orthopedic.api.modules.payment.controller.doctor;

import com.orthopedic.api.modules.payment.dto.response.PaymentResponse;
import com.orthopedic.api.modules.payment.service.PaymentService;
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
@RequestMapping("/api/v1/admin/payments")
@Tag(name = "Doctor Payment Management", description = "Endpoints for doctors to view and track payments and revenue")
@PreAuthorize("hasRole('DOCTOR_ADMIN')")
@RequiredArgsConstructor
public class DoctorPaymentController extends BaseController {

    private final PaymentService paymentService;

    @GetMapping
    @Operation(summary = "Get all payments for doctor's practice")
    public ResponseEntity<ApiResponse<PageResponse<PaymentResponse>>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "DESC") String direction) {

        Pageable pageable = PageableUtils.createPageable(page, size, sort, direction,
                Collections.singletonList("createdAt"));

        return ok(paymentService.getAllPayments(pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get payment detail by ID")
    public ResponseEntity<ApiResponse<PaymentResponse>> getById(
            @PathVariable UUID id,
            @com.orthopedic.api.rbac.annotation.CurrentUser com.orthopedic.api.auth.entity.User currentUser) {
        return ok(paymentService.getPaymentById(id, currentUser));
    }

    @GetMapping("/stats")
    @Operation(summary = "Get revenue stats for doctor")
    public ResponseEntity<ApiResponse<Object>> getStats() {
        // Implementation would call revenue reporting service
        return ok("Revenue stats retrieved", null);
    }
}
