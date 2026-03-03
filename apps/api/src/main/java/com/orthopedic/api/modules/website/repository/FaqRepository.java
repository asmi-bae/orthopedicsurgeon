package com.orthopedic.api.modules.website.repository;

import com.orthopedic.api.modules.website.entity.Faq;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface FaqRepository extends JpaRepository<Faq, UUID> {
    List<Faq> findByIsActiveTrueOrderByCategoryAscDisplayOrderAsc();

    Page<Faq> findByIsActiveTrueAndCategory(String category, Pageable pageable);

    @Query("SELECT DISTINCT f.category FROM Faq f WHERE f.isActive = true")
    List<String> findDistinctCategories();
}
