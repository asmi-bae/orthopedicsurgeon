package com.orthopedic.api.modules.blog.repository;

import com.orthopedic.api.modules.blog.entity.BlogComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface BlogCommentRepository extends JpaRepository<BlogComment, UUID> {
    Page<BlogComment> findByPostIdAndIsApprovedTrueAndParentCommentIsNull(UUID postId, Pageable pageable);

    List<BlogComment> findByParentCommentIdAndIsApprovedTrue(UUID parentId);

    Page<BlogComment> findByIsApprovedFalseOrderByCreatedAtDesc(Pageable pageable);

    long countByPostIdAndIsApprovedTrue(UUID postId);

    @org.springframework.data.jpa.repository.Query("SELECT c.post.id, COUNT(c) FROM BlogComment c WHERE c.post.id IN :postIds AND c.isApproved = true GROUP BY c.post.id")
    List<Object[]> countByPostIds(@org.springframework.data.repository.query.Param("postIds") List<UUID> postIds);
}
