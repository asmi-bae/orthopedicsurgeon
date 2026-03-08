package com.orthopedic.api.modules.patient.entity;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.shared.base.BaseEntity;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "patients", indexes = {
        @Index(name = "idx_patients_user_id", columnList = "user_id"),
        @Index(name = "idx_patients_status", columnList = "status"),
        @Index(name = "idx_patients_blood_group", columnList = "blood_group"),
        @Index(name = "idx_patients_city", columnList = "city"),
        @Index(name = "idx_patients_deleted", columnList = "deleted")
})
public class Patient extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Enumerated(EnumType.STRING)
    private BloodGroup bloodGroup;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    private String emergencyContactName;
    @Convert(converter = com.orthopedic.api.shared.converter.PiiEncryptionConverter.class)
    private String emergencyContactPhone;

    @Convert(converter = com.orthopedic.api.shared.converter.PiiEncryptionConverter.class)
    private String address;

    private String city;
    private String insuranceProvider;

    @Convert(converter = com.orthopedic.api.shared.converter.PiiEncryptionConverter.class)
    private String insuranceNumber;

    @Column(columnDefinition = "TEXT")
    private String medicalHistoryNotes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PatientStatus status = PatientStatus.ACTIVE;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PatientAllergy> allergies = new ArrayList<>();

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PatientMedicalCondition> conditions = new ArrayList<>();

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BloodGroup getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(BloodGroup bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getEmergencyContactName() {
        return emergencyContactName;
    }

    public void setEmergencyContactName(String emergencyContactName) {
        this.emergencyContactName = emergencyContactName;
    }

    public String getEmergencyContactPhone() {
        return emergencyContactPhone;
    }

    public void setEmergencyContactPhone(String emergencyContactPhone) {
        this.emergencyContactPhone = emergencyContactPhone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getInsuranceProvider() {
        return insuranceProvider;
    }

    public void setInsuranceProvider(String insuranceProvider) {
        this.insuranceProvider = insuranceProvider;
    }

    public String getInsuranceNumber() {
        return insuranceNumber;
    }

    public void setInsuranceNumber(String insuranceNumber) {
        this.insuranceNumber = insuranceNumber;
    }

    public String getMedicalHistoryNotes() {
        return medicalHistoryNotes;
    }

    public void setMedicalHistoryNotes(String medicalHistoryNotes) {
        this.medicalHistoryNotes = medicalHistoryNotes;
    }

    public PatientStatus getStatus() {
        return status;
    }

    public void setStatus(PatientStatus status) {
        this.status = status;
    }

    public List<PatientAllergy> getAllergies() {
        return allergies;
    }

    public void setAllergies(List<PatientAllergy> allergies) {
        this.allergies = allergies;
    }

    public List<PatientMedicalCondition> getConditions() {
        return conditions;
    }

    public void setConditions(List<PatientMedicalCondition> conditions) {
        this.conditions = conditions;
    }

    public enum BloodGroup {
        A_POSITIVE, A_NEGATIVE, B_POSITIVE, B_NEGATIVE, AB_POSITIVE, AB_NEGATIVE, O_POSITIVE, O_NEGATIVE
    }

    public enum Gender {
        MALE, FEMALE, OTHER
    }

    public enum PatientStatus {
        ACTIVE, INACTIVE, DECEASED, SUSPENDED
    }
}
