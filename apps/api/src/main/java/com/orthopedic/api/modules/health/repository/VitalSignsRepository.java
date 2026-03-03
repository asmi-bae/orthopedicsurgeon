package com.orthopedic.api.modules.health.repository;

import com.orthopedic.api.modules.health.entity.VitalSigns;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface VitalSignsRepository extends JpaRepository<VitalSigns, UUID> {
    Page<VitalSigns> findByPatientIdOrderByRecordedAtDesc(UUID patientId, Pageable pageable);

    Optional<VitalSigns> findFirstByPatientIdOrderByRecordedAtDesc(UUID patientId);

    @Query("SELECT v FROM VitalSigns v WHERE v.patient.id = :patientId AND v.recordedAt >= :from ORDER BY v.recordedAt ASC")
    List<VitalSigns> findForChart(@Param("patientId") UUID patientId, @Param("from") LocalDateTime from);
}
