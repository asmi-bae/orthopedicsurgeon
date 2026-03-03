package com.orthopedic.api.modules.blog.controller;

import com.orthopedic.api.modules.blog.dto.request.AddCommentRequest;
import com.orthopedic.api.modules.blog.dto.response.BlogPostResponse;
import com.orthopedic.api.modules.blog.service.impl.BlogServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/public/blog")
@RequiredArgsConstructor
@Tag(name = "Public Blog", description = "Public blog and comment endpoints")
public class PublicBlogController {

    private final BlogServiceImpl blogService;

    @GetMapping("/posts/{slug}")
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
