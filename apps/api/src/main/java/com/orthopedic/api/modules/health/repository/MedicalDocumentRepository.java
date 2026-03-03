package com.orthopedic.api.modules.health.repository;

import com.orthopedic.api.modules.health.entity.MedicalDocument;
import com.orthopedic.api.modules.health.entity.MedicalDocument.DocumentType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MedicalDocumentRepository extends JpaRepository<MedicalDocument, UUID> {
    Page<MedicalDocument> findByPatientIdAndIsDeletedFalse(UUID patientId, Pageable pageable);

    Page<MedicalDocument> findByPatientIdAndDocumentTypeAndIsDeletedFalse(UUID patientId, DocumentType type,
            Pageable pageable);

    Optional<MedicalDocument> findByIdAndPatientId(UUID id, UUID patientId);
}
