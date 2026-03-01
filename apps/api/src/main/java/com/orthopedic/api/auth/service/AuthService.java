package com.orthopedic.api.auth.service;

import com.orthopedic.api.auth.dto.*;

public interface AuthService {
    LoginResponse login(LoginRequest request, String ipAddress, String userAgent);
    RegisterResponse register(RegisterRequest request);
    TokenResponse refreshToken(String refreshToken);
    void logout(String accessToken, String refreshToken);
}
