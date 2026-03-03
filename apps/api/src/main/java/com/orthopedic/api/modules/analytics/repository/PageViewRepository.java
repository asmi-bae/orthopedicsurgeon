package com.orthopedic.api.modules.analytics.repository;

import com.orthopedic.api.modules.analytics.entity.PageView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface PageViewRepository extends JpaRepository<PageView, UUID> {
}
