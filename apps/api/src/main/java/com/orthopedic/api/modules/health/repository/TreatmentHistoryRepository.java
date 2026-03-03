package com.orthopedic.api.modules.health.repository;

import com.orthopedic.api.modules.health.entity.TreatmentHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface TreatmentHistoryRepository extends JpaRepository<TreatmentHistory, UUID> {
    Page<TreatmentHistory> findByPatientIdOrderByTreatmentDateDesc(UUID patientId, Pageable pageable);

    Page<TreatmentHistory> findByPatientIdAndDoctorId(UUID patientId, UUID doctorId, Pageable pageable);
}
