package com.orthopedic.api.modules.audit.mapper;

import com.orthopedic.api.modules.audit.dto.request.AuditEventRequest;
import com.orthopedic.api.modules.audit.dto.response.AuditLogResponse;
import com.orthopedic.api.modules.audit.entity.AuditLog;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AuditMapper {
    AuditLog toEntity(AuditEventRequest request);
    AuditLogResponse toResponse(AuditLog log);
}
