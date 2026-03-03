package com.orthopedic.api.modules.contact.dto.response;

import lombok.Builder;
import java.util.Map;

@Builder
public record ContactInfoResponse(
        String address,
        String phone,
        String email,
        String emergencyPhone,
        Map<String, String> workingHours,
        double mapLat,
        double mapLng,
        Map<String, String> socialLinks) {
}
