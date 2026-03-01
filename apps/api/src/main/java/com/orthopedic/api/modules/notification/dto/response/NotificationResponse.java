package com.orthopedic.api.modules.notification.dto.response;

import com.orthopedic.api.modules.notification.entity.Notification;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class NotificationResponse {
    private UUID id;
    private String title;
    private String message;
    private Notification.NotificationType type;
    private Notification.NotificationChannel channel;
    private Notification.NotificationStatus status;
    private LocalDateTime createdAt;
}
