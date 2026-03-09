package com.orthopedic.api.modules.website.controller.doctor;

import com.orthopedic.api.modules.website.dto.response.*;
import com.orthopedic.api.modules.website.service.WebsiteService;
import com.orthopedic.api.shared.base.BaseController;
import com.orthopedic.api.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/doctor/website")
@Tag(name = "Doctor Website Management", description = "Endpoints for doctors to view website content (hero slides, FAQ, partners)")
@PreAuthorize("hasRole('DOCTOR_ADMIN')")
@RequiredArgsConstructor
public class DoctorWebsiteController extends BaseController {

    private final WebsiteService websiteService;

    // --- Hero Slides ---
    @GetMapping("/hero-slides")
    @Operation(summary = "Get all hero slides")
    public ResponseEntity<ApiResponse<List<HeroSlideResponse>>> getAllHeroSlides() {
        return ok(websiteService.getHeroSlides());
    }

    // --- FAQs ---
    @GetMapping("/faq")
    @Operation(summary = "Get all FAQs")
    public ResponseEntity<ApiResponse<List<FaqResponse>>> getAllFaqs() {
        return ok(websiteService.getFaqs(null));
    }

    // --- Partners ---
    @GetMapping("/partner")
    @Operation(summary = "Get all partners")
    public ResponseEntity<ApiResponse<List<PartnerResponse>>> getAllPartners() {
        return ok(websiteService.getActivePartners());
    }
}
