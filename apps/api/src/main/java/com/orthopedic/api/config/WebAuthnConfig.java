package com.orthopedic.api.config;

import com.orthopedic.api.auth.service.WebAuthnCredentialRepository;
import com.yubico.webauthn.RelyingParty;
import com.yubico.webauthn.data.RelyingPartyIdentity;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Set;

@Configuration
public class WebAuthnConfig {

    @org.springframework.beans.factory.annotation.Value("${app.frontend.admin-url}")
    private String adminUrl;

    @org.springframework.beans.factory.annotation.Value("${app.frontend.public-url}")
    private String publicUrl;

    @Bean
    public RelyingParty relyingParty(WebAuthnCredentialRepository credentialRepository) {
        RelyingPartyIdentity rpIdentity = RelyingPartyIdentity.builder()
                .id("localhost") // Set to application domain in production
                .name("Orthopedic Surgeon Platform")
                .build();

        return RelyingParty.builder()
                .identity(rpIdentity)
                .credentialRepository(credentialRepository)
                .origins(Set.of(adminUrl, publicUrl))
                .build();
    }
}
