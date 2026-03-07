package com.orthopedic.api.modules.audit.aspect;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.modules.audit.annotation.LogMutation;
import com.orthopedic.api.modules.audit.dto.request.AuditEventRequest;
import com.orthopedic.api.modules.audit.service.AuditService;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.lang.reflect.Method;

@Aspect
@Component
public class AuditAspect {
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(AuditAspect.class);
    private final AuditService auditService;

    public AuditAspect(AuditService auditService) {
        this.auditService = auditService;
    }

    @AfterReturning(value = "@annotation(com.orthopedic.api.modules.audit.annotation.LogMutation)", returning = "result")
    public void logMutation(JoinPoint joinPoint, Object result) {
        try {
            Method method = getMethod(joinPoint);
            LogMutation annotation = method.getAnnotation(LogMutation.class);
            doLogEvent(annotation.action(), annotation.entityName(), joinPoint);
        } catch (Exception e) {
            log.error("Failed to log audit event via annotation", e);
        }
    }

    @AfterReturning(value = "execution(* com.orthopedic.api..*Controller.*(..)) && (@annotation(org.springframework.web.bind.annotation.PostMapping) || @annotation(org.springframework.web.bind.annotation.PutMapping) || @annotation(org.springframework.web.bind.annotation.PatchMapping) || @annotation(org.springframework.web.bind.annotation.DeleteMapping))", returning = "result")
    public void logAdminWrites(JoinPoint joinPoint, Object result) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated()) {
                boolean isAdminWrite = auth.getAuthorities().stream()
                        .anyMatch(a -> a.getAuthority().equals("ROLE_DOCTOR_ADMIN") || a.getAuthority().equals("ROLE_SUPER_ADMIN"));
                if (isAdminWrite) {
                    Method method = getMethod(joinPoint);
                    // Skip if it already has @LogMutation to avoid double logging
                    if (!method.isAnnotationPresent(LogMutation.class)) {
                        String action = method.getName().toUpperCase();
                        String entityName = joinPoint.getTarget().getClass().getSimpleName().replace("Controller", "");
                        doLogEvent(action, entityName, joinPoint);
                    }
                }
            }
        } catch (Exception e) {
            log.error("Failed to log admin write event", e);
        }
    }

    private void doLogEvent(String action, String entityName, JoinPoint joinPoint) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            java.util.UUID userId = (auth != null && auth.getPrincipal() instanceof User)
                    ? ((User) auth.getPrincipal()).getId()
                    : null;

            String ip = "unknown";
            String userAgent = "unknown";
            if (RequestContextHolder.getRequestAttributes() != null) {
                HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                        .getRequest();
                ip = request.getRemoteAddr();
                userAgent = request.getHeader("User-Agent");
            }

            AuditEventRequest event = AuditEventRequest.builder()
                    .action(action)
                    .userId(userId)
                    .ipAddress(ip)
                    .userAgent(userAgent)
                    .entityType(entityName)
                    .details(generateDetails(action, entityName, joinPoint))
                    .status("SUCCESS")
                    .build();

            auditService.logEvent(event);
        } catch (Exception e) {
            log.error("Failed to execute doLogEvent", e);
        }
    }

    private String generateDetails(String action, String entity, JoinPoint joinPoint) {
        StringBuilder sb = new StringBuilder();
        sb.append("Action: ").append(action);
        if (entity != null && !entity.isEmpty()) {
            sb.append(" on ").append(entity);
        }

        Object[] args = joinPoint.getArgs();
        if (args != null && args.length > 0) {
            sb.append(" | Arguments: ");
            for (int i = 0; i < args.length; i++) {
                if (i > 0)
                    sb.append(", ");
                sb.append(args[i]);
            }
        }
        return sb.toString();
    }

    private Method getMethod(JoinPoint joinPoint) throws NoSuchMethodException {
        String methodName = joinPoint.getSignature().getName();
        Class<?>[] parameterTypes = ((org.aspectj.lang.reflect.MethodSignature) joinPoint.getSignature())
                .getParameterTypes();
        return joinPoint.getTarget().getClass().getMethod(methodName, parameterTypes);
    }
}
