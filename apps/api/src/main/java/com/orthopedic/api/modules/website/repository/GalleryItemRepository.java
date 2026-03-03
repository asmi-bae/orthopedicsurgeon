package com.orthopedic.api.modules.website.repository;

import com.orthopedic.api.modules.website.entity.GalleryItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface GalleryItemRepository extends JpaRepository<GalleryItem, UUID> {
    List<GalleryItem> findByIsActiveTrueOrderByDisplayOrderAsc();

    Page<GalleryItem> findByIsActiveTrueAndCategory(String category, Pageable pageable);
}
