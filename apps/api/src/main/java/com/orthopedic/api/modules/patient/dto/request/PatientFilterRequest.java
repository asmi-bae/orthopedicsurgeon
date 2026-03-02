package com.orthopedic.api.modules.patient.dto.request;

import com.orthopedic.api.modules.patient.entity.Patient;

public class PatientFilterRequest {
    private Patient.BloodGroup bloodGroup;
    private Patient.Gender gender;
    private String city;
    private Patient.PatientStatus status;
    private String search;

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

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Patient.PatientStatus getStatus() {
        return status;
    }

    public void setStatus(Patient.PatientStatus status) {
        this.status = status;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }
}
