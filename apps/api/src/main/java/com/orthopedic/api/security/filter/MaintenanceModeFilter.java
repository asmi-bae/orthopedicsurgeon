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
public class MaintenanceModeFilter extends OncePerRequestFilter {

    private final StringRedisTemplate redisTemplate;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        // 🚑 Public health check always pass
        if ("/api/v1/public/health-check".equals(path)) {
            filterChain.doFilter(request, response);
            return;
        }

        String isMaintenance = redisTemplate.opsForValue().get("maintenance:mode");
        if ("true".equals(isMaintenance)) {
            String clientIp = getClientIp(request);
            Boolean isAllowed = redisTemplate.opsForSet().isMember("maintenance:allowed:ips", clientIp);

            if (Boolean.FALSE.equals(isAllowed)) {
                String resumeTime = redisTemplate.opsForValue().get("maintenance:resume");
                String reason = redisTemplate.opsForValue().get("maintenance:reason");

                response.setStatus(HttpStatus.SERVICE_UNAVAILABLE.value());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.getWriter().write(String.format(
                        "{\"code\": \"MAINTENANCE_MODE\", \"message\": \"%s\", \"estimatedResume\": \"%s\"}",
                        reason != null ? reason : "System is under maintenance",
                        resumeTime != null ? resumeTime : "TBD"));
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest request) {
        String xf = request.getHeader("X-Forwarded-For");
        return (xf != null) ? xf.split(",")[0].trim() : request.getRemoteAddr();
    }
}
