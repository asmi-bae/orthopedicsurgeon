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

    private final com.orthopedic.api.auth.repository.UserRepository userRepository;
    private final com.orthopedic.api.modules.doctor.repository.DoctorRepository doctorRepository;

    public boolean isOwner(Authentication authentication, UUID resourceId) {
        if (authentication == null || resourceId == null)
            return false;

        if (hasRole(authentication, "ROLE_DOCTOR_ADMIN") || hasRole(authentication, "ROLE_SUPER_ADMIN")) {
            return true;
        }

        // Base logic for generic owner checks could go here.
        return false;
    }

    // SELF_PROTECTION
    public boolean isNotSelf(Authentication authentication, UUID targetUserId) {
        if (authentication == null || targetUserId == null)
            return false;
        
        String currentUserId = authentication.getName();
        return !currentUserId.equals(targetUserId.toString());
    }

    // SUPER_ADMIN_SHIELD
    public boolean protectSuperAdmin(Authentication authentication, UUID targetUserId) {
        if (hasRole(authentication, "ROLE_SUPER_ADMIN")) return true;
        
        // Prevent action if target is a SUPER_ADMIN
        return userRepository.findById(targetUserId)
            .map(u -> u.getRoles().stream().noneMatch(r -> r.getName().equals("SUPER_ADMIN")))
            .orElse(true);
    }

    // SINGLE_DOCTOR_SCOPE
    public boolean isOwnDoctorProfile(Authentication authentication, UUID targetDoctorId) {
        if (hasRole(authentication, "ROLE_SUPER_ADMIN")) return true;
        
        String currentUserId = authentication.getName();
        return doctorRepository.findById(targetDoctorId)
            .map(d -> d.getUser() != null && d.getUser().getId().toString().equals(currentUserId))
            .orElse(false);
    }

    // PATIENT OWNERSHIP
    public boolean isPatientOwner(Authentication authentication, UUID targetUserId) {
        if (hasRole(authentication, "ROLE_DOCTOR_ADMIN") || hasRole(authentication, "ROLE_SUPER_ADMIN")) {
            return true; 
        }
        return authentication.getName().equals(targetUserId.toString());
    }

    private boolean hasRole(Authentication auth, String role) {
        return auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals(role));
    }
}
