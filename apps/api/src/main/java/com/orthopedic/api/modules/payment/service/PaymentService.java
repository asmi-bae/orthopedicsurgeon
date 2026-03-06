package com.orthopedic.api.modules.payment.service;

import com.orthopedic.api.auth.entity.User;
import com.orthopedic.api.modules.payment.dto.request.CreatePaymentRequest;
import com.orthopedic.api.modules.payment.dto.response.PaymentResponse;
import com.orthopedic.api.shared.dto.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface PaymentService {
    PaymentResponse createPayment(CreatePaymentRequest request);
    PaymentResponse getPaymentById(UUID id, User currentUser);
    PaymentResponse getPaymentByAppointment(UUID appointmentId, User currentUser);
    PageResponse<PaymentResponse> getPatientPayments(UUID patientId, Pageable pageable, User currentUser);
    
    PaymentResponse processPayment(UUID id, String transactionId);
    
    PageResponse<PaymentResponse> getAllPayments(Pageable pageable);
    com.orthopedic.api.modules.payment.dto.response.FinancialSummaryResponse getFinancialSummary();
}
