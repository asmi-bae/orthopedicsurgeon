package com.orthopedic.api.modules.hospital.dto.response;

import com.orthopedic.api.modules.hospital.entity.ServiceEntity;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class ServiceResponse {
    private UUID id;
    private UUID hospitalId;
    private String hospitalName;
    private String name;
    private String description;
    private Integer durationMinutes;
    private BigDecimal price;
    private ServiceEntity.ServiceCategory category;
    private ServiceEntity.ServiceStatus status;
}
