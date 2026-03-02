package com.orthopedic.api.modules.hospital.dto.request;

import com.orthopedic.api.modules.hospital.entity.ServiceEntity;
import java.math.BigDecimal;

public class UpdateServiceRequest {
    private String name;
    private String description;
    private Integer durationMinutes;
    private BigDecimal price;
    private ServiceEntity.ServiceCategory category;
    private ServiceEntity.ServiceStatus status;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public ServiceEntity.ServiceCategory getCategory() {
        return category;
    }

    public void setCategory(ServiceEntity.ServiceCategory category) {
        this.category = category;
    }

    public ServiceEntity.ServiceStatus getStatus() {
        return status;
    }

    public void setStatus(ServiceEntity.ServiceStatus status) {
        this.status = status;
    }
}
