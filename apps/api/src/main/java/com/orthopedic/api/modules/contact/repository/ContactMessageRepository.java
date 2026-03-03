package com.orthopedic.api.modules.contact.repository;

import com.orthopedic.api.modules.contact.entity.ContactMessage;
import com.orthopedic.api.modules.contact.entity.ContactMessage.ContactMessageStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, UUID> {
    Page<ContactMessage> findAllByOrderByCreatedAtDesc(Pageable pageable);

    Page<ContactMessage> findByStatus(ContactMessageStatus status, Pageable pageable);
}
