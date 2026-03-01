package com.orthopedic.api.modules.payment.repository;

import com.orthopedic.api.modules.payment.entity.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID> {
    Optional<Payment> findByAppointmentId(UUID appointmentId);
    Page<Payment> findAllByPatientId(UUID patientId, Pageable pageable);
    Optional<Payment> findByTransactionId(String transactionId);
}
