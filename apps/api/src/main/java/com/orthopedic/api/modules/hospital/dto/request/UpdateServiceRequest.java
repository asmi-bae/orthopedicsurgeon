package com.orthopedic.api.modules.hospital.dto.request;

import com.orthopedic.api.modules.hospital.entity.ServiceEntity;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class UpdateServiceRequest {
    private String name;
    private String description;
    private Integer durationMinutes;
    private BigDecimal price;
    private ServiceEntity.ServiceCategory category;
    private ServiceEntity.ServiceStatus status;
}
