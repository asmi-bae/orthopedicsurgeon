package com.orthopedic.api.shared.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CloudinaryResponse {
    private String publicId;
    private String url;
    private String secureUrl;
    private String format;
    private String resourceType;
}
