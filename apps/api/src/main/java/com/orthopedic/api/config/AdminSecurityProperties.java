package com.orthopedic.api.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Configuration properties for Admin Security.
 * Allows defining static IP allowlists and toggling IP checks.
 */
@Component
@ConfigurationProperties(prefix = "app.security.admin")
@Getter
@Setter
public class AdminSecurityProperties {

    /**
     * Whether IP-based restriction for admin endpoints is enabled.
     */
    private boolean enableIpCheck = true;

    /**
     * List of static IPs allowed to access admin endpoints.
     * This is checked in addition to the dynamic list in Redis.
     */
    private List<String> ipAllowlist = new ArrayList<>();
}
