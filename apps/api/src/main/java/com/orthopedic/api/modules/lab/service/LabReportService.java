package com.orthopedic.api.modules.lab.service;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.modules.lab.dto.request.CreateLabReportRequest;
import com.orthopedic.api.modules.lab.dto.request.UpdateLabReportResultRequest;
import com.orthopedic.api.modules.lab.dto.response.LabReportResponse;
import com.orthopedic.api.shared.dto.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface LabReportService {
    LabReportResponse createReportRequest(CreateLabReportRequest request);
    LabReportResponse updateReportResult(UUID id, UpdateLabReportResultRequest request);
    LabReportResponse getReportById(UUID id, User currentUser);
    PageResponse<LabReportResponse> getPatientReports(UUID patientId, Pageable pageable, User currentUser);
    PageResponse<LabReportResponse> getDoctorReports(UUID doctorId, Pageable pageable, User currentUser);
    PageResponse<LabReportResponse> getAllReports(Pageable pageable);
}
