package com.orthopedic.api.security.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthSecurityService {

    private final StringRedisTemplate redisTemplate;
    private final PasswordEncoder passwordEncoder;

    private static final int MAX_ATTEMPTS = 5;
    private static final int LOCKOUT_DURATION_MINUTES = 30;

    public void processFailedLogin(String email, String ip) {
        String attemptKey = "login:fail:" + email + ":" + ip;
        Long attempts = redisTemplate.opsForValue().increment(attemptKey);
        redisTemplate.expire(attemptKey, 15, TimeUnit.MINUTES);

        if (attempts != null && attempts >= MAX_ATTEMPTS) {
            lockAccount(email);
        }
    }

    public void lockAccount(String email) {
        String lockKey = "login:lock:" + email;
        redisTemplate.opsForValue().set(lockKey, "locked", LOCKOUT_DURATION_MINUTES, TimeUnit.MINUTES);
        log.warn("🔒 Account locked due to multiple failed login attempts: {}", email);
    }

    public boolean isAccountLocked(String email) {
        return Boolean.TRUE.equals(redisTemplate.hasKey("login:lock:" + email));
    }

    public void resetFailedAttempts(String email, String ip) {
        redisTemplate.delete("login:fail:" + email + ":" + ip);
    }

    public void validatePasswordStrength(String password) {
        if (password == null || password.length() < 12) {
            throw new IllegalArgumentException("Password must be at least 12 characters long");
        }
        // Add more checks (upper, lower, digit, special)
    }

    /**
     * Normalizes response time to prevent timing attacks/enumeration
     */
    public void normalizeResponseTime(long startTimeMillis) {
        long elapsed = System.currentTimeMillis() - startTimeMillis;
        if (elapsed < 100) {
            try {
                Thread.sleep(100 - elapsed);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}
