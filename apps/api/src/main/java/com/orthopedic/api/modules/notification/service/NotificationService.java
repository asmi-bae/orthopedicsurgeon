package com.orthopedic.api.modules.notification.service;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.modules.notification.dto.request.SendNotificationRequest;
import com.orthopedic.api.modules.notification.dto.response.NotificationResponse;
import com.orthopedic.api.shared.dto.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface NotificationService {
    void sendNotification(SendNotificationRequest request);
    PageResponse<NotificationResponse> getMyNotifications(User currentUser, Pageable pageable);
    void markAsRead(UUID id, User currentUser);
    void markAllAsRead(User currentUser);
    long getUnreadCount(User currentUser);
}
