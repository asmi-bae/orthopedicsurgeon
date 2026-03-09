package com.orthopedic.api.auth.repository;

import com.orthopedic.api.auth.entity.RefreshToken;
import com.orthopedic.api.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {

    Optional<RefreshToken> findByToken(String token);

    @Modifying
    void deleteByToken(String token);

    @Modifying
    void deleteByUser(User user);

    Optional<RefreshToken> findByUserAndIsRevokedFalse(User user);

    /**
     * Rotates a refresh token in-place via a single UPDATE statement.
     * Replaces DELETE + INSERT pattern with one DB round-trip.
     */
    @Modifying
    @Query("UPDATE RefreshToken r SET r.token = :newToken, r.expiryDate = :newExpiry, r.deviceInfo = :deviceInfo, r.isRevoked = false WHERE r.token = :oldToken")
    int rotateToken(@Param("oldToken") String oldToken,
                    @Param("newToken") String newToken,
                    @Param("newExpiry") LocalDateTime newExpiry,
                    @Param("deviceInfo") String deviceInfo);
}
