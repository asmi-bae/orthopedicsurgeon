package com.orthopedic.api.modules.lab.dto.request;

import com.orthopedic.api.modules.lab.entity.LabReport;
import jakarta.validation.constraints.NotNull;

public class UpdateLabReportResultRequest {
    @NotNull(message = "Status is required")
    private LabReport.LabReportStatus status;

    private String resultSummary;
    private String filePath;

    public LabReport.LabReportStatus getStatus() {
        return status;
    }

    public void setStatus(LabReport.LabReportStatus status) {
        this.status = status;
    }

    public String getResultSummary() {
        return resultSummary;
    }

    public void setResultSummary(String resultSummary) {
        this.resultSummary = resultSummary;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
}
