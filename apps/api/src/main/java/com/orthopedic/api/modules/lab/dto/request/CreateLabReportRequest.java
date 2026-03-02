package com.orthopedic.api.modules.lab.dto.request;

import com.orthopedic.api.modules.lab.entity.LabReport;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

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

    public UUID getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(UUID appointmentId) {
        this.appointmentId = appointmentId;
    }

    public UUID getPatientId() {
        return patientId;
    }

    public void setPatientId(UUID patientId) {
        this.patientId = patientId;
    }

    public UUID getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(UUID doctorId) {
        this.doctorId = doctorId;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public LabReport.LabTestType getTestType() {
        return testType;
    }

    public void setTestType(LabReport.LabTestType testType) {
        this.testType = testType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getInternalNotes() {
        return internalNotes;
    }

    public void setInternalNotes(String internalNotes) {
        this.internalNotes = internalNotes;
    }
}
