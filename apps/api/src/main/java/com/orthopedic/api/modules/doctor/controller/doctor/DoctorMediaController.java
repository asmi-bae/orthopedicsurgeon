package com.orthopedic.api.modules.doctor.controller.doctor;

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
@RequestMapping("/api/v1/doctor/media")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Doctor Media", description = "Doctor endpoints for media management")
@PreAuthorize("hasRole('DOCTOR_ADMIN')")
public class DoctorMediaController {

    private final CloudinaryService cloudinaryService;

    @PostMapping("/upload")
    @Operation(summary = "Upload image (Doctor)")
    public ResponseEntity<ApiResponse<CloudinaryResponse>> upload(@RequestParam("file") MultipartFile file) throws IOException {
        log.info("Doctor uploading image");
        CloudinaryResponse response = cloudinaryService.uploadImage(file, "ROLE_DOCTOR_ADMIN");
        return ResponseEntity.ok(ApiResponse.success("Image uploaded successfully", response));
    }

    @DeleteMapping("/delete")
    @Operation(summary = "Delete image (Doctor)")
    public ResponseEntity<ApiResponse<Void>> delete(@RequestParam("publicId") String publicId) throws IOException {
        log.info("Doctor deleting image: {}", publicId);
        cloudinaryService.deleteImage(publicId);
        return ResponseEntity.ok(ApiResponse.success("Image deleted successfully", null));
    }

    @PutMapping("/replace")
    @Operation(summary = "Replace image (Doctor)")
    public ResponseEntity<ApiResponse<CloudinaryResponse>> replace(
            @RequestParam("publicId") String publicId,
            @RequestParam("file") MultipartFile file) throws IOException {
        log.info("Doctor replacing image: {}", publicId);
        cloudinaryService.deleteImage(publicId);
        CloudinaryResponse response = cloudinaryService.uploadImage(file, "ROLE_DOCTOR_ADMIN");
        return ResponseEntity.ok(ApiResponse.success("Image replaced successfully", response));
    }
}
