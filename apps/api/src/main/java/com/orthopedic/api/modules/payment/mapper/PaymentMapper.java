package com.orthopedic.api.modules.payment.mapper;

import com.orthopedic.api.modules.payment.dto.request.CreatePaymentRequest;
import com.orthopedic.api.modules.payment.dto.response.PaymentResponse;
import com.orthopedic.api.modules.payment.entity.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PaymentMapper {

    @Mapping(target = "appointment", ignore = true)
    @Mapping(target = "patient", ignore = true)
    Payment toEntity(CreatePaymentRequest request);

    @Mapping(target = "appointmentId", source = "appointment.id")
    @Mapping(target = "patientId", source = "patient.id")
    @Mapping(target = "patientName", expression = "java(payment.getPatient().getUser().getFirstName() + \" \" + payment.getPatient().getUser().getLastName())")
    PaymentResponse toResponse(Payment payment);
}
