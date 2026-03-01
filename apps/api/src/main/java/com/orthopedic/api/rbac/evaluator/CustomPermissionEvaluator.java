package com.orthopedic.api.rbac.evaluator;

import com.orthopedic.api.auth.security.CustomUserDetails;
import com.orthopedic.api.rbac.model.Permission;
import com.orthopedic.api.rbac.model.RolePermissionMapping;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Set;
import java.util.stream.Collectors;

@Component("permEval")
public class CustomPermissionEvaluator implements PermissionEvaluator {

    @Override
    public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
        if (authentication == null || permission == null) {
            return false;
        }
        
        String permissionString = permission.toString();
        return checkPermission(authentication, permissionString);
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Object permission) {
        return hasPermission(authentication, null, permission);
    }

    public boolean hasOwnership(Authentication authentication, Long ownerId) {
        if (authentication == null || ownerId == null) return false;
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        return userDetails.getUser().getId().equals(ownerId);
    }

    private boolean checkPermission(Authentication authentication, String permission) {
        Set<String> roles = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toSet());

        for (String role : roles) {
            Set<Permission> permissions = RolePermissionMapping.getPermissions(role);
            if (permissions.stream().anyMatch(p -> p.name().equals(permission))) {
                return true;
            }
        }
        return false;
    }
}
