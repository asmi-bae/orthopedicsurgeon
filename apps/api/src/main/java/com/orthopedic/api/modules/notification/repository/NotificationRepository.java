package com.orthopedic.api.modules.notification.repository;

import com.orthopedic.api.modules.notification.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {
    Page<Notification> findAllByRecipientId(Long recipientId, Pageable pageable);
    
    long countByRecipientIdAndStatus(Long recipientId, Notification.NotificationStatus status);
}
