package com.orthopedic.api.modules.patient.dto.response;

import com.orthopedic.api.modules.patient.entity.Patient;
import java.time.LocalDate;
import java.util.UUID;

public class PatientSummaryResponse {
    private UUID id;
    private String fullName;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private Patient.BloodGroup bloodGroup;
    private Patient.Gender gender;
    private Patient.PatientStatus status;
    private int age;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Patient.BloodGroup getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(Patient.BloodGroup bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public Patient.Gender getGender() {
        return gender;
    }

    public void setGender(Patient.Gender gender) {
        this.gender = gender;
    }

    public Patient.PatientStatus getStatus() {
        return status;
    }

    public void setStatus(Patient.PatientStatus status) {
        this.status = status;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
