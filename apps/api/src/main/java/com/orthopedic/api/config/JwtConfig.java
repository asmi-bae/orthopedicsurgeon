package com.orthopedic.api.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "jwt")
@Getter
@Setter
public class JwtConfig {
    // 🔒 SECURITY: RS256 RSA keys are loaded from environment variables
    private String privateKeyPath;
    private String publicKeyPath;
    
    // Default values if not in env
    private long accessTokenExpiry = 900; // 15 min
    private long refreshTokenExpiry = 604800; // 7 days
}
