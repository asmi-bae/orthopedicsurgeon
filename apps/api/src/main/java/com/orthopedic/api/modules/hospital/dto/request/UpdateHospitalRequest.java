package com.orthopedic.api.modules.hospital.dto.request;

import com.orthopedic.api.modules.hospital.entity.Hospital;

public class UpdateHospitalRequest {
    private String name;
    private String address;
    private String city;
    private String phone;
    private String email;
    private Hospital.HospitalStatus status;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Hospital.HospitalStatus getStatus() {
        return status;
    }

    public void setStatus(Hospital.HospitalStatus status) {
        this.status = status;
    }
}
