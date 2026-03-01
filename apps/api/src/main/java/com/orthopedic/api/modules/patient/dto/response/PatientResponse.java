package com.orthopedic.api.modules.patient.dto.response;

import com.orthopedic.api.modules.patient.entity.Patient;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
public class PatientResponse {
    private UUID id;
    private UserSummary user;
    private Patient.BloodGroup bloodGroup;
    private LocalDate dateOfBirth;
    private int age;
    private Patient.Gender gender;
    private String emergencyContactName;
    private String emergencyContactPhone;
    private String address;
    private String city;
    private String insuranceProvider;
    private String insuranceNumber;
    private String medicalHistoryNotes;
    private Patient.PatientStatus status;
    private List<AllergyResponse> allergies;
    private List<ConditionResponse> conditions;

    @Data
    public static class UserSummary {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private String phone;
    }

    @Data
    public static class AllergyResponse {
        private String allergy;
        private Patient.PatientAllergy.Severity severity;
    }

    @Data
    public static class ConditionResponse {
        private String condition;
        private LocalDate diagnosedDate;
        private Boolean isActive;
    }
}
