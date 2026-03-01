package com.orthopedic.api.modules.lab.dto.request;

import com.orthopedic.api.modules.lab.entity.LabReport;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class CreateLabReportRequest {
    private UUID appointmentId;

    @NotNull(message = "Patient ID is required")
    private UUID patientId;

    private UUID doctorId;

    @NotBlank(message = "Test name is required")
    private String testName;

    @NotNull(message = "Test type is required")
    private LabReport.LabTestType testType;

    private String description;
    private String internalNotes;
}
