package com.orthopedic.api.modules.contact.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record ContactMessageRequest(
        @NotBlank @Size(max = 150) String name,
        @NotBlank @Email String email,
        @Pattern(regexp = "^[+]?[0-9\\s\\-()]{7,20}$") String phone,
        @NotBlank @Size(max = 300) String subject,
        @NotBlank @Size(min = 10, max = 1000) String message) {
}
