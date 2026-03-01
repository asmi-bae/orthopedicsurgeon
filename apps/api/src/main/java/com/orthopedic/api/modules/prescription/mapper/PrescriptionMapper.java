package com.orthopedic.api.modules.prescription.mapper;

import com.orthopedic.api.modules.prescription.dto.request.CreatePrescriptionRequest;
import com.orthopedic.api.modules.prescription.dto.response.PrescriptionResponse;
import com.orthopedic.api.modules.prescription.entity.Prescription;
import com.orthopedic.api.modules.prescription.entity.PrescriptionMedicine;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PrescriptionMapper {

    @Mapping(target = "appointment", ignore = true)
    @Mapping(target = "patient", ignore = true)
    @Mapping(target = "doctor", ignore = true)
    @Mapping(target = "medicines", ignore = true)
    Prescription toEntity(CreatePrescriptionRequest request);

    @Mapping(target = "appointmentId", source = "appointment.id")
    @Mapping(target = "patient.id", source = "patient.id")
    @Mapping(target = "patient.fullName", expression = "java(prescription.getPatient().getUser().getFirstName() + \" \" + prescription.getPatient().getUser().getLastName())")
    @Mapping(target = "patient.phone", source = "patient.user.phone")
    @Mapping(target = "doctor.id", source = "doctor.id")
    @Mapping(target = "doctor.fullName", expression = "java(prescription.getDoctor().getUser().getFirstName() + \" \" + prescription.getDoctor().getUser().getLastName())")
    @Mapping(target = "doctor.specialization", source = "doctor.specialization")
    @Mapping(target = "doctor.hospitalName", source = "doctor.hospital.name")
    PrescriptionResponse toResponse(Prescription prescription);

    PrescriptionMedicine toMedicineEntity(CreatePrescriptionRequest.MedicineRequest request);
    
    PrescriptionResponse.MedicineResponse toMedicineResponse(PrescriptionMedicine medicine);
}
