package com.orthopedic.api.auth.service;

import com.orthopedic.api.auth.dto.SessionDto;
import com.orthopedic.api.auth.entity.User;

import java.util.List;
import java.util.UUID;

public interface UserSessionService {

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
     * Get login history (all sessions, active and inactive) for the given user.
     */
    List<SessionDto> getLoginHistory(User user);

    /**
     * Clear all inactive sessions for the given user.
     */
    void clearLoginHistory(User user);
}
