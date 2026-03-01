package com.orthopedic.api.modules.audit.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class AuditLogResponse {
    private UUID id;
    private String entityName;
    private String entityId;
    private String action;
    private String oldValue;
    private String newValue;
    private String performedBy;
    private String ipAddress;
    private LocalDateTime createdAt;
}
