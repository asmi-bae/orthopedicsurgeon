package com.orthopedic.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

    @Value("${security.cors.web-origins}")
    private List<String> webOrigins;

    @Value("${security.cors.admin-origins}")
    private List<String> adminOrigins;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        // Configuration for Public API
        CorsConfiguration publicConfig = new CorsConfiguration();
        publicConfig.setAllowedOrigins(webOrigins);
        publicConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        publicConfig.setAllowedHeaders(
                List.of("Authorization", "Content-Type", "X-Idempotency-Key", "X-Device-Fingerprint"));
        publicConfig.setExposedHeaders(List.of("X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset"));
        publicConfig.setAllowCredentials(true);
        publicConfig.setMaxAge(3600L);

        source.registerCorsConfiguration("/api/v1/auth/**", publicConfig);
        source.registerCorsConfiguration("/api/v1/public/**", publicConfig);
        source.registerCorsConfiguration("/api/v1/portal/**", publicConfig);
        source.registerCorsConfiguration("/api/v1/booking/**", publicConfig);

        // Configuration for Admin API
        CorsConfiguration adminConfig = new CorsConfiguration();
        adminConfig.setAllowedOrigins(adminOrigins);
        adminConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        adminConfig.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Device-Fingerprint"));
        adminConfig.setAllowCredentials(true);
        adminConfig.setMaxAge(600L); // Shorter for admin

        source.registerCorsConfiguration("/api/v1/admin/**", adminConfig);

        // Configuration for Shared API (Notifications)
        CorsConfiguration sharedConfig = new CorsConfiguration();
        java.util.List<String> sharedOrigins = new java.util.ArrayList<>();
        if (webOrigins != null) sharedOrigins.addAll(webOrigins);
        if (adminOrigins != null) sharedOrigins.addAll(adminOrigins);
        sharedConfig.setAllowedOrigins(sharedOrigins);
        sharedConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        sharedConfig.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Idempotency-Key", "X-Device-Fingerprint"));
        sharedConfig.setExposedHeaders(List.of("X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset"));
        sharedConfig.setAllowCredentials(true);
        sharedConfig.setMaxAge(3600L);

        source.registerCorsConfiguration("/api/v1/notifications/**", sharedConfig);

        return source;
    }
}
