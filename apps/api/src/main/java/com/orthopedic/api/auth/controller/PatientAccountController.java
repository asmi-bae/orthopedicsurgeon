package com.orthopedic.api.auth.controller;

import com.orthopedic.api.auth.dto.UserDto;
import com.orthopedic.api.auth.dto.request.ChangePasswordRequest;
import com.orthopedic.api.auth.dto.request.UpdateProfileRequest;
import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.auth.service.AccountService;
import com.orthopedic.api.rbac.annotation.CurrentUser;
import com.orthopedic.api.shared.base.BaseController;
import com.orthopedic.api.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/patient/account")
@Tag(name = "Patient Account Management", description = "Endpoints for patients to manage their own account")
@PreAuthorize("hasRole('PATIENT')")
@RequiredArgsConstructor
public class PatientAccountController extends BaseController {

    private final AccountService accountService;

    @GetMapping("/profile")
    @Operation(summary = "Get current patient profile")
    public ResponseEntity<ApiResponse<UserDto>> getProfile(@CurrentUser User user) {
        return ok(UserDto.fromEntity(user));
    }

    @PutMapping("/profile")
    @Operation(summary = "Update current patient profile")
    public ResponseEntity<ApiResponse<UserDto>> updateProfile(
            @CurrentUser User user,
            @Valid @RequestBody UpdateProfileRequest request) {
        return ok("Profile updated successfully", accountService.updateProfile(user, request));
    }

    @PostMapping("/password")
    @Operation(summary = "Change current patient password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @CurrentUser User user,
            @Valid @RequestBody ChangePasswordRequest request) {
        accountService.changePassword(user, request.getOldPassword(), request.getNewPassword());
        return ok("Password changed successfully", null);
    }
}
