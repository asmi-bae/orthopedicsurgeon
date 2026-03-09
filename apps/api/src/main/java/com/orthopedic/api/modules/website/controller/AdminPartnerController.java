package com.orthopedic.api.modules.website.controller;

import com.orthopedic.api.modules.website.entity.Partner;
import com.orthopedic.api.modules.website.repository.PartnerRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/doctor/website/partners")
@RequiredArgsConstructor
@Tag(name = "Admin Website Partner", description = "Admin endpoints for managing partners")
@PreAuthorize("hasAnyRole('DOCTOR_ADMIN', 'SUPER_ADMIN')")
public class AdminPartnerController {

    private final PartnerRepository partnerRepository;

    @GetMapping
    @Operation(summary = "Get all partners")
    public ResponseEntity<List<Partner>> getAll() {
        return ResponseEntity.ok(partnerRepository.findAll());
    }

    @PostMapping
    @Operation(summary = "Create a partner")
    public ResponseEntity<Partner> create(@Valid @RequestBody Partner partner) {
        // Since we are using the entity directly for simplicity in this admin CRUD
        return ResponseEntity.ok(partnerRepository.save(partner));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a partner")
    public ResponseEntity<Partner> update(@PathVariable UUID id, @Valid @RequestBody Partner partnerRequest) {
        Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partner not found"));

        partner.setName(partnerRequest.getName());
        partner.setLogoUrl(partnerRequest.getLogoUrl());
        partner.setWebsiteUrl(partnerRequest.getWebsiteUrl());
        partner.setDisplayOrder(partnerRequest.getDisplayOrder());
        partner.setIsActive(partnerRequest.getIsActive());

        return ResponseEntity.ok(partnerRepository.save(partner));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a partner")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        partnerRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
