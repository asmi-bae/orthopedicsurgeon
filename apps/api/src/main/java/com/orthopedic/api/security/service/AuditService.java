package com.orthopedic.api.security.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import com.orthopedic.api.auth.entity.User;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuditService {

    // private final AuditRepository auditRepository;

    @Async
    public void logEvent(String action, String userId, String userRole, String entityType, String entityId,
            Map<String, Object> details, boolean success) {
        // Implementation to save to DB
        log.info("📊 AUDIT [{}]: action={}, user={}, role={}, entity={}:{}, success={}, details={}",
                UUID.randomUUID(), action, userId, userRole, entityType, entityId, success, details);

        // In a real implementation, this would save to an 'audit_logs' table
    }

    @Async
    public void logSecurityAlert(String type, String ip, String userId, String reason) {
        log.error("🚨 SECURITY ALERT [{}]: type={}, ip={}, user={}, reason={}",
                UUID.randomUUID(), type, ip, userId, reason);
    }

    @Async
    public void logFailedLogin(String email, String ipAddress, String userAgent, String reason) {
        log.warn("❌ FAILED LOGIN [{}]: email={}, ip={}, userAgent={}, reason={}",
                UUID.randomUUID(), email, ipAddress, userAgent, reason);
    }

    @Async
    public void logSuccessfulLogin(String email, String ipAddress, String userAgent, String method) {
        log.info("✅ SUCCESSFUL LOGIN [{}]: email={}, ip={}, userAgent={}, method={}",
                UUID.randomUUID(), email, ipAddress, userAgent, method);
    }

    @Async
    public void logAudit(User user, String ipAddress, String userAgent, String action) {
        log.info("📊 AUDIT [{}]: email={}, ip={}, userAgent={}, action={}",
                UUID.randomUUID(), user != null ? user.getEmail() : "unknown", ipAddress, userAgent, action);
    }
}
