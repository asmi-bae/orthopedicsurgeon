package com.orthopedic.api.auth.repository;

import com.orthopedic.api.auth.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SessionRepository extends JpaRepository<Session, UUID> {
    List<Session> findByUserIdAndIsActiveTrue(UUID userId);

    Optional<Session> findByAccessTokenJti(UUID accessTokenJti);

    Optional<Session> findBySessionIdAndUserId(UUID sessionId, UUID userId);

    List<Session> findByUser(com.orthopedic.api.auth.entity.User user);

    List<Session> findAllByIsActiveTrue();

    /**
     * Deactivates all active sessions for a user in a single UPDATE.
     * Called before inserting a fresh session on token refresh to avoid
     * the unique constraint violation on access_token_jti.
     */
    @Modifying
    @Query("UPDATE Session s SET s.isActive = false WHERE s.user.id = :userId AND s.isActive = true")
    int deactivateAllActiveSessions(@Param("userId") UUID userId);

    @Modifying
    @Query("UPDATE Session s SET s.accessTokenJti = :newJti, s.refreshTokenHash = :newHash, s.lastActivity = :now WHERE s.refreshTokenHash = :oldHash AND s.isActive = true")
    int updateSessionOnRefresh(@Param("oldHash") String oldHash,
                               @Param("newHash") String newHash,
                               @Param("newJti") UUID newJti,
                               @Param("now") java.time.LocalDateTime now);
}
