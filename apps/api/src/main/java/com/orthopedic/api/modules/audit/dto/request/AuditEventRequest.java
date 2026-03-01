package com.orthopedic.api.modules.audit.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuditEventRequest {
    private String entityName;
    private String entityId;
    private String action;
    private String oldValue;
    private String newValue;
    private String performedBy;
    private String ipAddress;
    private String userAgent;
    private String metadata;
}
