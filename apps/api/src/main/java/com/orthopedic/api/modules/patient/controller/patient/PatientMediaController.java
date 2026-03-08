package com.orthopedic.api.modules.patient.controller.patient;

import com.orthopedic.api.shared.dto.ApiResponse;
import com.orthopedic.api.shared.dto.CloudinaryResponse;
import com.orthopedic.api.shared.service.CloudinaryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/patient/media")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Patient Media", description = "Patient endpoints for media management")
@PreAuthorize("hasRole('PATIENT')")
public class PatientMediaController {

    private final CloudinaryService cloudinaryService;

    @PostMapping("/upload")
    @Operation(summary = "Upload image (Patient)")
    public ResponseEntity<ApiResponse<CloudinaryResponse>> upload(@RequestParam("file") MultipartFile file) throws IOException {
        log.info("Patient uploading image");
        CloudinaryResponse response = cloudinaryService.uploadImage(file, "ROLE_PATIENT");
        return ResponseEntity.ok(ApiResponse.success("Image uploaded successfully", response));
    }

    @DeleteMapping("/delete")
    @Operation(summary = "Delete image (Patient)")
    public ResponseEntity<ApiResponse<Void>> delete(@RequestParam("publicId") String publicId) throws IOException {
        log.info("Patient deleting image: {}", publicId);
        cloudinaryService.deleteImage(publicId);
        return ResponseEntity.ok(ApiResponse.success("Image deleted successfully", null));
    }
}
