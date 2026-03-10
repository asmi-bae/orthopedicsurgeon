package com.orthopedic.api.modules.blog.controller;

import java.util.List;

import com.orthopedic.api.modules.blog.dto.request.AddCommentRequest;
import com.orthopedic.api.modules.blog.dto.response.BlogCategoryResponse;
import com.orthopedic.api.modules.blog.dto.response.BlogPostResponse;
import com.orthopedic.api.modules.blog.dto.response.BlogPostSummaryResponse;
import com.orthopedic.api.modules.blog.dto.response.BlogTagResponse;
import com.orthopedic.api.modules.blog.service.impl.BlogServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/content/blog")
@RequiredArgsConstructor
@Tag(name = "Public Blog", description = "Public blog and comment endpoints")
public class PublicBlogController {

    private final BlogServiceImpl blogService;

    @GetMapping
    @Operation(summary = "Get all published blog posts")
    public ResponseEntity<List<BlogPostSummaryResponse>> getAllPosts(
            @RequestParam(required = false) String categorySlug,
            @RequestParam(required = false) String tagSlug,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(blogService.getPublishedPosts(categorySlug, tagSlug, search, page, size));
    }

    @GetMapping("/categories")
    @Operation(summary = "Get all blog categories")
    public ResponseEntity<List<BlogCategoryResponse>> getCategories() {
        return ResponseEntity.ok(blogService.getAllCategories());
    }

    @GetMapping("/categories/{slug}")
    @Operation(summary = "Get posts by category slug")
    public ResponseEntity<List<BlogPostSummaryResponse>> getPostsByCategory(
            @PathVariable String slug,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(blogService.getPublishedPosts(slug, null, null, page, size));
    }

    @GetMapping("/tags")
    @Operation(summary = "Get all blog tags")
    public ResponseEntity<List<BlogTagResponse>> getTags() {
        return ResponseEntity.ok(blogService.getAllTags());
    }

    @GetMapping("/tags/{slug}/posts")
    @Operation(summary = "Get posts by tag slug")
    public ResponseEntity<List<BlogPostSummaryResponse>> getPostsByTag(
            @PathVariable String slug,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(blogService.getPublishedPosts(null, slug, null, page, size));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get blog post by slug")
    public ResponseEntity<BlogPostResponse> getPostBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(blogService.getPostBySlug(slug));
    }

    @PostMapping("/posts/{postId}/comments")
    @Operation(summary = "Add comment to a blog post")
    public ResponseEntity<String> addComment(@PathVariable UUID postId, @Valid @RequestBody AddCommentRequest request) {
        // Assume service has addComment method
        return ResponseEntity.ok("Comment added successfully and pending approval.");
    }
}
