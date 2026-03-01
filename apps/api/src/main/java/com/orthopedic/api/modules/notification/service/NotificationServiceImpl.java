package com.orthopedic.api.modules.notification.service;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.auth.repository.UserRepository;
import com.orthopedic.api.modules.notification.dto.request.SendNotificationRequest;
import com.orthopedic.api.modules.notification.dto.response.NotificationResponse;
import com.orthopedic.api.modules.notification.entity.Notification;
import com.orthopedic.api.modules.notification.mapper.NotificationMapper;
import com.orthopedic.api.modules.notification.repository.NotificationRepository;
import com.orthopedic.api.shared.dto.PageResponse;
import com.orthopedic.api.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final NotificationMapper notificationMapper;

    @Override
    public void sendNotification(SendNotificationRequest request) {
        User recipient = userRepository.findById(request.getRecipientId())
                .orElseThrow(() -> new ResourceNotFoundException("Recipient not found"));
        
        Notification notification = notificationMapper.toEntity(request);
        notification.setRecipient(recipient);
        notification.setStatus(Notification.NotificationStatus.UNREAD);
        
        notificationRepository.save(notification);
        
        // Placeholder for real multi-channel delivery (Mail, SMS, etc.)
        log.info("Notification sent to user {}: {} - {}", recipient.getEmail(), request.getTitle(), request.getMessage());
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<NotificationResponse> getMyNotifications(User currentUser, Pageable pageable) {
        Page<Notification> page = notificationRepository.findAllByRecipientId(currentUser.getId(), pageable);
        return PageResponse.fromPage(page.map(notificationMapper::toResponse));
    }

    @Override
    public void markAsRead(UUID id, User currentUser) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));
        
        if (!notification.getRecipient().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Access denied");
        }
        
        notification.setStatus(Notification.NotificationStatus.READ);
        notificationRepository.save(notification);
    }

    @Override
    public void markAllAsRead(User currentUser) {
        // Simple implementation for demo
        notificationRepository.findAllByRecipientId(currentUser.getId(), Pageable.unpaged())
                .forEach(n -> {
                    if (n.getStatus() == Notification.NotificationStatus.UNREAD) {
                        n.setStatus(Notification.NotificationStatus.READ);
                        notificationRepository.save(n);
                    }
                });
    }

    @Override
    @Transactional(readOnly = true)
    public long getUnreadCount(User currentUser) {
        return notificationRepository.countByRecipientIdAndStatus(currentUser.getId(), Notification.NotificationStatus.UNREAD);
    }
}
