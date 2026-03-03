package com.orthopedic.api.auth.service;

import com.orthopedic.api.auth.dto.*;

public interface AuthService {
    LoginResponse login(LoginRequest request, String ipAddress, String userAgent);

    RegisterResponse register(RegisterRequest request);

    TokenResponse refreshToken(String refreshTokenString);

    void logout(String accessToken, String refreshTokenString);

    TokenResponse verify2fa(Verify2faRequest request, String userAgent);

    // New methods for Auth flows
    LoginResponse googleLogin(GoogleLoginRequest request, String ipAddress, String userAgent);

    void forgotPassword(ForgotPasswordRequest request);

    void resetPassword(ResetPasswordRequest request, String ipAddress, String userAgent);
}
