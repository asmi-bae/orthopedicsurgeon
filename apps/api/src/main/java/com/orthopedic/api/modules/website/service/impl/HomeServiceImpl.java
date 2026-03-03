package com.orthopedic.api.modules.website.service.impl;

import com.orthopedic.api.modules.website.dto.response.HeroSlideResponse;
import com.orthopedic.api.modules.website.dto.response.HomeStatsResponse;
import com.orthopedic.api.modules.website.dto.response.TestimonialResponse;
import com.orthopedic.api.modules.contact.dto.response.ContactInfoResponse;
import com.orthopedic.api.modules.doctor.dto.response.DoctorPublicResponse;
import com.orthopedic.api.modules.website.entity.SiteSetting;
import com.orthopedic.api.modules.website.repository.HeroSlideRepository;
import com.orthopedic.api.modules.website.repository.SiteSettingRepository;
import com.orthopedic.api.modules.website.repository.TestimonialRepository;
import com.orthopedic.api.modules.doctor.repository.DoctorRepository;
import com.orthopedic.api.modules.patient.repository.PatientRepository;
import com.orthopedic.api.modules.appointment.repository.AppointmentRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl {

        private final DoctorRepository doctorRepository;
        private final PatientRepository patientRepository;
        private final AppointmentRepository appointmentRepository;
        private final HeroSlideRepository heroSlideRepository;
        private final TestimonialRepository testimonialRepository;
        private final SiteSettingRepository siteSettingRepository;

        private String getSetting(String key) {
                return siteSettingRepository.findByKey(key)
                                .map(SiteSetting::getValue)
                                .orElse("");
        }

        @Cacheable("home-stats")
        public HomeStatsResponse getStats() {
                CompletableFuture<Long> doctorsFuture = CompletableFuture.supplyAsync(() -> doctorRepository.count());
                CompletableFuture<Long> patientsFuture = CompletableFuture.supplyAsync(() -> patientRepository.count());
                CompletableFuture<Long> appointmentsFuture = CompletableFuture
                                .supplyAsync(() -> appointmentRepository.count());

                CompletableFuture.allOf(doctorsFuture, patientsFuture, appointmentsFuture).join();

                return HomeStatsResponse.builder()
                                .totalDoctors(doctorsFuture.join())
                                .totalPatients(patientsFuture.join())
                                .totalAppointments(appointmentsFuture.join())
                                .totalServices(20L) // Default 20
                                .yearsExperience(getSetting("years_experience"))
                                .successRate(getSetting("success_rate"))
                                .build();
        }

        @Cacheable(value = "featured-doctors", key = "'top6'")
        public List<DoctorPublicResponse> getFeaturedDoctors() {
                return doctorRepository.findAll(PageRequest.of(0, 6)).getContent().stream()
                                .map(d -> DoctorPublicResponse.builder()
                                                .id(d.getId())
                                                .fullName(d.getUser().getFirstName() + " " + d.getUser().getLastName())
                                                .build())
                                .toList();
        }

        @Cacheable("hero-slides")
        public List<HeroSlideResponse> getHeroSlides() {
                return heroSlideRepository.findByIsActiveTrueOrderByDisplayOrderAsc().stream()
                                .map(s -> HeroSlideResponse.builder()
                                                .id(s.getId())
                                                .title(s.getTitle())
                                                .subtitle(s.getSubtitle())
                                                .description(s.getDescription())
                                                .imageUrl(s.getImageUrl())
                                                .buttonText(s.getButtonText())
                                                .buttonLink(s.getButtonLink())
                                                .displayOrder(s.getDisplayOrder())
                                                .isActive(s.getIsActive())
                                                .build())
                                .toList();
        }

        @Cacheable("testimonials")
        public List<TestimonialResponse> getFeaturedTestimonials() {
                return testimonialRepository.findByIsFeaturedTrueAndIsVerifiedTrue(PageRequest.of(0, 6)).getContent()
                                .stream()
                                .map(t -> TestimonialResponse.builder()
                                                .id(t.getId())
                                                .patientName(t.getPatientName())
                                                .patientAvatar(t.getPatientAvatar())
                                                .content(t.getContent())
                                                .rating(t.getRating())
                                                .isVerified(t.getIsVerified())
                                                .isFeatured(t.getIsFeatured())
                                                .doctorName(
                                                                t.getDoctor() != null ? t.getDoctor().getUser()
                                                                                .getFirstName() + " "
                                                                                + t.getDoctor().getUser().getLastName()
                                                                                : null)
                                                .createdAt(t.getCreatedAt())
                                                .build())
                                .toList();
        }

        public Map<String, String> getWorkingHours() {
                Map<String, String> hours = new LinkedHashMap<>();
                List<String> days = List.of("mon", "tue", "wed", "thu", "fri", "sat", "sun");
                for (String day : days) {
                        String val = siteSettingRepository.findByKey("working_hours_" + day)
                                        .map(SiteSetting::getValue).orElse("closed");
                        hours.put(day.toUpperCase(), val);
                }
                return hours;
        }

        public ContactInfoResponse getContactInfo() {
                return ContactInfoResponse.builder()
                                .address(getSetting("hospital_address") + ", " + getSetting("hospital_city") + " "
                                                + getSetting("hospital_zip"))
                                .phone(getSetting("hospital_phone"))
                                .email(getSetting("hospital_email"))
                                .emergencyPhone(getSetting("hospital_emergency_phone"))
                                .workingHours(getWorkingHours())
                                .mapLat(Double
                                                .parseDouble(getSetting("hospital_map_lat").isEmpty() ? "0"
                                                                : getSetting("hospital_map_lat")))
                                .mapLng(Double
                                                .parseDouble(getSetting("hospital_map_lng").isEmpty() ? "0"
                                                                : getSetting("hospital_map_lng")))
                                .socialLinks(Map.of(
                                                "facebook", getSetting("social_facebook"),
                                                "twitter", getSetting("social_twitter"),
                                                "instagram", getSetting("social_instagram"),
                                                "linkedin", getSetting("social_linkedin")))
                                .build();
        }
}
