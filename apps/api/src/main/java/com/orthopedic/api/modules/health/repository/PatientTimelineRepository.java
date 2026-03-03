package com.orthopedic.api.modules.health.repository;

import com.orthopedic.api.modules.health.entity.PatientTimeline;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface PatientTimelineRepository extends JpaRepository<PatientTimeline, UUID> {
    Page<PatientTimeline> findByPatientIdOrderByEventDateDesc(UUID patientId, Pageable pageable);

    Page<PatientTimeline> findByPatientIdAndEventType(UUID patientId, String eventType, Pageable pageable);
}
