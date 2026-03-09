package com.orthopedic.api.auth.service;

import com.orthopedic.api.config.JwtConfig;
import com.orthopedic.api.auth.entity.RefreshToken;
import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.auth.repository.RefreshTokenRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Transactional
public class TokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtConfig jwtConfig;

    public TokenService(RefreshTokenRepository refreshTokenRepository, JwtConfig jwtConfig) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtConfig = jwtConfig;
    }

    public RefreshToken createRefreshToken(User user, String deviceInfo) {
        // Delete existing token if any (standard rotation/cleanup)
        refreshTokenRepository.deleteByUser(user);

        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiryDate(LocalDateTime.now().plusSeconds(jwtConfig.getRefreshTokenExpiry()))
                .deviceInfo(deviceInfo)
                .isRevoked(false)
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().isBefore(LocalDateTime.now())) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException("Refresh token was expired. Please make a new signin request");
        }
        return token;
    }

    public RefreshToken rotateRefreshToken(String tokenValue, String deviceInfo) {
        RefreshToken oldToken = refreshTokenRepository.findByToken(tokenValue)
                .orElseThrow(() -> new com.orthopedic.api.shared.exception.ResourceNotFoundException("Refresh token not found"));

        if (oldToken.isRevoked()) {
            // 🚨 SECURITY: If a revoked token is used, someone might be stealing it.
            // Revoke all tokens for this user as a precaution.
            refreshTokenRepository.deleteByUser(oldToken.getUser());
            throw new RuntimeException("Refresh token is revoked. Potential security breach.");
        }

        verifyExpiration(oldToken);

        // Rotate in-place with a single UPDATE — avoids DELETE + INSERT (2 trips → 1)
        String newTokenValue = UUID.randomUUID().toString();
        LocalDateTime newExpiry = LocalDateTime.now().plusSeconds(jwtConfig.getRefreshTokenExpiry());
        refreshTokenRepository.rotateToken(tokenValue, newTokenValue, newExpiry, deviceInfo);

        // Return a lightweight object with updated values for downstream use
        oldToken.setToken(newTokenValue);
        oldToken.setExpiryDate(newExpiry);
        oldToken.setDeviceInfo(deviceInfo);
        return oldToken;
    }

    public void deleteRefreshToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }

    public void revokeAllUserTokens(User user) {
        refreshTokenRepository.deleteByUser(user);
    }
}
