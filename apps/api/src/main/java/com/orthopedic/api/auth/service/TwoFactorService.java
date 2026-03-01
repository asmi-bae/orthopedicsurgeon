package com.orthopedic.api.auth.service;

import com.orthopedic.api.auth.dto.TokenResponse;
import com.orthopedic.api.auth.dto.TwoFactorSetupResponse;

public interface TwoFactorService {
    TwoFactorSetupResponse setupTotp(Long userId);
    boolean verifyAndEnableTotp(Long userId, String code);
    TokenResponse verifyTotpLogin(String tempToken, String code, String userAgent);
}
