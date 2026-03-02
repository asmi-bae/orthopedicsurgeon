package com.orthopedic.api.modules.hospital.dto.response;

import com.orthopedic.api.modules.hospital.entity.Hospital;
import java.util.UUID;

public class HospitalSummaryResponse {
    private UUID id;
    private String name;
    private String city;
    private Hospital.HospitalStatus status;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Hospital.HospitalStatus getStatus() {
        return status;
    }

    public void setStatus(Hospital.HospitalStatus status) {
        this.status = status;
    }
}
