package com.orthopedic.api.modules.blog.repository;

import com.orthopedic.api.modules.blog.entity.BlogCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BlogCategoryRepository extends JpaRepository<BlogCategory, UUID> {
    Optional<BlogCategory> findBySlug(String slug);

    List<BlogCategory> findByIsActiveTrueOrderByDisplayOrderAsc();

    @Query("SELECT c, COUNT(p) FROM BlogCategory c LEFT JOIN BlogPost p ON p.category = c AND p.status = 'PUBLISHED' WHERE c.isActive = true GROUP BY c ORDER BY c.displayOrder")
    List<Object[]> findAllWithPostCount();
}
