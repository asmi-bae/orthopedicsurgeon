package com.orthopedic.api.modules.audit.service;

import com.orthopedic.api.modules.audit.dto.request.AuditEventRequest;
import com.orthopedic.api.modules.audit.dto.response.AuditLogResponse;
import com.orthopedic.api.modules.audit.entity.AuditLog;
import com.orthopedic.api.modules.audit.mapper.AuditMapper;
import com.orthopedic.api.modules.audit.repository.AuditLogRepository;
import com.orthopedic.api.shared.dto.PageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AuditServiceImpl implements AuditService {
    private final AuditLogRepository auditLogRepository;
    private final AuditMapper auditMapper;

    public AuditServiceImpl(AuditLogRepository auditLogRepository, AuditMapper auditMapper) {
        this.auditLogRepository = auditLogRepository;
        this.auditMapper = auditMapper;
    }

    @Override
    @org.springframework.scheduling.annotation.Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logEvent(AuditEventRequest request) {
        AuditLog log = auditMapper.toEntity(request);
        auditLogRepository.save(log);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<AuditLogResponse> getAllLogs(Pageable pageable) {
        Page<AuditLog> page = auditLogRepository.findAll(pageable);
        return PageResponse.fromPage(page.map(auditMapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<AuditLogResponse> getLogsByEntity(String entityType, String entityId, Pageable pageable) {
        Page<AuditLog> page = auditLogRepository.findAllByEntityTypeAndEntityId(entityType, UUID.fromString(entityId),
                pageable);
        return PageResponse.fromPage(page.map(auditMapper::toResponse));
    }
}
