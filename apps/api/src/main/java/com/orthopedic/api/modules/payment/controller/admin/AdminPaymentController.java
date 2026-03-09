package com.orthopedic.api.modules.payment.controller.admin;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.modules.payment.dto.response.FinancialSummaryResponse;
import com.orthopedic.api.modules.payment.dto.response.PaymentResponse;
import com.orthopedic.api.modules.payment.service.PaymentService;
import com.orthopedic.api.rbac.annotation.CurrentUser;
import com.orthopedic.api.shared.base.BaseController;
import com.orthopedic.api.shared.dto.ApiResponse;
import com.orthopedic.api.shared.dto.PageResponse;
import com.orthopedic.api.shared.util.PageableUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/doctor")
@Tag(name = "Admin Payment Management", description = "Endpoints for administrators and staff to manage all payments and view financial data")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class AdminPaymentController extends BaseController {

    private final PaymentService paymentService;

    public AdminPaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/payments")
    @Operation(summary = "Get list of all payment records")
    public ResponseEntity<ApiResponse<PageResponse<PaymentResponse>>> getAllPayments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "DESC") String direction) {

        Pageable pageable = PageableUtils.createPageable(page, size, sort, direction,
                Collections.singletonList("createdAt"));

        return ok(paymentService.getAllPayments(pageable));
    }

    @GetMapping("/payments/{id}")
    @Operation(summary = "Get payment detail by ID")
    public ResponseEntity<ApiResponse<PaymentResponse>> getById(
            @PathVariable UUID id,
            @CurrentUser User currentUser) {
        return ok(paymentService.getPaymentById(id, currentUser));
    }

    @GetMapping("/financial")
    @Operation(summary = "Get financial summary data")
    public ResponseEntity<ApiResponse<FinancialSummaryResponse>> getFinancialSummary() {
        return ok(paymentService.getFinancialSummary());
    }
}
