package com.orthopedic.api.modules.website.controller;

import com.orthopedic.api.modules.website.dto.request.CreateHeroSlideRequest;
import com.orthopedic.api.modules.website.entity.HeroSlide;
import com.orthopedic.api.modules.website.repository.HeroSlideRepository;
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
@RequestMapping("/api/v1/admin/website/hero-slides")
@RequiredArgsConstructor
@Tag(name = "Admin Website Hero", description = "Admin endpoints for managing hero section")
@PreAuthorize("hasAnyRole('DOCTOR_ADMIN', 'SUPER_ADMIN')")
public class AdminHeroSlideController {

    private final HeroSlideRepository heroSlideRepository;

    @GetMapping
    @Operation(summary = "Get all hero slides")
    public ResponseEntity<List<HeroSlide>> getAll() {
        return ResponseEntity.ok(heroSlideRepository.findAll());
    }

    @PostMapping
    @Operation(summary = "Create a hero slide")
    public ResponseEntity<HeroSlide> create(@Valid @RequestBody CreateHeroSlideRequest request) {
        HeroSlide slide = HeroSlide.builder()
                .title(request.title())
                .subtitle(request.subtitle())
                .description(request.description())
                .imageUrl(request.imageUrl())
                .buttonText(request.buttonText())
                .buttonLink(request.buttonLink())
                .displayOrder(request.displayOrder())
                .isActive(request.isActive())
                .build();
        return ResponseEntity.ok(heroSlideRepository.save(slide));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a hero slide")
    public ResponseEntity<HeroSlide> update(@PathVariable UUID id, @Valid @RequestBody CreateHeroSlideRequest request) {
        HeroSlide slide = heroSlideRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hero slide not found"));

        slide.setTitle(request.title());
        slide.setSubtitle(request.subtitle());
        slide.setDescription(request.description());
        slide.setImageUrl(request.imageUrl());
        slide.setButtonText(request.buttonText());
        slide.setButtonLink(request.buttonLink());
        slide.setDisplayOrder(request.displayOrder());
        slide.setIsActive(request.isActive());

        return ResponseEntity.ok(heroSlideRepository.save(slide));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a hero slide")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        heroSlideRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
