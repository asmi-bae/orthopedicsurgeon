package com.orthopedic.api.security.authorization;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component("ownershipValidator")
@Slf4j
@RequiredArgsConstructor
public class OwnershipValidator {

    // These would typically use repositories to check ownership
    // private final AppointmentRepository appointmentRepo;
    // ...

    public boolean isOwner(Authentication authentication, UUID resourceId) {
        if (authentication == null || resourceId == null)
            return false;

        String currentUserId = authentication.getName();

        if (hasRole(authentication, "ROLE_ADMIN") || hasRole(authentication, "ROLE_SUPER_ADMIN")) {
            return true;
        }

        // Logic to check if resourceId belongs to currentUserId
        // Example:
        // return appointmentRepo.findById(resourceId)
        // .map(a -> a.getPatientId().equals(UUID.fromString(currentUserId)))
        // .orElse(false);

        log.warn("IDOR attempt detected: User {} tried to access resource {}", currentUserId, resourceId);
        return false;
    }

    private boolean hasRole(Authentication auth, String role) {
        return auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals(role));
    }
}
