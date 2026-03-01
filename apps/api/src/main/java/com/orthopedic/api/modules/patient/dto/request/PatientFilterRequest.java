package com.orthopedic.api.modules.patient.dto.request;

import com.orthopedic.api.modules.patient.entity.Patient;
import lombok.Data;

@Data
public class PatientFilterRequest {
    private Patient.BloodGroup bloodGroup;
    private Patient.Gender gender;
    private String city;
    private String insuranceProvider;
    private Patient.PatientStatus status;
    private String search;
}
