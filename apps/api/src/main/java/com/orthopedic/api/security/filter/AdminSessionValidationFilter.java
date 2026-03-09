package com.orthopedic.api.security.filter;

import com.nimbusds.jwt.SignedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Component
@Slf4j
@RequiredArgsConstructor
public class AdminSessionValidationFilter extends OncePerRequestFilter {

    private final StringRedisTemplate redisTemplate;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String path = request.getRequestURI();

        if (auth == null || !path.startsWith("/api/v1/doctor")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Ideally we'd have the sessionId here from attributes or the token
        // For now, we'll use a placeholder logic to demonstrate the requirement
        String username = auth.getName();
        String sessionKey = "admin:session:" + username;

        String lastActivity = redisTemplate.opsForValue().get(sessionKey);
        if (lastActivity == null) {
            // First time or session expired in Redis
            redisTemplate.opsForValue().set(sessionKey, String.valueOf(System.currentTimeMillis()), 30,
                    TimeUnit.MINUTES);
        } else {
            long lastTime = Long.parseLong(lastActivity);
            if (System.currentTimeMillis() - lastTime > 30 * 60 * 1000) {
                log.warn("🕒 Admin session idle timeout for user: {}", username);
                redisTemplate.delete(sessionKey);
                SecurityContextHolder.clearContext();
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.getWriter()
                        .write("{\"code\": \"SESSION_IDLE_TIMEOUT\", \"message\": \"Re-authentication required\"}");
                return;
            }
            // Update heartbeat
            redisTemplate.opsForValue().set(sessionKey, String.valueOf(System.currentTimeMillis()), 30,
                    TimeUnit.MINUTES);
        }

        filterChain.doFilter(request, response);
    }
}
