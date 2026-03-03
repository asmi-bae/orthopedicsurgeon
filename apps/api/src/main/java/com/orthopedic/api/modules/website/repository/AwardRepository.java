package com.orthopedic.api.modules.website.repository;

import com.orthopedic.api.modules.website.entity.Award;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface AwardRepository extends JpaRepository<Award, UUID> {
    List<Award> findByIsActiveTrueOrderByAwardYearDescDisplayOrderAsc();
}
