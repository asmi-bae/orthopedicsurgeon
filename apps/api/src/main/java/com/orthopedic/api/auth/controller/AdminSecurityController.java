package com.orthopedic.api.auth.controller;
 
import com.orthopedic.api.auth.dto.AdminSessionDto;
import com.orthopedic.api.auth.dto.SessionDto;
import com.orthopedic.api.auth.dto.TrustedDeviceDto;
import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.auth.security.JwtTokenProvider;
import com.orthopedic.api.auth.service.AccountService;
import com.orthopedic.api.auth.service.PasskeyService;
import com.orthopedic.api.auth.service.TotpService;
import com.orthopedic.api.auth.service.TrustedDeviceService;
import com.orthopedic.api.auth.service.UserSessionService;
import com.orthopedic.api.rbac.annotation.CurrentUser;
import com.yubico.webauthn.RegistrationResult;
import com.yubico.webauthn.data.PublicKeyCredentialCreationOptions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
 
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
 
import com.orthopedic.api.auth.dto.response.LoginHistoryResponse;
 
@RestController
@RequestMapping("/api/v1/admin/security")
@Tag(name = "Admin Security Management", description = "Unified endpoints for admin account security (MFA, Passkeys, Sessions)")
@RequiredArgsConstructor
public class AdminSecurityController {
 
    private final TotpService totpService;
    private final PasskeyService passkeyService;
    private final AccountService accountService;
    private final UserSessionService sessionService;
    private final TrustedDeviceService trustedDeviceService;
    private final JwtTokenProvider tokenProvider;
 
    @GetMapping("/2fa/setup")
    @Operation(summary = "Initiate TOTP setup for current admin")
    public ResponseEntity<Map<String, String>> setup2fa(@CurrentUser User user) {
        String secret = totpService.generateSecret();
        String qrCode = totpService.getQrCodeUri(secret, user.getEmail());
 
        Map<String, String> response = new HashMap<>();
        response.put("secret", secret);
        response.put("qrCode", qrCode);
        return ResponseEntity.ok(response);
    }
 
    @PostMapping("/2fa/confirm")
    @Operation(summary = "Confirm and enable TOTP")
    public ResponseEntity<List<String>> enable2fa(@CurrentUser User user, @RequestBody Map<String, String> body) {
        String secret = body.get("secret");
        String code = body.get("code");
 
        if (!totpService.verifyCode(secret, code)) {
            return ResponseEntity.badRequest().build();
        }
 
        List<String> backupCodes = totpService.generateBackupCodes();
        totpService.enableTotp(user, secret, backupCodes);
        return ResponseEntity.ok(backupCodes);
    }
 
    @PostMapping("/2fa/disable")
    @Operation(summary = "Disable TOTP for current admin")
    public ResponseEntity<Void> disable2fa(@CurrentUser User user) {
        totpService.disableTotp(user);
        return ResponseEntity.ok().build();
    }
 
    @GetMapping("/2fa/status")
    @Operation(summary = "Get current admin 2FA status")
    public ResponseEntity<Map<String, Object>> get2faStatus(@CurrentUser User user) {
        Map<String, Object> response = new HashMap<>();
        response.put("enabled", totpService.isTotpEnabled(user));
        return ResponseEntity.ok(response);
    }
 
    @GetMapping("/passkey/registration/options")
    @Operation(summary = "Get options for registering a new Passkey")
    public ResponseEntity<PublicKeyCredentialCreationOptions> getPasskeyRegistrationOptions(@CurrentUser User user) {
        return ResponseEntity.ok(passkeyService.startRegistration(user.getEmail()));
    }
 
    @PostMapping("/passkey/registration/finish")
    @Operation(summary = "Complete Passkey registration")
    public ResponseEntity<Map<String, Object>> finishPasskeyRegistration(@CurrentUser User user, @RequestBody Map<String, String> body) {
        String credentialResponseJson = body.get("credentialResponseJson");
        RegistrationResult result = passkeyService.finishRegistration(user.getEmail(), credentialResponseJson);
        return ResponseEntity.ok(Map.of("success", true, "keyId", result.getKeyId().getId().getBase64Url()));
    }
 
    @GetMapping("/my-sessions")
    @Operation(summary = "Get all active sessions for current admin")
    public ResponseEntity<List<SessionDto>> getMySessions(@CurrentUser User user, HttpServletRequest request) {
        String jti = extractJti(request);
        return ResponseEntity.ok(sessionService.getActiveSessions(user, jti));
    }
 
    @DeleteMapping("/sessions/{sessionId}")
    @Operation(summary = "Revoke a specific session")
    public ResponseEntity<Void> revokeSession(@CurrentUser User user, @PathVariable UUID sessionId) {
        sessionService.revokeSession(user, sessionId);
        return ResponseEntity.noContent().build();
    }
 
    @DeleteMapping("/sessions/all-except-current")
    @Operation(summary = "Revoke all other active sessions")
    public ResponseEntity<Void> revokeOtherSessions(@CurrentUser User user, HttpServletRequest request) {
        String jti = extractJti(request);
        sessionService.revokeOtherSessions(user, jti);
        return ResponseEntity.noContent().build();
    }
 
    @GetMapping("/my-devices")
    @Operation(summary = "Get all trusted devices for current admin")
    public ResponseEntity<List<TrustedDeviceDto>> getMyDevices(@CurrentUser User user) {
        return ResponseEntity.ok(trustedDeviceService.getTrustedDevices(user));
    }
 
    @DeleteMapping("/devices/{deviceId}")
    @Operation(summary = "Remove a trusted device")
    public ResponseEntity<Void> removeDevice(@CurrentUser User user, @PathVariable UUID deviceId) {
        trustedDeviceService.removeDevice(user, deviceId);
        return ResponseEntity.noContent().build();
    }
 
    @GetMapping("/login-history")
    @Operation(summary = "Get login history for current admin")
    public ResponseEntity<Page<LoginHistoryResponse>> getLoginHistory(@CurrentUser User user, Pageable pageable) {
        return ResponseEntity.ok(sessionService.getLoginHistory(user, pageable));
    }

    @DeleteMapping("/login-history")
    @Operation(summary = "Clear login history for current admin")
    public ResponseEntity<Void> clearLoginHistory(@CurrentUser User user) {
        sessionService.clearLoginHistory(user);
        return ResponseEntity.noContent().build();
    }
 
    @GetMapping("/active-admin-sessions")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "SUPER_ADMIN: Get all active admin sessions")
    public ResponseEntity<List<AdminSessionDto>> getAllActiveSessions() {
        return ResponseEntity.ok(sessionService.getAllActiveSessions());
    }
 
    @DeleteMapping("/force-logout/{userId}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "SUPER_ADMIN: Force logout a user")
    public ResponseEntity<Void> forceLogout(@PathVariable UUID userId) {
        sessionService.forceLogout(userId);
        return ResponseEntity.noContent().build();
    }
 
    @PostMapping("/ip-allowlist")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<Void> updateIpAllowlist(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok().build();
    }
 
    @GetMapping("/ip-allowlist/{userId}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<String>> getIpAllowlist(@PathVariable UUID userId) {
        return ResponseEntity.ok(List.of());
    }
 
    @DeleteMapping("/ip-allowlist/{userId}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<Void> deleteIpAllowlist(@PathVariable UUID userId) {
        return ResponseEntity.noContent().build();
    }
 
    @GetMapping("/alerts")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<List<Object>> getSecurityAlerts() {
        return ResponseEntity.ok(List.of());
    }
 
    @PutMapping("/alerts/{id}/resolve")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<Void> resolveAlert(@PathVariable String id) {
        return ResponseEntity.noContent().build();
    }
 
    @PostMapping("/lock-account/{userId}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<Void> lockAccount(@PathVariable UUID userId) {
        return ResponseEntity.noContent().build();
    }
 
    @PostMapping("/unlock-account/{userId}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<Void> unlockAccount(@PathVariable UUID userId) {
        return ResponseEntity.noContent().build();
    }
 
    @GetMapping("/suspicious-activity")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<Object>> getSuspiciousActivity() {
        return ResponseEntity.ok(List.of());
    }
 
    @PostMapping("/change-password")
    @Operation(summary = "Change current admin password")
    public ResponseEntity<Void> changePassword(@CurrentUser User user, @RequestBody Map<String, String> body) {
        accountService.changePassword(user, body.get("oldPassword"), body.get("newPassword"));
        return ResponseEntity.ok().build();
    }
 
    private String extractJti(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            String token = bearerToken.substring(7);
            return tokenProvider.getJtiFromToken(token);
        }
        return null;
    }
}
