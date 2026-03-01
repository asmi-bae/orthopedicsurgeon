package com.orthopedic.api.modules.lab.repository;

import com.orthopedic.api.modules.lab.entity.LabReport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LabReportRepository extends JpaRepository<LabReport, UUID> {
    Page<LabReport> findAllByPatientId(UUID patientId, Pageable pageable);
    Page<LabReport> findAllByDoctorId(UUID doctorId, Pageable pageable);
    List<LabReport> findAllByAppointmentId(UUID appointmentId);
}
