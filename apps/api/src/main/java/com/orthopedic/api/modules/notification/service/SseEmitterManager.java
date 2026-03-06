package com.orthopedic.api.modules.notification.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SseEmitterManager {
    private static final Logger log = LoggerFactory.getLogger(SseEmitterManager.class);

    // Map of User ID to SseEmitter
    private final Map<UUID, SseEmitter> emitters = new ConcurrentHashMap<>();

    public SseEmitter createEmitter(UUID userId) {
        // Default timeout of 30 minutes
        SseEmitter emitter = new SseEmitter(30 * 60 * 1000L);

        emitter.onCompletion(() -> cleanup(userId, "completed"));
        emitter.onTimeout(() -> cleanup(userId, "timeout"));
        emitter.onError(e -> cleanup(userId, "error: " + e.getMessage()));

        emitters.put(userId, emitter);
        log.info("Created SSE emitter for user {}", userId);

        // Send initial connect event
        try {
            emitter.send(SseEmitter.event()
                    .name("CONNECT")
                    .data("Connected successfully"));
        } catch (IOException e) {
            cleanup(userId, "initial send failed");
        }

        return emitter;
    }

    public void sendToUser(UUID userId, Object data) {
        SseEmitter emitter = emitters.get(userId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .name("NOTIFICATION")
                        .data(data));
                log.debug("Sent SSE notification to user {}", userId);
            } catch (IOException e) {
                cleanup(userId, "send failed");
            }
        }
    }

    public void broadcast(Object data) {
        emitters.forEach((userId, emitter) -> {
            try {
                emitter.send(SseEmitter.event()
                        .name("NOTIFICATION")
                        .data(data));
            } catch (IOException e) {
                cleanup(userId, "broadcast failed");
            }
        });
        log.info("Broadcasted SSE notification to {} users", emitters.size());
    }

    private void cleanup(UUID userId, String reason) {
        emitters.remove(userId);
        log.info("Cleaned up SSE emitter for user {} due to {}", userId, reason);
    }
}
