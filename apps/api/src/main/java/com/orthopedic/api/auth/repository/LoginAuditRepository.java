package com.orthopedic.api.auth.repository;

import com.orthopedic.api.auth.entity.LoginAudit;
import com.orthopedic.api.auth.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginAuditRepository extends JpaRepository<LoginAudit, java.util.UUID> {
    Page<LoginAudit> findByUserOrderByTimestampDesc(User user, Pageable pageable);
    void deleteByUser(User user);
}
