package com.orthopedic.api.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SessionCacheService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final Map<String, Object> localCache = new ConcurrentHashMap<>();

    public SessionCacheService(@Autowired(required = false) RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void blacklistToken(String jti, long expirationSeconds) {
        if (redisTemplate != null) {
            redisTemplate.opsForValue().set("blacklist:" + jti, "true", Duration.ofSeconds(expirationSeconds));
        } else {
            localCache.put("blacklist:" + jti, "true");
        }
    }

    public boolean isTokenBlacklisted(String jti) {
        if (redisTemplate != null) {
            return Boolean.TRUE.equals(redisTemplate.hasKey("blacklist:" + jti));
        }
        return localCache.containsKey("blacklist:" + jti);
    }

    public void cacheSession(String sessionId, Object sessionData, long expirationSeconds) {
        if (redisTemplate != null) {
            redisTemplate.opsForValue().set("session:" + sessionId, sessionData, Duration.ofSeconds(expirationSeconds));
        } else {
            localCache.put("session:" + sessionId, sessionData);
        }
    }

    public Object getCachedSession(String sessionId) {
        if (redisTemplate != null) {
            return redisTemplate.opsForValue().get("session:" + sessionId);
        }
        return localCache.get("session:" + sessionId);
    }

    public void invalidateSession(String sessionId) {
        if (redisTemplate != null) {
            redisTemplate.delete("session:" + sessionId);
        } else {
            localCache.remove("session:" + sessionId);
        }
    }
}
