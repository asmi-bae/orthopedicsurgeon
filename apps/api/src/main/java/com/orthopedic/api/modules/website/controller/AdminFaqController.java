package com.orthopedic.api.modules.website.controller;

import com.orthopedic.api.modules.website.dto.request.CreateFaqRequest;
import com.orthopedic.api.modules.website.entity.Faq;
import com.orthopedic.api.modules.website.repository.FaqRepository;
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
@RequestMapping("/api/v1/admin/website/faq")
@RequiredArgsConstructor
@Tag(name = "Admin Website FAQ", description = "Admin endpoints for managing FAQs")
@PreAuthorize("hasAnyRole('DOCTOR_ADMIN', 'SUPER_ADMIN')")
public class AdminFaqController {

    private final FaqRepository faqRepository;

    @GetMapping
    @Operation(summary = "Get all FAQs")
    public ResponseEntity<List<Faq>> getAll() {
        return ResponseEntity.ok(faqRepository.findAll());
    }

    @PostMapping
    @Operation(summary = "Create an FAQ")
    public ResponseEntity<Faq> create(@Valid @RequestBody CreateFaqRequest request) {
        Faq faq = Faq.builder()
                .question(request.question())
                .answer(request.answer())
                .category(request.category())
                .displayOrder(request.displayOrder())
                .isActive(request.isActive())
                .build();
        return ResponseEntity.ok(faqRepository.save(faq));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an FAQ")
    public ResponseEntity<Faq> update(@PathVariable UUID id, @Valid @RequestBody CreateFaqRequest request) {
        Faq faq = faqRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FAQ not found"));

        faq.setQuestion(request.question());
        faq.setAnswer(request.answer());
        faq.setCategory(request.category());
        faq.setDisplayOrder(request.displayOrder());
        faq.setIsActive(request.isActive());

        return ResponseEntity.ok(faqRepository.save(faq));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an FAQ")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        faqRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
