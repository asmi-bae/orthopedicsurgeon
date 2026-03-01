package com.orthopedic.api.modules.audit.service;

import com.orthopedic.api.modules.audit.dto.request.AuditEventRequest;
import com.orthopedic.api.modules.audit.dto.response.AuditLogResponse;
import com.orthopedic.api.shared.dto.PageResponse;
import org.springframework.data.domain.Pageable;

public interface AuditService {
    void logEvent(AuditEventRequest request);
    PageResponse<AuditLogResponse> getAllLogs(Pageable pageable);
    PageResponse<AuditLogResponse> getLogsByEntity(String entityName, String entityId, Pageable pageable);
}
