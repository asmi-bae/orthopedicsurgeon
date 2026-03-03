package com.orthopedic.api.modules.patient.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import java.time.LocalDate;

@Builder
public record PatientRegisterRequest(
        @NotBlank String firstName,
        @NotBlank String lastName,
        @NotBlank @Email String email,
        @Pattern(regexp = "^[+]?[0-9\\s\\-()]{7,20}$") String phone,
        @NotBlank @Size(min = 8) String password,
        @NotBlank String confirmPassword,
        @NotNull LocalDate dateOfBirth,
        @NotNull String gender) {
}
