package com.orthopedic.api.shared.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.orthopedic.api.shared.dto.CloudinaryResponse;
import com.orthopedic.api.shared.exception.FileValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CloudinaryService {

    private final Cloudinary cloudinary;
    private static final String BASE_FOLDER = "orthopedic";
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    private static final List<String> ALLOWED_CONTENT_TYPES = Arrays.asList("image/jpeg", "image/png", "image/webp");

    /**
     * Upload an image to Cloudinary in a specific folder.
     */
    public CloudinaryResponse uploadImage(MultipartFile file, String role) throws IOException {
        validateFile(file);
        String folder = getFolderByRole(role);
        
        Map<String, Object> uploadResult = (Map<String, Object>) cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                        "folder", folder,
                        "resource_type", "auto"
                ));

        return CloudinaryResponse.builder()
                .publicId((String) uploadResult.get("public_id"))
                .url((String) uploadResult.get("url"))
                .secureUrl((String) uploadResult.get("secure_url"))
                .format((String) uploadResult.get("format"))
                .resourceType((String) uploadResult.get("resource_type"))
                .build();
    }

    /**
     * Delete an image from Cloudinary by public ID.
     */
    public void deleteImage(String publicId) throws IOException {
        if (publicId == null || publicId.trim().isEmpty()) {
            throw new FileValidationException("Public ID is required for deletion");
        }
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }

    /**
     * Get the folder path based on the user's role.
     */
    private String getFolderByRole(String role) {
        String subFolder;
        if (role == null) {
            subFolder = "guest";
        } else {
            subFolder = switch (role.toUpperCase()) {
                case "ROLE_SUPER_ADMIN" -> "super_admin";
                case "ROLE_DOCTOR_ADMIN" -> "doctor_admin";
                case "ROLE_PATIENT" -> "patient";
                default -> "misc";
            };
        }
        return BASE_FOLDER + "/" + subFolder;
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new FileValidationException("File is empty or missing");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new FileValidationException("File size exceeds the limit of 5MB");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType)) {
            throw new FileValidationException("Invalid file type. Only JPG, PNG, and WEBP are allowed");
        }
    }
}
