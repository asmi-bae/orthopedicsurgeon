package com.orthopedic.api.modules.payment.controller;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.modules.payment.dto.request.CreatePaymentRequest;
import com.orthopedic.api.modules.payment.dto.response.PaymentResponse;
import com.orthopedic.api.modules.payment.service.PaymentService;
import com.orthopedic.api.rbac.annotation.CurrentUser;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/payments")
@Tag(name = "Payment Management", description = "Endpoints for managing billing and patient payments")
public class PaymentController extends BaseController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('DOCTOR_ADMIN', 'STAFF')")
    @Operation(summary = "Create a new payment/invoice record")
    public ResponseEntity<ApiResponse<PaymentResponse>> create(@Valid @RequestBody CreatePaymentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Payment record created", paymentService.createPayment(request)));
    }

    @PostMapping("/{id}/process")
    @PreAuthorize("hasAnyRole('DOCTOR_ADMIN', 'STAFF')")
    @Operation(summary = "Mark a payment as completed/processed")
    public ResponseEntity<ApiResponse<PaymentResponse>> process(
            @PathVariable UUID id,
            @RequestParam String transactionId) {
        return ok("Payment processed successfully", paymentService.processPayment(id, transactionId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get payment details by ID")
    public ResponseEntity<ApiResponse<PaymentResponse>> getById(
            @PathVariable UUID id,
            @CurrentUser User currentUser) {
        return ok(paymentService.getPaymentById(id, currentUser));
    }

    @GetMapping("/patient/{patientId}")
    @Operation(summary = "Get payment history for a patient")
    public ResponseEntity<ApiResponse<PageResponse<PaymentResponse>>> getByPatient(
            @PathVariable UUID patientId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "DESC") String direction,
            @CurrentUser User currentUser) {

        Pageable pageable = PageableUtils.createPageable(page, size, sort, direction,
                Arrays.asList("createdAt", "paymentDate", "amount"));

        return ok(paymentService.getPatientPayments(patientId, pageable, currentUser));
    }
}
