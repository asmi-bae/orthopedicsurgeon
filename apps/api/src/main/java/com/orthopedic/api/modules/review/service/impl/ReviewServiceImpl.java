package com.orthopedic.api.modules.review.service.impl;

import com.orthopedic.api.modules.appointment.entity.Appointment;
import com.orthopedic.api.modules.appointment.repository.AppointmentRepository;
import com.orthopedic.api.modules.doctor.repository.DoctorRepository;
import com.orthopedic.api.modules.patient.repository.PatientRepository;
import com.orthopedic.api.modules.review.dto.request.CreateReviewRequest;
import com.orthopedic.api.modules.review.dto.response.ReviewResponse;
import com.orthopedic.api.modules.review.dto.response.ReviewSummaryResponse;
import com.orthopedic.api.modules.review.entity.DoctorReview;
import com.orthopedic.api.modules.review.repository.DoctorReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl {

    private final DoctorReviewRepository reviewRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;

    @Transactional
    public ReviewResponse createReview(UUID patientId, CreateReviewRequest request) {
        if (reviewRepository.findByAppointmentId(request.appointmentId()).isPresent()) {
            throw new RuntimeException("Review already exists for this appointment");
        }

        Appointment appointment = appointmentRepository.findById(request.appointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (!appointment.getPatient().getId().equals(patientId)) {
            throw new RuntimeException("Unauthorized");
        }

        DoctorReview review = DoctorReview.builder()
                .patient(appointment.getPatient())
                .doctor(appointment.getDoctor())
                .appointment(appointment)
                .rating(request.rating())
                .reviewText(request.reviewText())
                .isVerified(true) // Assuming verified since tied to appointment
                .isPublished(false) // Needs moderation
                .build();

        DoctorReview saved = reviewRepository.save(review);

        return ReviewResponse.builder()
                .id(saved.getId())
                .patientDisplayName(saved.getPatient().getUser().getFirstName() + " "
                        + saved.getPatient().getUser().getLastName().substring(0, 1) + ".")
                .rating(saved.getRating())
                .reviewText(saved.getReviewText())
                .isVerified(saved.getIsVerified())
                .isPublished(saved.getIsPublished())
                .createdAt(saved.getCreatedAt())
                .build();
    }

    @Transactional(readOnly = true)
    public Page<ReviewResponse> getDoctorReviews(UUID doctorId, Pageable pageable) {
        return reviewRepository.findByDoctorIdAndIsPublishedTrue(doctorId, pageable)
                .map(r -> ReviewResponse.builder()
                        .id(r.getId())
                        .patientDisplayName(r.getPatient().getUser().getFirstName() + " "
                                + r.getPatient().getUser().getLastName().substring(0, 1) + ".")
                        .rating(r.getRating())
                        .reviewText(r.getReviewText())
                        .isVerified(r.getIsVerified())
                        .isPublished(r.getIsPublished())
                        .createdAt(r.getCreatedAt())
                        .build());
    }

    @Transactional(readOnly = true)
    public ReviewSummaryResponse getDoctorReviewSummary(UUID doctorId) {
        Double avgRating = reviewRepository.findAverageRating(doctorId);
        long totalReviews = reviewRepository.countByDoctorIdAndIsPublishedTrue(doctorId);
        List<Object[]> breakdown = reviewRepository.findRatingBreakdown(doctorId);

        Map<Integer, Long> ratingMap = new HashMap<>();
        for (int i = 1; i <= 5; i++)
            ratingMap.put(i, 0L);

        for (Object[] row : breakdown) {
            ratingMap.put(((Number) row[0]).intValue(), ((Number) row[1]).longValue());
        }

        return ReviewSummaryResponse.builder()
                .averageRating(avgRating != null ? avgRating : 0.0)
                .totalReviews(totalReviews)
                .ratingBreakdown(ratingMap)
                .build();
    }
}
