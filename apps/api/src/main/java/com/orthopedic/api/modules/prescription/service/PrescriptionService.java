package com.orthopedic.api.modules.prescription.service;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.modules.prescription.dto.request.CreatePrescriptionRequest;
import com.orthopedic.api.modules.prescription.dto.response.PrescriptionResponse;
import com.orthopedic.api.shared.dto.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface PrescriptionService {
    PrescriptionResponse createPrescription(CreatePrescriptionRequest request, User currentUser);
    PrescriptionResponse getPrescriptionById(UUID id, User currentUser);
    PrescriptionResponse getPrescriptionByAppointment(UUID appointmentId, User currentUser);
    PageResponse<PrescriptionResponse> getPatientPrescriptions(UUID patientId, Pageable pageable, User currentUser);
    PageResponse<PrescriptionResponse> getAllPrescriptions(Pageable pageable);
    byte[] downloadPrescription(UUID id, User currentUser);
}
