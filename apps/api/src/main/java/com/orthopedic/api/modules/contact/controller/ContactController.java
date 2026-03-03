package com.orthopedic.api.modules.contact.controller;

import com.orthopedic.api.modules.contact.dto.request.ContactMessageRequest;
import com.orthopedic.api.modules.contact.dto.request.NewsletterSubscribeRequest;
import com.orthopedic.api.modules.contact.service.impl.ContactServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/contact")
@RequiredArgsConstructor
@Tag(name = "Public Contact", description = "Public endpoints for contact and newsletter")
public class ContactController {

    private final ContactServiceImpl contactService;

    @PostMapping("/message")
    @Operation(summary = "Submit a contact message")
    public ResponseEntity<String> submitContactMessage(@Valid @RequestBody ContactMessageRequest request,
            HttpServletRequest httpRequest) {
        contactService.submitContactMessage(request, httpRequest.getRemoteAddr());
        return ResponseEntity.ok("Message submitted successfully.");
    }

    @PostMapping("/newsletter/subscribe")
    @Operation(summary = "Subscribe to newsletter")
    public ResponseEntity<String> subscribeNewsletter(@Valid @RequestBody NewsletterSubscribeRequest request) {
        contactService.subscribeNewsletter(request);
        return ResponseEntity.ok("Subscribed to newsletter successfully.");
    }
}
