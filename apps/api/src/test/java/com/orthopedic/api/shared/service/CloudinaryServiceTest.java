package com.orthopedic.api.shared.service;

import com.orthopedic.api.BaseIntegrationTest;
import com.orthopedic.api.shared.dto.CloudinaryResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;

import static org.junit.jupiter.api.Assertions.*;

class CloudinaryServiceTest extends BaseIntegrationTest {

    @Autowired
    private CloudinaryService cloudinaryService;

    @Test
    void testUploadAndDeleteImage() throws Exception {
        // Create a mock image file
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "test-image.png",
                "image/png",
                "test image content".getBytes()
        );

        // Test Upload
        CloudinaryResponse response = cloudinaryService.uploadImage(file, "ROLE_SUPER_ADMIN");

        assertNotNull(response);
        assertNotNull(response.getPublicId());
        assertNotNull(response.getSecureUrl());
        assertTrue(response.getPublicId().startsWith("orthopedic/super_admin/"));

        System.out.println("Uploaded Image URL: " + response.getSecureUrl());
        System.out.println("Public ID: " + response.getPublicId());

        // Test Delete
        assertDoesNotThrow(() -> cloudinaryService.deleteImage(response.getPublicId()));
    }
}
