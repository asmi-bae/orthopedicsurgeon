package com.orthopedic.api.modules.notification.controller;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.modules.notification.dto.request.SendNotificationRequest;
import com.orthopedic.api.modules.notification.dto.response.NotificationResponse;
import com.orthopedic.api.modules.notification.service.NotificationService;
import com.orthopedic.api.rbac.annotation.CurrentUser;
import com.orthopedic.api.shared.base.BaseController;
import com.orthopedic.api.shared.dto.ApiResponse;
import com.orthopedic.api.shared.dto.PageResponse;
import com.orthopedic.api.shared.util.PageableUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Arrays;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/notifications")
@Tag(name = "Notification Management", description = "Endpoints for user alerts and notifications")
public class NotificationController extends BaseController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    @Operation(summary = "Get current user's notifications")
    public ResponseEntity<ApiResponse<PageResponse<NotificationResponse>>> getMyNotifications(
            @CurrentUser User currentUser,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "DESC") String direction) {

        Pageable pageable = PageableUtils.createPageable(page, size, sort, direction,
                Arrays.asList("createdAt", "status"));

        return ok(notificationService.getMyNotifications(currentUser, pageable));
    }

    @GetMapping("/unread-count")
    @Operation(summary = "Get count of unread notifications")
    public ResponseEntity<ApiResponse<Long>> getUnreadCount(@CurrentUser User currentUser) {
        return ok(notificationService.getUnreadCount(currentUser));
    }

    @PutMapping("/{id}/read")
    @Operation(summary = "Mark a specific notification as read")
    public ResponseEntity<ApiResponse<Void>> markAsRead(@PathVariable UUID id, @CurrentUser User currentUser) {
        notificationService.markAsRead(id, currentUser);
        return ok("Marked as read", null);
    }

    @PutMapping("/mark-all-read")
    @Operation(summary = "Mark all notifications as read")
    public ResponseEntity<ApiResponse<Void>> markAllAsRead(@CurrentUser User currentUser) {
        notificationService.markAllAsRead(currentUser);
        return ok("All notifications marked as read", null);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a notification")
    public ResponseEntity<ApiResponse<Void>> deleteNotification(@PathVariable UUID id, @CurrentUser User currentUser) {
        notificationService.deleteNotification(id, currentUser);
        return ok("Notification deleted", null);
    }

    @PostMapping("/send")
    @Operation(summary = "Admin sends a notification")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> sendNotification(
            @RequestBody SendNotificationRequest request) {
        if (request.getRecipientId() != null) {
            notificationService.sendNotification(request);
        } else if (request.getRecipientRole() != null) {
            notificationService.sendToRole(request.getRecipientRole(), request);
        } else {
            notificationService.sendToAll(request);
        }
        return ok("Notification sent successfully", null);
    }

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @Operation(summary = "Subscribe to real-time notification stream")
    public SseEmitter stream(@CurrentUser User currentUser) {
        return notificationService.subscribe(currentUser);
    }
}
