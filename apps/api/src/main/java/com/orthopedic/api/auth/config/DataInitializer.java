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
        createRoleIfNotFound("PATIENT");

        // 2. Seed MD Shoaib (Original Super Admin)
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

        // 3. Seed Dr. Abdur Rahman Miah (Super Doctor Admin)
        String drEmail = "abrmc49@gmail.com";
        User drUser = userRepository.findByEmail(drEmail).orElse(null);
        if (drUser == null) {
            drUser = User.builder()
                    .email(drEmail)
                    .password(passwordEncoder.encode("abrmc49@gmail.com")) // Use email as default pass for demo
                    .firstName("Dr. Abdur Rahman")
                    .lastName("Miah")
                    .phone("+8801885995293")
                    .roles(Set.of(doctorAdminRole))
                    .enabled(true)
                    .build();
            drUser = userRepository.save(drUser);
            log.info("Dr. Ab Rahman user created: {}", drEmail);
        } else {
            log.info("Dr. Ab Rahman user already exists: {}", drEmail);
            // Ensure roles
            drUser.setRoles(Set.of(doctorAdminRole));
            drUser = userRepository.save(drUser);
        }

        // 4. Seed Hospital (Trauma Specialized Hospital)
        Hospital hospital = null;
        if (hospitalRepository.count() == 0) {
            hospital = new Hospital();
            hospital.setName("Trauma Specialized Hospital");
            hospital.setAddress("Saleha X-ray Clinic (Second Floor), Thana Mor");
            hospital.setCity("Mirzapur, Tangail");
            hospital.setPhone("+8801885995293");
            hospital.setLicenseNumber("LIC-TRAUMA-001");
            hospital = hospitalRepository.save(hospital);
            log.info("Hospital created: {}", hospital.getName());
        } else {
            hospital = hospitalRepository.findAll().get(0);
        }

        // 5. Seed Doctor Profile
        if (doctorRepository.findByUserId(drUser.getId()).isEmpty()) {
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
