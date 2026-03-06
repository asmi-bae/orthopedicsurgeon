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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {
    private static final Logger log = LoggerFactory.getLogger(NotificationServiceImpl.class);

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final NotificationMapper notificationMapper;
    private final SseEmitterManager sseEmitterManager;

    public NotificationServiceImpl(NotificationRepository notificationRepository,
            UserRepository userRepository,
            NotificationMapper notificationMapper,
            SseEmitterManager sseEmitterManager) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.notificationMapper = notificationMapper;
        this.sseEmitterManager = sseEmitterManager;
    }

    @Override
    public void sendNotification(SendNotificationRequest request) {
        User recipient = userRepository.findById(request.getRecipientId())
                .orElseThrow(() -> new ResourceNotFoundException("Recipient not found"));

        Notification notification = notificationMapper.toEntity(request);
        notification.setRecipient(recipient);
        notification.setStatus(Notification.NotificationStatus.UNREAD);
        notification.setRead(false);
        notification.setGlobal(false);

        Notification saved = notificationRepository.save(notification);
        NotificationResponse response = notificationMapper.toResponse(saved);

        // Push real-time notification via SSE
        sseEmitterManager.sendToUser(recipient.getId(), response);

        log.info("Notification sent to user {}: {} - {}", recipient.getEmail(), request.getTitle(),
                request.getMessage());
    }

    @Override
    public void sendToRole(String role, SendNotificationRequest request) {
        userRepository.findAllByRoleName(role)
                .forEach(u -> {
                    request.setRecipientId(u.getId());
                    sendNotification(request);
                });
    }

    @Override
    public void sendToAll(SendNotificationRequest request) {
        Notification notification = notificationMapper.toEntity(request);
        notification.setGlobal(true);
        notification.setStatus(Notification.NotificationStatus.UNREAD);
        notification.setRead(false);

        notificationRepository.save(notification);
        NotificationResponse response = notificationMapper.toResponse(notification);

        // Broadcast via SSE
        sseEmitterManager.broadcast(response);
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
        notification.setRead(true);
        notificationRepository.save(notification);
    }

    @Override
    public void markAllAsRead(User currentUser) {
        notificationRepository.markAllAsRead(currentUser.getId());
    }

    @Override
    public void deleteNotification(UUID id, User currentUser) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));

        if (!notification.getRecipient().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Access denied");
        }

        notificationRepository.delete(notification);
    }

    @Override
    @Transactional(readOnly = true)
    public long getUnreadCount(User currentUser) {
        return notificationRepository.countByRecipientIdAndStatus(currentUser.getId(),
                Notification.NotificationStatus.UNREAD);
    }

    @Override
    public org.springframework.web.servlet.mvc.method.annotation.SseEmitter subscribe(User user) {
        return sseEmitterManager.createEmitter(user.getId());
    }
}
