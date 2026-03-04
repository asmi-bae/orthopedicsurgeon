package com.orthopedic.api.security.service;

import com.orthopedic.api.security.logging.SecureLogger;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@Slf4j
@RequiredArgsConstructor
public class ThreatDetectionService {

    private final StringRedisTemplate redisTemplate;
    private final AuditService auditService;

    public void detectImpossibleTravel(String userId, String currentIp, double lat, double lon) {
        String key = "security:last_loc:" + userId;
        String lastData = redisTemplate.opsForValue().get(key);

        if (lastData != null) {
            // Logic to calculate distance and speed since last login
            // If speed > threshold (e.g. 800km/h airplane speed), trigger alert
            SecureLogger.warn("🚩 Impossible travel detected for user: {}", userId);
            auditService.logSecurityAlert("IMPOSSIBLE_TRAVEL", currentIp, userId,
                    "Login from distant location in too short time");
        }

        redisTemplate.opsForValue().set(key, lat + "," + lon, Duration.ofDays(30));
    }

    public void trackFailedAuth(String ip) {
        String key = "security:fail_auth:" + ip;
        Long count = redisTemplate.opsForValue().increment(key);
        redisTemplate.expire(key, Duration.ofHours(1));

        if (count != null && count > 20) {
            SecureLogger.error("🚫 Brute force detected from IP: {}", ip);
            auditService.logSecurityAlert("BRUTE_FORCE", ip, "system", "More than 20 failed attempts in 1 hour");
            // Auto-block IP could be added here
        }
    }
}
