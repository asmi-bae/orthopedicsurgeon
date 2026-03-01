package com.orthopedic.api.modules.patient.dto.response;

import com.orthopedic.api.modules.patient.entity.Patient;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class PatientSummaryResponse {
    private UUID id;
    private String fullName;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private Patient.BloodGroup bloodGroup;
    private Patient.Gender gender;
    private Patient.PatientStatus status;
}
