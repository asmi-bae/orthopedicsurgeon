package com.orthopedic.api.modules.blog.repository;

import com.orthopedic.api.modules.blog.entity.BlogTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BlogTagRepository extends JpaRepository<BlogTag, UUID> {
    Optional<BlogTag> findBySlug(String slug);

    Optional<BlogTag> findByName(String name);
}
