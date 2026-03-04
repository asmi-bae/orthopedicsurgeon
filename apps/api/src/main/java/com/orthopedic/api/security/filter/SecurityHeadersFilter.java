package com.orthopedic.api.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityHeadersFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        response.setHeader("X-Content-Type-Options", "nosniff");
        response.setHeader("X-Frame-Options", "DENY");
        response.setHeader("X-XSS-Protection", "1; mode=block");
        response.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

        // Content Security Policy
        response.setHeader("Content-Security-Policy",
                "default-src 'none'; " +
                        "script-src 'self'; " +
                        "style-src 'self'; " +
                        "img-src 'self' data: https:; " +
                        "connect-src 'self'; " +
                        "font-src 'self'; " +
                        "frame-ancestors 'none'; " +
                        "form-action 'self'; " +
                        "base-uri 'self'");

        response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
        response.setHeader("Permissions-Policy",
                "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=()");
        response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");

        // Remove dangerous/leaking headers
        response.setHeader("Server", "");
        response.setHeader("X-Powered-By", "");

        // API Version
        response.setHeader("X-Api-Version", "1.0");

        filterChain.doFilter(request, response);
    }
}
