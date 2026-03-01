package com.orthopedic.api.modules.lab.dto.request;

import com.orthopedic.api.modules.lab.entity.LabReport;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateLabReportResultRequest {
    @NotNull(message = "Status is required")
    private LabReport.LabReportStatus status;

    private String resultSummary;
    private String filePath;
}
