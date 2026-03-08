package com.orthopedic.api.modules.notification.dto.response;

import com.orthopedic.api.shared.dto.PageResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationListResponse {
    private PageResponse<NotificationResponse> notifications;
    private long unreadCount;
}
