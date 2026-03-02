package com.orthopedic.api.modules.doctor.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public class DoctorFilterRequest {
    private String specialization;
    private UUID hospitalId;
    private String city;
    private Boolean availableForOnline;
    private BigDecimal minFee;
    private BigDecimal maxFee;
    private LocalDate availableOnDate;

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public UUID getHospitalId() {
        return hospitalId;
    }

    public void setHospitalId(UUID hospitalId) {
        this.hospitalId = hospitalId;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Boolean getAvailableForOnline() {
        return availableForOnline;
    }

    public void setAvailableForOnline(Boolean availableForOnline) {
        this.availableForOnline = availableForOnline;
    }

    public BigDecimal getMinFee() {
        return minFee;
    }

    public void setMinFee(BigDecimal minFee) {
        this.minFee = minFee;
    }

    public BigDecimal getMaxFee() {
        return maxFee;
    }

    public void setMaxFee(BigDecimal maxFee) {
        this.maxFee = maxFee;
    }

    public LocalDate getAvailableOnDate() {
        return availableOnDate;
    }

    public void setAvailableOnDate(LocalDate availableOnDate) {
        this.availableOnDate = availableOnDate;
    }
}
