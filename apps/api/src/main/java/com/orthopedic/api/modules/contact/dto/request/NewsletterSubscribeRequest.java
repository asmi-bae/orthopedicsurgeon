package com.orthopedic.api.modules.contact.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record NewsletterSubscribeRequest(
        @NotBlank @Email String email,
        @Size(max = 150) String name) {
}
