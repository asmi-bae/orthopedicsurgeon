package com.orthopedic.api.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class ApiControlFilter extends OncePerRequestFilter {

    private final StringRedisTemplate redisTemplate;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String method = request.getMethod();
        String path = request.getRequestURI();
        String endpointKey = String.format("%s:%s", method, path);

        // 1. Check if endpoint is disabled
        String disabledReason = redisTemplate.opsForValue().get("api:disabled:" + endpointKey);
        if (disabledReason != null) {
            response.setStatus(HttpStatus.SERVICE_UNAVAILABLE.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.getWriter().write(String.format(
                    "{\"code\": \"API_DISABLED\", \"reason\": \"%s\"}",
                    disabledReason));
            return;
        }

        // 2. Increment metrics (async-like via Redis)
        redisTemplate.opsForValue().increment("api:count:" + endpointKey);

        filterChain.doFilter(request, response);
    }
}
