package com.orthopedic.api.security.filter;

import com.orthopedic.api.config.AdminSecurityProperties;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class AdminIpAllowlistFilter extends OncePerRequestFilter {

    private final StringRedisTemplate redisTemplate;
    private final AdminSecurityProperties adminSecurityProperties;
    private final Environment environment;

    private static final List<String> LOCALHOST_IPS = Arrays.asList("127.0.0.1", "0:0:0:0:0:0:0:1", "::1");

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        // Only apply to admin endpoints
        if (!path.startsWith("/api/v1/doctor")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Bypass IP check if disabled in properties
        if (!adminSecurityProperties.isEnableIpCheck()) {
            filterChain.doFilter(request, response);
            return;
        }

        // Bypass check for public admin auth
        if (path.startsWith("/api/v1/doctor/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        String clientIp = getClientIp(request);
        
        // Always allow localhost if 'local' profile is active
        if (isLocalProfile() && LOCALHOST_IPS.contains(clientIp)) {
            filterChain.doFilter(request, response);
            return;
        }

        if (isIpAllowed(clientIp)) {
            filterChain.doFilter(request, response);
        } else {
            log.warn("🚨 Unauthorized admin access attempt! IP: {} | Path: {} | Headers: {}", 
                clientIp, path, getIpRelatedHeaders(request));
            
            response.setStatus(HttpStatus.FORBIDDEN.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.getWriter()
                    .write("{\"code\": \"ADMIN_IP_RESTRICTED\", \"message\": \"Access denied from this location\"}");
        }
    }

    private boolean isIpAllowed(String ip) {
        // 1. Check static allowlist from properties
        if (adminSecurityProperties.getIpAllowlist().contains(ip)) {
            return true;
        }

        // 2. Check dynamic allowlist from Redis (if Redis is active, otherwise skip)
        try {
            Boolean isMember = redisTemplate.opsForSet().isMember("admin:allowlist:ips", ip);
            if (Boolean.TRUE.equals(isMember)) {
                return true;
            }
        } catch (Exception e) {
            log.error("❌ Redis error while checking admin IP allowlist: {}", e.getMessage());
        }

        return false;
    }

    private String getClientIp(HttpServletRequest request) {
        // Production-grade IP detection via common proxy headers
        String[] headers = {
            "X-Forwarded-For",
            "X-Real-IP",
            "Proxy-Client-IP",
            "WL-Proxy-Client-IP",
            "HTTP_X_FORWARDED_FOR",
            "HTTP_X_FORWARDED",
            "HTTP_X_CLUSTER_CLIENT_IP",
            "HTTP_CLIENT_IP",
            "HTTP_FORWARDED_FOR",
            "HTTP_FORWARDED",
            "HTTP_VIA",
            "REMOTE_ADDR"
        };

        for (String header : headers) {
            String value = request.getHeader(header);
            if (value != null && !value.isEmpty() && !"unknown".equalsIgnoreCase(value)) {
                // X-Forwarded-For can contain multiple IPs, the first one is the client
                return value.split(",")[0].trim();
            }
        }
        
        return request.getRemoteAddr();
    }

    private String getIpRelatedHeaders(HttpServletRequest request) {
        return String.format("X-Forwarded-For: %s, X-Real-IP: %s", 
            request.getHeader("X-Forwarded-For"), 
            request.getHeader("X-Real-IP"));
    }

    private boolean isLocalProfile() {
        return Arrays.asList(environment.getActiveProfiles()).contains("local");
    }
}
