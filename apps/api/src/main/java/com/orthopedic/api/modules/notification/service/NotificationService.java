package com.orthopedic.api.modules.notification.service;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.modules.notification.dto.request.SendNotificationRequest;
import com.orthopedic.api.modules.notification.dto.response.NotificationListResponse;
import com.orthopedic.api.modules.notification.dto.response.NotificationResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.UUID;

public interface NotificationService {
    void sendNotification(SendNotificationRequest request);

    void sendToRole(String role, SendNotificationRequest request);

    void sendToAll(SendNotificationRequest request);

    NotificationListResponse getMyNotifications(User currentUser, Pageable pageable);

    void markAsRead(UUID id, User currentUser);

    void markAllAsRead(User currentUser);

    void deleteNotification(UUID id, User currentUser);

    long getUnreadCount(User currentUser);

    SseEmitter subscribe(User user);
}
