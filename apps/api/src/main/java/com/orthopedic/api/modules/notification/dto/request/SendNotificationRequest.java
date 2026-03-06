package com.orthopedic.api.modules.notification.dto.request;

import com.orthopedic.api.modules.notification.entity.Notification;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class SendNotificationRequest {
    private UUID recipientId;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Message is required")
    private String message;

    @NotNull(message = "Type is required")
    private Notification.NotificationType type;

    private Notification.NotificationChannel channel;

    private String recipientRole;

    private Notification.NotificationLevel severity = Notification.NotificationLevel.INFO;

    public SendNotificationRequest() {
    }

    public SendNotificationRequest(UUID recipientId, String title, String message, Notification.NotificationType type,
            Notification.NotificationChannel channel, String recipientRole, Notification.NotificationLevel severity) {
        this.recipientId = recipientId;
        this.title = title;
        this.message = message;
        this.type = type;
        this.channel = channel;
        this.recipientRole = recipientRole;
        this.severity = severity;
    }

    public UUID getRecipientId() {
        return recipientId;
    }

    public void setRecipientId(UUID recipientId) {
        this.recipientId = recipientId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Notification.NotificationType getType() {
        return type;
    }

    public void setType(Notification.NotificationType type) {
        this.type = type;
    }

    public Notification.NotificationChannel getChannel() {
        return channel;
    }

    public void setChannel(Notification.NotificationChannel channel) {
        this.channel = channel;
    }

    public String getRecipientRole() {
        return recipientRole;
    }

    public void setRecipientRole(String recipientRole) {
        this.recipientRole = recipientRole;
    }

    public Notification.NotificationLevel getSeverity() {
        return severity;
    }

    public void setSeverity(Notification.NotificationLevel severity) {
        this.severity = severity;
    }

    public static SendNotificationRequestBuilder builder() {
        return new SendNotificationRequestBuilder();
    }

    public static class SendNotificationRequestBuilder {
        private UUID recipientId;
        private String title;
        private String message;
        private Notification.NotificationType type;
        private Notification.NotificationChannel channel;
        private String recipientRole;
        private Notification.NotificationLevel severity;

        public SendNotificationRequestBuilder recipientId(UUID recipientId) {
            this.recipientId = recipientId;
            return this;
        }

        public SendNotificationRequestBuilder title(String title) {
            this.title = title;
            return this;
        }

        public SendNotificationRequestBuilder message(String message) {
            this.message = message;
            return this;
        }

        public SendNotificationRequestBuilder type(Notification.NotificationType type) {
            this.type = type;
            return this;
        }

        public SendNotificationRequestBuilder channel(Notification.NotificationChannel channel) {
            this.channel = channel;
            return this;
        }

        public SendNotificationRequestBuilder recipientRole(String recipientRole) {
            this.recipientRole = recipientRole;
            return this;
        }

        public SendNotificationRequestBuilder severity(Notification.NotificationLevel severity) {
            this.severity = severity;
            return this;
        }

        public SendNotificationRequest build() {
            return new SendNotificationRequest(recipientId, title, message, type, channel, recipientRole, severity);
        }
    }
}
