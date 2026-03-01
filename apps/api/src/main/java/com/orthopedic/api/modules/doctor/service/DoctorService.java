package com.orthopedic.api.modules.doctor.service;

import com.orthopedic.api.modules.doctor.dto.request.CreateDoctorRequest;
import com.orthopedic.api.modules.doctor.dto.request.DoctorFilterRequest;
import com.orthopedic.api.modules.doctor.dto.response.DoctorResponse;
import com.orthopedic.api.modules.doctor.dto.response.DoctorSummaryResponse;
import com.orthopedic.api.shared.dto.PageResponse;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public interface DoctorService {
    PageResponse<DoctorSummaryResponse> getAllDoctors(DoctorFilterRequest filters, Pageable pageable);
    DoctorResponse getDoctorById(UUID id);
    DoctorResponse getDoctorByUserId(Long userId);
    DoctorResponse createDoctor(CreateDoctorRequest request);
    
    List<LocalTime> getAvailableSlots(UUID doctorId, LocalDate date);
}
