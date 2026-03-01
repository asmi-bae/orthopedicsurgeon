package com.orthopedic.api.modules.audit.entity;

import com.orthopedic.api.shared.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "audit_logs", indexes = {
    @Index(name = "idx_audit_logs_user", columnList = "performed_by"),
    @Index(name = "idx_audit_logs_entity", columnList = "entity_name, entity_id"),
    @Index(name = "idx_audit_logs_action", columnList = "action")
})
public class AuditLog extends BaseEntity {

    @Column(nullable = false)
    private String entityName;

    @Column(nullable = false)
    private String entityId;

    @Column(nullable = false)
    private String action; // CREATE, UPDATE, DELETE, LOGIN, LOGOUT

    @Column(columnDefinition = "TEXT")
    private String oldValue;

    @Column(columnDefinition = "TEXT")
    private String newValue;

    @Column(nullable = false)
    private String performedBy; // Email or Username

    private String ipAddress;

    private String userAgent;

    @Column(columnDefinition = "TEXT")
    private String metadata; // JSON additional info
}
