package com.orthopedic.api.auth.config;

import com.orthopedic.api.auth.entity.Role;
import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.auth.repository.RoleRepository;
import com.orthopedic.api.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

/**
 * DataInitializer seeds the initial super admin and roles if they don't exist.
 */
@Configuration
@Profile("local")
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        log.info("Checking for seed data...");

        // 1. Seed Roles
        Role superAdminRole = createRoleIfNotFound("SUPER_ADMIN");
        createRoleIfNotFound("ADMIN");
        createRoleIfNotFound("DOCTOR");
        createRoleIfNotFound("PATIENT");
        createRoleIfNotFound("LAB_TECH");

        // 2. Seed Super Admin User
        String superAdminEmail = "khan23105101484@diu.edu.bd";
        if (userRepository.findByEmail(superAdminEmail).isEmpty()) {
            User superAdmin = User.builder()
                    .email(superAdminEmail)
                    .password(passwordEncoder.encode("khan23105101484@"))
                    .firstName("MD Shoaib")
                    .lastName("Khan")
                    .roles(Set.of(superAdminRole))
                    .enabled(true)
                    .build();
            userRepository.save(superAdmin);
            log.info("Super Admin user created: {}", superAdminEmail);
        } else {
            log.info("Super Admin user already exists: {}", superAdminEmail);
        }
    }

    private Role createRoleIfNotFound(String name) {
        return roleRepository.findByName(name).orElseGet(() -> {
            Role role = new Role();
            role.setName(name);
            log.info("Creating role: {}", name);
            return roleRepository.save(role);
        });
    }
}
