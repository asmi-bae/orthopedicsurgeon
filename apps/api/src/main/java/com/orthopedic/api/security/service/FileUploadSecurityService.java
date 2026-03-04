package com.orthopedic.api.security.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import xyz.capybara.clamav.ClamavClient;
import xyz.capybara.clamav.commands.scan.result.ScanResult;

import java.io.InputStream;
import java.util.Set;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileUploadSecurityService {

    private final Tika tika = new Tika();
    private static final Set<String> ALLOWED_MIME_TYPES = Set.of("image/jpeg", "image/png", "image/webp",
            "application/pdf");
    private static final long MAX_SIZE = 20 * 1024 * 1024; // 20MB

    public String validateAndSanitize(MultipartFile file) throws Exception {
        // 1. Size check
        if (file.getSize() > MAX_SIZE) {
            throw new IllegalArgumentException("File size exceeds 20MB limit");
        }

        // 2. Magic bytes check
        try (InputStream is = file.getInputStream()) {
            String mimeType = tika.detect(is);
            if (!ALLOWED_MIME_TYPES.contains(mimeType)) {
                throw new IllegalArgumentException("Unsupported file type: " + mimeType);
            }
        }

        // 3. Virus scan (if clamav client is available)
        // scanForViruses(file.getInputStream());

        // 4. Generate safe filename
        String extension = getExtension(file.getOriginalFilename());
        return UUID.randomUUID().toString() + "." + (extension != null ? extension : "bin");
    }

    private String getExtension(String filename) {
        if (filename == null)
            return null;
        int lastDot = filename.lastIndexOf('.');
        if (lastDot == -1)
            return null;
        return filename.substring(lastDot + 1).toLowerCase().replaceAll("[^a-z0-9]", "");
    }

    // Placeholder for ClamAV scanning
    private void scanForViruses(InputStream is) {
        // ClamavClient client = new ClamavClient("localhost", 3310);
        // ScanResult result = client.scan(is);
        // if (!(result instanceof ScanResult.OK)) {
        // throw new SecurityException("Virus detected in file!");
        // }
    }
}
