package com.orthopedic.api.security.filter;

import com.orthopedic.api.auth.security.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);

        try {
            if (tokenProvider.validateToken(token)) {
                io.jsonwebtoken.Claims claims = tokenProvider.getClaimsFromToken(token);

                String username = claims.getSubject();
                List<String> roles = (List<String>) claims.get("roles");

                // Device fingerprint check (simplified for now)
                String storedFingerprint = (String) claims.get("deviceFingerprint");
                String currentFingerprint = getDeviceFingerprint(request);

                if (storedFingerprint != null && !storedFingerprint.equals(currentFingerprint)) {
                    log.warn("⚠️ Device fingerprint mismatch for user: {}", username);
                    // On admin surface, we might want to reject. On public, we just log.
                    if (request.getRequestURI().startsWith("/api/v1/admin")) {
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        return;
                    }
                }

                var authorities = roles.stream()
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username,
                        null,
                        authorities);

            }

        } catch (Exception e) {
            log.error("❌ JWT Validation failed: {}", e.getMessage());
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }

    private String getDeviceFingerprint(HttpServletRequest request) {
        String ua = request.getHeader("User-Agent");
        String al = request.getHeader("Accept-Language");
        String df = request.getHeader("X-Device-Fingerprint");
        return (ua != null ? ua : "") + "|" + (al != null ? al : "") + "|" + (df != null ? df : "");
    }
}
