package com.orthopedic.api.auth.service;

import com.orthopedic.api.auth.dto.AdminSessionDto;
import com.orthopedic.api.auth.dto.SessionDto;
import com.orthopedic.api.auth.dto.response.LoginHistoryResponse;
import com.orthopedic.api.auth.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface UserSessionService {

    /**
     * Get all active sessions for moderation (SUPER_ADMIN).
     */
    List<AdminSessionDto> getAllActiveSessions();

    /**
     * Force logout a user (SUPER_ADMIN).
     */
    void forceLogout(UUID userId);

    /**
     * Get all active sessions for the given user.
     */
    List<SessionDto> getActiveSessions(User user, String currentAccessTokenJti);

    /**
     * Revoke a specific session.
     */
    void revokeSession(User user, UUID sessionId);

    /**
     * Revoke all sessions except the current one.
     */
    void revokeOtherSessions(User user, String currentAccessTokenJti);

    /**
     * Get login history.
     */
    Page<LoginHistoryResponse> getLoginHistory(User user, Pageable pageable);

    /**
     */
    void clearLoginHistory(User user);
}
