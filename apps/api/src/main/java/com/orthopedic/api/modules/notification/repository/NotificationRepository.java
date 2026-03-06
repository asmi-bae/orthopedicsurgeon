package com.orthopedic.api.modules.notification.repository;

import com.orthopedic.api.modules.notification.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {
    Page<Notification> findAllByRecipientId(UUID recipientId, Pageable pageable);

    long countByRecipientIdAndStatus(UUID recipientId, Notification.NotificationStatus status);

    @Modifying
    @Query("UPDATE Notification n SET n.status = 'READ', n.isRead = true WHERE n.recipient.id = :recipientId AND n.status = 'UNREAD'")
    void markAllAsRead(@Param("recipientId") UUID recipientId);
}
