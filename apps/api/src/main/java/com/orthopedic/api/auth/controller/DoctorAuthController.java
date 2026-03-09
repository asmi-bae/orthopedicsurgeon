package com.orthopedic.api.auth.controller;

import com.orthopedic.api.auth.dto.*;
import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.auth.service.AdminAuthService;
import com.orthopedic.api.auth.service.AuthService;
import com.orthopedic.api.auth.service.UserSessionService;
import com.orthopedic.api.rbac.annotation.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/doctor/auth")
@Tag(name = "Doctor Authentication", description = "Endpoints for Doctor authentication and session management")
@RequiredArgsConstructor
public class DoctorAuthController {

    private final AdminAuthService adminAuthService;
    private final AuthService authService;
    private final UserSessionService sessionService;

    @Value("${app.auth.cookie-name.refresh:refreshToken}")
    private String refreshTokenCookieName;

    @Value("${app.auth.cookie-name.access:accessToken}")
    private String accessTokenCookieName;

    @PostMapping("/login")
    @Operation(summary = "Doctor login step 1", description = "Initiate doctor login, returns session token for MFA step")
    public ResponseEntity<AdminLoginResponse> login(
            @Valid @RequestBody AdminLoginRequest request,
            HttpServletRequest httpRequest) {

        String ipAddress = getClientIP(httpRequest);
        String userAgent = httpRequest.getHeader("User-Agent");

        return ResponseEntity.ok(adminAuthService.adminLogin(request, ipAddress, userAgent, "DOCTOR_ADMIN"));
    }

    @PostMapping("/login/mfa")
    @Operation(summary = "Doctor login step 2 (MFA)", description = "Verify MFA code and issue JWT tokens")
    public ResponseEntity<AdminMfaResponse> verifyMfa(
            @Valid @RequestBody AdminMfaRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {

        String ipAddress = getClientIP(httpRequest);
        String userAgent = httpRequest.getHeader("User-Agent");

        AdminMfaResponse response = adminAuthService.adminMfaVerify(request, ipAddress, userAgent);

        if (response.getRefreshToken() != null) {
            addRefreshTokenCookie(httpResponse, response.getRefreshToken());
        }
        if (response.getAccessToken() != null) {
            addAccessTokenCookie(httpResponse, response.getAccessToken());
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    @Operation(summary = "Get current authenticated doctor profile")
    public ResponseEntity<UserDto> getCurrentUser(@CurrentUser User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(UserDto.fromEntity(user));
    }

    @PostMapping("/refresh")
    @Operation(summary = "Refresh access token", description = "Get a new access token using a valid refresh token")
    public ResponseEntity<TokenResponse> refresh(@Valid @RequestBody RefreshTokenRequest request,
            HttpServletResponse httpResponse) {
        TokenResponse response = adminAuthService.refreshAdminToken(request.getRefreshToken());

        if (response.getRefreshToken() != null) {
            addRefreshTokenCookie(httpResponse, response.getRefreshToken());
        }
        if (response.getAccessToken() != null) {
            addAccessTokenCookie(httpResponse, response.getAccessToken());
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout doctor", description = "Invalidate tokens and end the session")
    public ResponseEntity<Void> logout(HttpServletRequest httpRequest,
            HttpServletResponse httpResponse,
            @Valid @RequestBody RefreshTokenRequest request) {
        String authHeader = httpRequest.getHeader("Authorization");
        String accessToken = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            accessToken = authHeader.substring(7);
        }

        adminAuthService.adminLogout(accessToken, request.getRefreshToken());
        clearAllCookies(httpResponse);
        return ResponseEntity.ok().build();
    }

    private void addRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        Cookie cookie = new Cookie(refreshTokenCookieName, refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
        response.addCookie(cookie);
    }

    private void addAccessTokenCookie(HttpServletResponse response, String accessToken) {
        Cookie cookie = new Cookie(accessTokenCookieName, accessToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(15 * 60); // 15 mins (match policy)
        response.addCookie(cookie);
    }

    private void clearAllCookies(HttpServletResponse response) {
        clearCookie(response, refreshTokenCookieName);
        clearCookie(response, accessTokenCookieName);
    }

    private void clearCookie(HttpServletResponse response, String name) {
        Cookie cookie = new Cookie(name, null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }

    @PostMapping("/forgot-password")
    @Operation(summary = "Request password reset for doctor account")
    public ResponseEntity<Void> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        authService.forgotPassword(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password/{token}")
    @Operation(summary = "Reset doctor password using a reset token")
    public ResponseEntity<Void> resetPassword(
            @PathVariable String token,
            @Valid @RequestBody ResetPasswordRequest request,
            HttpServletRequest httpRequest) {
        request.setToken(token);
        String ip = getClientIP(httpRequest);
        String userAgent = httpRequest.getHeader("User-Agent");
        authService.resetPassword(request, ip, userAgent);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout/all-sessions")
    @Operation(summary = "Logout from all sessions")
    public ResponseEntity<Void> logoutAllSessions(@CurrentUser User user) {
        sessionService.revokeOtherSessions(user, null);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/session/verify")
    @Operation(summary = "Verify current session")
    public ResponseEntity<Void> verifySession() {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/session/heartbeat")
    @Operation(summary = "Session heartbeat")
    public ResponseEntity<Void> sessionHeartbeat() {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/2fa/setup/begin")
    @Operation(summary = "Initiate 2FA setup")
    public ResponseEntity<Object> setup2faBegin(@CurrentUser User user) {
        return ResponseEntity.ok(Map.of("secret", "dummy-secret"));
    }

    @PostMapping("/2fa/setup/verify")
    @Operation(summary = "Verify and enable 2FA")
    public ResponseEntity<Object> setup2faVerify(@CurrentUser User user, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(Map.of("success", true));
    }

    @PostMapping("/2fa/backup-codes/regenerate")
    @Operation(summary = "Regenerate 2FA backup codes")
    public ResponseEntity<List<String>> regenerateBackupCodes(@CurrentUser User user) {
        return ResponseEntity.ok(List.of());
    }

    @PostMapping("/passkey/register/begin")
    @Operation(summary = "Initiate Passkey registration")
    public ResponseEntity<Object> passkeyRegisterBegin(@CurrentUser User user) {
        return ResponseEntity.ok(Map.of());
    }

    @PostMapping("/passkey/register/complete")
    @Operation(summary = "Complete Passkey registration")
    public ResponseEntity<Object> passkeyRegisterComplete(@CurrentUser User user, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("success", true));
    }

    @GetMapping("/sso/providers")
    @PreAuthorize("hasAnyRole('DOCTOR_ADMIN', 'SUPER_ADMIN')")
    @Operation(summary = "Get all SSO providers")
    public ResponseEntity<List<Object>> getSsoProviders() {
        return ResponseEntity.ok(List.of());
    }

    @PutMapping("/sso/providers/{id}")
    @PreAuthorize("hasAnyRole('DOCTOR_ADMIN', 'SUPER_ADMIN')")
    @Operation(summary = "Update SSO provider configuration")
    public ResponseEntity<Void> updateSsoProvider(@PathVariable String id, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok().build();
    }
}
