package com.orthopedic.api.modules.review.repository;

import com.orthopedic.api.modules.review.entity.DoctorReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DoctorReviewRepository extends JpaRepository<DoctorReview, UUID> {
    Page<DoctorReview> findByDoctorIdAndIsPublishedTrue(UUID doctorId, Pageable pageable);

    Page<DoctorReview> findByPatientId(UUID patientId, Pageable pageable);

    Optional<DoctorReview> findByAppointmentId(UUID appointmentId);

    @Query("SELECT AVG(r.rating) FROM DoctorReview r WHERE r.doctor.id = :doctorId AND r.isPublished = true")
    Double findAverageRating(@Param("doctorId") UUID doctorId);

    @Query("SELECT r.rating, COUNT(r) FROM DoctorReview r WHERE r.doctor.id = :doctorId AND r.isPublished = true GROUP BY r.rating")
    List<Object[]> findRatingBreakdown(@Param("doctorId") UUID doctorId);

    long countByDoctorIdAndIsPublishedTrue(UUID doctorId);

    Page<DoctorReview> findByIsPublishedFalseOrderByCreatedAtDesc(Pageable pageable);
}
