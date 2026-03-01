package com.orthopedic.api.modules.prescription.repository;

import com.orthopedic.api.modules.prescription.entity.Prescription;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, UUID> {
    Optional<Prescription> findByAppointmentId(UUID appointmentId);
    Page<Prescription> findAllByPatientId(UUID patientId, Pageable pageable);
    Page<Prescription> findAllByDoctorId(UUID doctorId, Pageable pageable);
}
