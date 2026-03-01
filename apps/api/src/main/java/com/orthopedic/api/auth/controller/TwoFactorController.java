package com.orthopedic.api.auth.controller;

import com.orthopedic.api.auth.dto.TokenResponse;
import com.orthopedic.api.auth.dto.TwoFactorRequest;
import com.orthopedic.api.auth.dto.TwoFactorSetupResponse;
import com.orthopedic.api.auth.security.CustomUserDetails;
import com.orthopedic.api.auth.service.TwoFactorService;
import com.orthopedic.api.rbac.annotation.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth/2fa")
@RequiredArgsConstructor
@Tag(name = "Two Factor Authentication", description = "Endpoints for 2FA setup and verification")
public class TwoFactorController {

    private final TwoFactorService twoFactorService;

    @PostMapping("/setup")
    @Operation(summary = "Initiate TOTP setup for admin/doctor")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<TwoFactorSetupResponse> setup(@CurrentUser UserDetails userDetails) {
        CustomUserDetails customUser = (CustomUserDetails) userDetails;
        return ResponseEntity.ok(twoFactorService.setupTotp(customUser.getUser().getId()));
    }

    @PostMapping("/confirm-setup")
    @Operation(summary = "Confirm and enable TOTP after verifying first code")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<Void> confirmSetup(@CurrentUser UserDetails userDetails, @RequestBody String code) {
        CustomUserDetails customUser = (CustomUserDetails) userDetails;
        if (twoFactorService.verifyAndEnableTotp(customUser.getUser().getId(), code)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/verify")
    @Operation(summary = "Complete login with TOTP verification")
    public ResponseEntity<TokenResponse> verify(@Valid @RequestBody TwoFactorRequest request, HttpServletRequest servletRequest) {
        String userAgent = servletRequest.getHeader("User-Agent");
        return ResponseEntity.ok(twoFactorService.verifyTotpLogin(request.getTempToken(), request.getTotpCode(), userAgent));
    }
}
