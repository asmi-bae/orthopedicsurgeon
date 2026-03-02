package com.orthopedic.api.modules.audit.dto.request;

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
    private String details;

    public AuditEventRequest() {}

    public AuditEventRequest(String entityName, String entityId, String action, String oldValue, String newValue, String performedBy, String ipAddress, String userAgent, String metadata, String details) {
        this.entityName = entityName;
        this.entityId = entityId;
        this.action = action;
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.performedBy = performedBy;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.metadata = metadata;
        this.details = details;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getEntityId() {
        return entityId;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getOldValue() {
        return oldValue;
    }

    public void setOldValue(String oldValue) {
        this.oldValue = oldValue;
    }

    public String getNewValue() {
        return newValue;
    }

    public void setNewValue(String newValue) {
        this.newValue = newValue;
    }

    public String getPerformedBy() {
        return performedBy;
    }

    public void setPerformedBy(String performedBy) {
        this.performedBy = performedBy;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public String getMetadata() {
        return metadata;
    }

    public void setMetadata(String metadata) {
        this.metadata = metadata;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public static AuditEventRequestBuilder builder() {
        return new AuditEventRequestBuilder();
    }

    public static class AuditEventRequestBuilder {
        private String entityName;
        private String entityId;
        private String action;
        private String oldValue;
        private String newValue;
        private String performedBy;
        private String ipAddress;
        private String userAgent;
        private String metadata;
        private String details;

        public AuditEventRequestBuilder entityName(String entityName) {
            this.entityName = entityName;
            return this;
        }

        public AuditEventRequestBuilder entityId(String entityId) {
            this.entityId = entityId;
            return this;
        }

        public AuditEventRequestBuilder action(String action) {
            this.action = action;
            return this;
        }

        public AuditEventRequestBuilder oldValue(String oldValue) {
            this.oldValue = oldValue;
            return this;
        }

        public AuditEventRequestBuilder newValue(String newValue) {
            this.newValue = newValue;
            return this;
        }

        public AuditEventRequestBuilder performedBy(String performedBy) {
            this.performedBy = performedBy;
            return this;
        }

        public AuditEventRequestBuilder ipAddress(String ipAddress) {
            this.ipAddress = ipAddress;
            return this;
        }

        public AuditEventRequestBuilder userAgent(String userAgent) {
            this.userAgent = userAgent;
            return this;
        }

        public AuditEventRequestBuilder metadata(String metadata) {
            this.metadata = metadata;
            return this;
        }

        public AuditEventRequestBuilder details(String details) {
            this.details = details;
            return this;
        }

        public AuditEventRequest build() {
            return new AuditEventRequest(entityName, entityId, action, oldValue, newValue, performedBy, ipAddress, userAgent, metadata, details);
        }
    }
}
