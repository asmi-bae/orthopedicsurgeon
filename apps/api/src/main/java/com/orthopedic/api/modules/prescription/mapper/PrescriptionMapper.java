package com.orthopedic.api.modules.prescription.mapper;

import com.orthopedic.api.modules.prescription.dto.request.CreatePrescriptionRequest;
import com.orthopedic.api.modules.prescription.dto.response.PrescriptionResponse;
import com.orthopedic.api.modules.prescription.entity.Prescription;
import com.orthopedic.api.modules.prescription.entity.PrescriptionMedicine;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import org.mapstruct.AfterMapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PrescriptionMapper {

    @Mapping(target = "appointment", ignore = true)
    @Mapping(target = "patient", ignore = true)
    @Mapping(target = "doctor", ignore = true)
    @Mapping(target = "medicines", ignore = true)
    Prescription toEntity(CreatePrescriptionRequest request);

    @Mapping(target = "appointmentId", source = "appointment.id")
    @Mapping(target = "patient.id", source = "patient.id")
    @Mapping(target = "patient.fullName", ignore = true)
    @Mapping(target = "patient.phone", source = "patient.user.phone")
    @Mapping(target = "doctor.id", source = "doctor.id")
    @Mapping(target = "doctor.fullName", ignore = true)
    @Mapping(target = "doctor.specialization", source = "doctor.specialization")
    @Mapping(target = "doctor.hospitalName", source = "doctor.hospital.name")
    PrescriptionResponse toResponse(Prescription prescription);

    @AfterMapping
    default void finalizeResponse(@MappingTarget PrescriptionResponse response, Prescription prescription) {
        if (prescription.getPatient() != null && prescription.getPatient().getUser() != null) {
            response.getPatient().setFullName(prescription.getPatient().getUser().getFirstName() + " " + prescription.getPatient().getUser().getLastName());
        }
        if (prescription.getDoctor() != null && prescription.getDoctor().getUser() != null) {
            response.getDoctor().setFullName(prescription.getDoctor().getUser().getFirstName() + " " + prescription.getDoctor().getUser().getLastName());
        }
    }

    PrescriptionMedicine toMedicineEntity(CreatePrescriptionRequest.MedicineRequest request);
    
    PrescriptionResponse.MedicineResponse toMedicineResponse(PrescriptionMedicine medicine);
}
