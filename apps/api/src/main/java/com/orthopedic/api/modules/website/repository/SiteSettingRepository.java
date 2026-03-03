package com.orthopedic.api.modules.website.repository;

import com.orthopedic.api.modules.website.entity.SiteSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SiteSettingRepository extends JpaRepository<SiteSetting, UUID> {
    Optional<SiteSetting> findByKey(String key);

    List<SiteSetting> findByIsPublicTrue();

    List<SiteSetting> findByCategory(String category);
}
