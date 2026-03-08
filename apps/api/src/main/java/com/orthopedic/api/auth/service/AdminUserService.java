package com.orthopedic.api.auth.service;

import com.orthopedic.api.auth.dto.request.UserFilterRequest;
import com.orthopedic.api.auth.dto.request.UserUpdateDto;
import com.orthopedic.api.auth.dto.response.RoleSummaryResponse;
import com.orthopedic.api.auth.dto.response.UserDetailResponse;
import com.orthopedic.api.auth.dto.response.UserSummaryResponse;
import com.orthopedic.api.shared.dto.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface AdminUserService {
    PageResponse<UserSummaryResponse> getAllUsers(UserFilterRequest filters, Pageable pageable);

    List<RoleSummaryResponse> getRolesSummary();

    UserDetailResponse getUserById(UUID id);

    UserDetailResponse updateUser(UUID id, UserUpdateDto updateDto);

    void lockUser(UUID id, int minutes);

    void unlockUser(UUID id);

    void deleteUser(UUID id);

    void resetPassword(UUID id, String newPassword);

    void updateUserEnabledStatus(UUID id, boolean enabled);
}
