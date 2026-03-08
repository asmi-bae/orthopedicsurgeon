package com.orthopedic.api.modules.notification.entity;

import com.orthopedic.api.auth.entity.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "notifications", indexes = {
        @Index(name = "idx_notifications_user_id", columnList = "user_id"),
        @Index(name = "idx_notifications_status", columnList = "status"),
        @Index(name = "idx_notifications_type", columnList = "type"),
        @Index(name = "idx_notifications_created_at", columnList = "createdAt"),
        @Index(name = "idx_notifications_recipient_role", columnList = "recipient_role")
})
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User recipient;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationChannel channel = NotificationChannel.IN_APP;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationStatus status = NotificationStatus.UNREAD;

    @Column(nullable = false)
    private boolean isRead = false;

    @Column(name = "recipient_role")
    private String recipientRole;

    @Column(nullable = false)
    private boolean isGlobal = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationLevel severity = NotificationLevel.INFO;

    public User getRecipient() {
        return recipient;
    }

    public void setRecipient(User recipient) {
        this.recipient = recipient;
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

    public NotificationType getType() {
        return type;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

    public NotificationChannel getChannel() {
        return channel;
    }

    public void setChannel(NotificationChannel channel) {
        this.channel = channel;
    }

    public NotificationStatus getStatus() {
        return status;
    }

    public void setStatus(NotificationStatus status) {
        this.status = status;
        this.isRead = (status == NotificationStatus.READ);
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
        this.status = read ? NotificationStatus.READ : NotificationStatus.UNREAD;
    }

    public String getRecipientRole() {
        return recipientRole;
    }

    public void setRecipientRole(String recipientRole) {
        this.recipientRole = recipientRole;
    }

    public boolean isGlobal() {
        return isGlobal;
    }

    public void setGlobal(boolean global) {
        isGlobal = global;
    }

    public NotificationLevel getSeverity() {
        return severity;
    }

    public void setSeverity(NotificationLevel severity) {
        this.severity = severity;
    }

    public enum NotificationType {
        APPOINTMENT_BOOKED, APPOINTMENT_CANCELLED, APPOINTMENT_REMINDER,
        PRESCRIPTION_ADDED, LAB_REPORT_READY, PAYMENT_SUCCESS, SYSTEM_ALERT
    }

    public enum NotificationChannel {
        IN_APP, EMAIL, SMS, PUSH
    }

    public enum NotificationStatus {
        UNREAD, READ, ARCHIVED
    }

    public enum NotificationLevel {
        INFO, WARNING, SUCCESS, ERROR
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
