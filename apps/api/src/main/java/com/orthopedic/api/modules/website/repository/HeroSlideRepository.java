package com.orthopedic.api.modules.website.repository;

import com.orthopedic.api.modules.website.entity.HeroSlide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface HeroSlideRepository extends JpaRepository<HeroSlide, UUID> {
    List<HeroSlide> findByIsActiveTrueOrderByDisplayOrderAsc();
}
