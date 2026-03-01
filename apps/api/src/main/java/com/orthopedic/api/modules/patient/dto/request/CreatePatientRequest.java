package com.orthopedic.api.modules.patient.dto.request;

import com.orthopedic.api.modules.patient.entity.Patient;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class CreatePatientRequest {
    @NotNull(message = "User ID is required")
    private Long userId;

    private Patient.BloodGroup bloodGroup;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    @NotNull(message = "Gender is required")
    private Patient.Gender gender;

    private String emergencyContactName;
    private String emergencyContactPhone;
    private String address;
    private String city;
    private String insuranceProvider;
    private String insuranceNumber;
    private String medicalHistoryNotes;

    private List<AllergyRequest> allergies;
    private List<ConditionRequest> conditions;

    @Data
    public static class AllergyRequest {
        private String allergy;
        private Patient.PatientAllergy.Severity severity;
    }

    @Data
    public static class ConditionRequest {
        private String condition;
        private LocalDate diagnosedDate;
        private Boolean isActive = true;
    }
}
