package com.orthopedic.api.security.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.net.InetAddress;
import java.net.URL;
import java.util.Set;

@Service
@Slf4j
public class SsrfProtectionService {

    private static final Set<String> ALLOWED_PROTOCOLS = Set.of("http", "https");

    public boolean isSafeUrl(String urlString) {
        try {
            URL url = new URL(urlString);

            // 1. Protocol check
            if (!ALLOWED_PROTOCOLS.contains(url.getProtocol().toLowerCase())) {
                log.warn("🚫 Rejected URL with invalid protocol: {}", url.getProtocol());
                return false;
            }

            // 2. Resolve hostname
            String host = url.getHost();
            InetAddress[] addresses = InetAddress.getAllByName(host);

            for (InetAddress addr : addresses) {
                if (isPrivateOrInternal(addr)) {
                    log.error("🚫 SSRF attempt detected! Host {} resolved to restricted IP: {}", host,
                            addr.getHostAddress());
                    return false;
                }
            }

            return true;
        } catch (Exception e) {
            log.warn("❌ Malformed URL provided: {}", urlString);
            return false;
        }
    }

    private boolean isPrivateOrInternal(InetAddress addr) {
        return addr.isLoopbackAddress() ||
                addr.isSiteLocalAddress() ||
                addr.isLinkLocalAddress() ||
                addr.isAnyLocalAddress() ||
                isCloudMetadataService(addr);
    }

    private boolean isCloudMetadataService(InetAddress addr) {
        String ip = addr.getHostAddress();
        return "169.254.169.254".equals(ip); // AWS/GCP/Azure metadata IP
    }
}
