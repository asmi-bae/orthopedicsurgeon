package com.orthopedic.api.modules.doctor.dto.response;

import com.orthopedic.api.modules.doctor.entity.Doctor;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

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

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UserSummary getUser() { return user; }
    public void setUser(UserSummary user) { this.user = user; }

    public HospitalSummary getHospital() { return hospital; }
    public void setHospital(HospitalSummary hospital) { this.hospital = hospital; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }

    public BigDecimal getConsultationFee() { return consultationFee; }
    public void setConsultationFee(BigDecimal consultationFee) { this.consultationFee = consultationFee; }

    public Boolean getAvailableForOnline() { return availableForOnline; }
    public void setAvailableForOnline(Boolean availableForOnline) { this.availableForOnline = availableForOnline; }

    public Doctor.DoctorStatus getStatus() { return status; }
    public void setStatus(Doctor.DoctorStatus status) { this.status = status; }

    public List<DoctorAvailabilityResponse> getAvailabilities() { return availabilities; }
    public void setAvailabilities(List<DoctorAvailabilityResponse> availabilities) { this.availabilities = availabilities; }

    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }

    public Integer getTotalAppointments() { return totalAppointments; }
    public void setTotalAppointments(Integer totalAppointments) { this.totalAppointments = totalAppointments; }

    public static class UserSummary {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private String phone;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }

        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
    }

    public static class HospitalSummary {
        private UUID id;
        private String name;
        private String city;

        public UUID getId() { return id; }
        public void setId(UUID id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getCity() { return city; }
        public void setCity(String city) { this.city = city; }
    }
}
