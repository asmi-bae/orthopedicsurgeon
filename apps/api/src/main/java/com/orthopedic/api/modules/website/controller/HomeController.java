package com.orthopedic.api.modules.website.controller;

import com.orthopedic.api.modules.website.service.impl.HomeServiceImpl;
import com.orthopedic.api.modules.website.dto.response.HeroSlideResponse;
import com.orthopedic.api.modules.website.dto.response.HomeStatsResponse;
import com.orthopedic.api.modules.website.dto.response.TestimonialResponse;
import com.orthopedic.api.modules.contact.dto.response.ContactInfoResponse;
import com.orthopedic.api.modules.doctor.dto.response.DoctorPublicResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/public/home")
@RequiredArgsConstructor
@Tag(name = "Public Home", description = "Public endpoints for website homepage")
public class HomeController {

    private final HomeServiceImpl homeService;

    @GetMapping("/stats")
    @Operation(summary = "Get home stats")
    public ResponseEntity<HomeStatsResponse> getStats() {
        return ResponseEntity.ok(homeService.getStats());
    }

    @GetMapping("/featured-doctors")
    @Operation(summary = "Get featured doctors")
    public ResponseEntity<List<DoctorPublicResponse>> getFeaturedDoctors() {
        return ResponseEntity.ok(homeService.getFeaturedDoctors());
    }

    @GetMapping("/hero-slides")
    @Operation(summary = "Get hero slides")
    public ResponseEntity<List<HeroSlideResponse>> getHeroSlides() {
        return ResponseEntity.ok(homeService.getHeroSlides());
    }

    @GetMapping("/testimonials")
    @Operation(summary = "Get featured testimonials")
    public ResponseEntity<List<TestimonialResponse>> getFeaturedTestimonials() {
        return ResponseEntity.ok(homeService.getFeaturedTestimonials());
    }

    @GetMapping("/working-hours")
    @Operation(summary = "Get working hours")
    public ResponseEntity<Map<String, String>> getWorkingHours() {
        return ResponseEntity.ok(homeService.getWorkingHours());
    }

    @GetMapping("/contact-info")
    @Operation(summary = "Get contact information")
    public ResponseEntity<ContactInfoResponse> getContactInfo() {
        return ResponseEntity.ok(homeService.getContactInfo());
    }
}
