package com.orthopedic.api.modules.notification.entity;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.shared.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "notifications", indexes = {
    @Index(name = "idx_notifications_user_id", columnList = "user_id"),
    @Index(name = "idx_notifications_status", columnList = "status"),
    @Index(name = "idx_notifications_type", columnList = "type")
})
public class Notification extends BaseEntity {

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
}
