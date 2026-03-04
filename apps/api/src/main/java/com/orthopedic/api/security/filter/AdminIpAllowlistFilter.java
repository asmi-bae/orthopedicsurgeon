package com.orthopedic.api.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class AdminIpAllowlistFilter extends OncePerRequestFilter {

    private final StringRedisTemplate redisTemplate;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        // Only apply to admin endpoints
        if (!path.startsWith("/api/v1/admin")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Bypass check for public admin auth if any
        if (path.startsWith("/api/v1/admin/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        String clientIp = getClientIp(request);
        Boolean isAllowed = redisTemplate.opsForSet().isMember("admin:allowlist:ips", clientIp);

        if (Boolean.FALSE.equals(isAllowed)) {
            log.warn("🚨 Unauthorized admin access attempt from IP: {}", clientIp);
            response.setStatus(HttpStatus.FORBIDDEN.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.getWriter()
                    .write("{\"code\": \"ADMIN_IP_RESTRICTED\", \"message\": \"Access denied from this location\"}");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest request) {
        String xf = request.getHeader("X-Forwarded-For");
        return (xf != null) ? xf.split(",")[0].trim() : request.getRemoteAddr();
    }
}
