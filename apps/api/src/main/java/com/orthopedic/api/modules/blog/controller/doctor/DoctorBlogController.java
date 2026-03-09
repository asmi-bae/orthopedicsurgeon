package com.orthopedic.api.modules.blog.controller.doctor;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.modules.blog.dto.request.CreateBlogPostRequest;
import com.orthopedic.api.modules.blog.dto.response.BlogPostResponse;
import com.orthopedic.api.modules.blog.service.impl.BlogServiceImpl;
import com.orthopedic.api.rbac.annotation.CurrentUser;
import com.orthopedic.api.shared.base.BaseController;
import com.orthopedic.api.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/doctor/blog")
@Tag(name = "Doctor Blog Management", description = "Endpoints for doctors to manage blog posts and comments")
@PreAuthorize("hasAnyRole('DOCTOR_ADMIN', 'SUPER_ADMIN')")
@RequiredArgsConstructor
public class DoctorBlogController extends BaseController {

    private final BlogServiceImpl blogService;

    @GetMapping("/posts")
    @Operation(summary = "Get all blog posts for management")
    public ResponseEntity<ApiResponse<List<BlogPostResponse>>> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return ok(blogService.getAllPostsForAdmin(page, size));
    }

    @PostMapping("/posts")
    @Operation(summary = "Create a new blog post")
    public ResponseEntity<ApiResponse<BlogPostResponse>> createPost(
            @Valid @RequestBody CreateBlogPostRequest request,
            @CurrentUser User currentUser) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Blog post created", blogService.createPost(request, currentUser.getId())));
    }

    @DeleteMapping("/posts/{id}")
    @Operation(summary = "Delete a blog post")
    public ResponseEntity<ApiResponse<Void>> deletePost(@PathVariable UUID id) {
        blogService.deletePost(id);
        return ok("Blog post deleted", null);
    }
}
