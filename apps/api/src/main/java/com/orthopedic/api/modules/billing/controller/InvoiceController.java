package com.orthopedic.api.modules.billing.controller;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.modules.billing.entity.Invoice;
import com.orthopedic.api.modules.billing.service.InvoiceService;
import com.orthopedic.api.modules.patient.entity.Patient;
import com.orthopedic.api.modules.patient.repository.PatientRepository;
import com.orthopedic.api.rbac.annotation.CurrentUser;
import com.orthopedic.api.shared.base.BaseController;
import com.orthopedic.api.shared.dto.ApiResponse;
import com.orthopedic.api.shared.exception.ResourceNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/patient/invoices")
@Tag(name = "Billing Management", description = "Endpoints for patients to view their invoices")
@PreAuthorize("hasRole('PATIENT')")
public class InvoiceController extends BaseController {

    private final InvoiceService invoiceService;
    private final PatientRepository patientRepository;

    public InvoiceController(InvoiceService invoiceService, PatientRepository patientRepository) {
        this.invoiceService = invoiceService;
        this.patientRepository = patientRepository;
    }

    @GetMapping
    @Operation(summary = "Get my list of invoices")
    public ResponseEntity<ApiResponse<List<Invoice>>> getMyInvoices(@CurrentUser User currentUser) {
        Patient patient = patientRepository.findByUserId(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found"));

        return ok(invoiceService.getPatientInvoices(patient.getId()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get invoice detail by ID")
    public ResponseEntity<ApiResponse<Invoice>> getById(@PathVariable UUID id) {
        return ok(invoiceService.getInvoiceById(id));
    }
}
