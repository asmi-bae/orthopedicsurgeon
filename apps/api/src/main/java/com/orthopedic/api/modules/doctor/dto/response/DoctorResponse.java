package com.orthopedic.api.modules.doctor.dto.response;

import com.orthopedic.api.modules.doctor.entity.Doctor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
public class DoctorResponse {
    private UUID id;
    private UserSummary user;
    private HospitalSummary hospital;
    private String specialization;
    private String licenseNumber;
    private String bio;
    private Integer experienceYears;
    private BigDecimal consultationFee;
    private Boolean availableForOnline;
    private Doctor.DoctorStatus status;
    private List<DoctorAvailabilityResponse> availabilities;
    private Double averageRating;
    private Integer totalAppointments;

    @Data
    public static class UserSummary {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private String phone;
    }

    @Data
    public static class HospitalSummary {
        private UUID id;
        private String name;
        private String city;
    }
}
