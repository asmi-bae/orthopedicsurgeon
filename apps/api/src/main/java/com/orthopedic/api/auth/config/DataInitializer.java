package com.orthopedic.api.auth.config;

import com.orthopedic.api.auth.entity.Role;
import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.auth.repository.RoleRepository;
import com.orthopedic.api.auth.repository.UserRepository;
import com.orthopedic.api.modules.doctor.entity.Doctor;
import com.orthopedic.api.modules.doctor.repository.DoctorRepository;
import com.orthopedic.api.modules.hospital.entity.Hospital;
import com.orthopedic.api.modules.hospital.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
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
    private final HospitalRepository hospitalRepository;
    private final DoctorRepository doctorRepository;

    @Override
    public void run(String... args) {
        log.info("Checking for seed data...");

        // 1. Seed Roles
        Role superAdminRole = createRoleIfNotFound("SUPER_ADMIN");
        Role doctorAdminRole = createRoleIfNotFound("DOCTOR_ADMIN");
        Role patientRole = createRoleIfNotFound("PATIENT");

        // 2.1 . Seed MD Shoaib (Original Super Admin)
        String superAdminEmail = "admin@orthopedicsurgeon.com";
        if (userRepository.findByEmail(superAdminEmail).isEmpty()) {
            User superAdmin = User.builder()
                    .email(superAdminEmail)
                    .password(passwordEncoder.encode("admin@orthopedicsurgeon"))
                    .firstName("MD Shoaib")
                    .lastName("Khan")
                    .roles(Set.of(superAdminRole))
                    .enabled(true)
                    .build();
            userRepository.save(superAdmin);
            log.info("Super Admin user created: {}", superAdminEmail);
        }

        // 2.2 . Seed Dr. Abdur Rahman Miah (Doctor Admin)
        String drEmail = "doctor@orthopedicsurgeon.com";
        User drUser = userRepository.findByEmail(drEmail).orElse(null);
        if (drUser == null) {
            drUser = User.builder()
                    .email(drEmail)
                    .password(passwordEncoder.encode("doctor@orthopedicsurgeon")) // Use email as default pass for demo
                    .firstName("Dr. Ab Rahman")
                    .lastName("Miah")
                    .phone("+8801885995293")
                    .roles(Set.of(doctorAdminRole))
                    .enabled(true)
                    .build();
            drUser = userRepository.save(drUser);
            log.info("Doctor Admin user created: {}", drEmail);
        }

         // 2.3 Seed Admin User as Patient
        String adminAsPatientEmail = "patient@orthopedicsurgeon.com";
        if (userRepository.findByEmail(adminAsPatientEmail).isEmpty()) {
            User adminPatient = User.builder()
                    .email(adminAsPatientEmail)
                    .password(passwordEncoder.encode("patient@orthopedicsurgeon"))
                    .firstName("Admin")
                    .lastName("User")
                    .roles(Set.of(patientRole))
                    .enabled(true)
                    .build();
            userRepository.save(adminPatient);
            log.info("Admin User as Patient created: {}", adminAsPatientEmail);
        } else {
            User existing = userRepository.findByEmail(adminAsPatientEmail).get();
            existing.setRoles(Set.of(patientRole));
            userRepository.save(existing);
            log.info("Admin User role updated to PATIENT: {}", adminAsPatientEmail);
        }


        // 4. Seed Hospital (Trauma Specialized Hospital)
        Hospital hospital = hospitalRepository.findAll().stream()
                .filter(h -> "LIC-TRAUMA-001".equals(h.getLicenseNumber()))
                .findFirst()
                .orElse(null);

        if (hospital == null) {
            hospital = new Hospital();
            hospital.setName("Trauma Specialized Hospital");
            hospital.setAddress("Saleha X-ray Clinic (Second Floor), Thana Mor");
            hospital.setCity("Mirzapur, Tangail");
            hospital.setPhone("+8801885995293");
            hospital.setLicenseNumber("LIC-TRAUMA-001");
            hospital = hospitalRepository.save(hospital);
            log.info("Hospital created: {}", hospital.getName());
        }

        // 5. Seed Doctor Profile
        if (doctorRepository.findByUserId(drUser.getId()).isEmpty() && !doctorRepository.existsByLicenseNumber("DOC-ABR-001")) {
            Doctor doctor = new Doctor();
            doctor.setUser(drUser);
            doctor.setHospital(hospital);
            doctor.setSpecialization("Orthopedics & Trauma Surgeon");
            doctor.setLicenseNumber("DOC-ABR-001");
            doctor.setBio("Orthopedics Treatment. Trauma Surgery. Bone & Joint Problems.");
            doctor.setExperienceYears(15);
            doctor.setConsultationFee(new BigDecimal("1000.00"));
            doctor.setAvailableForOnline(false);
            doctor.setIsFeatured(true);
            doctorRepository.save(doctor);
            log.info("Doctor profile created for: {}", drUser.getEmail());
        } else {
            log.info("Doctor profile already exists for: {}", drUser.getEmail());
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
