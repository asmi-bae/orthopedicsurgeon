package com.orthopedic.api.auth.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TwoFactorSetupResponse {
    private String qrCodeUrl;
    private String secretKey;
    private List<String> backupCodes;
}
