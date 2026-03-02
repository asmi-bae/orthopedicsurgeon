package com.orthopedic.api.modules.patient.mapper;

import com.orthopedic.api.modules.patient.dto.request.CreatePatientRequest;
import com.orthopedic.api.modules.patient.dto.response.PatientResponse;
import com.orthopedic.api.modules.patient.dto.response.PatientSummaryResponse;
import com.orthopedic.api.modules.patient.entity.Patient;
import com.orthopedic.api.modules.patient.entity.PatientAllergy;
import com.orthopedic.api.modules.patient.entity.PatientMedicalCondition;
import org.mapstruct.*;

import java.time.LocalDate;
import java.time.Period;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PatientMapper {

    @Mapping(target = "user", ignore = true)
    Patient toEntity(CreatePatientRequest request);

    @Mapping(target = "user.id", source = "user.id")
    @Mapping(target = "user.firstName", source = "user.firstName")
    @Mapping(target = "user.lastName", source = "user.lastName")
    @Mapping(target = "user.email", source = "user.email")
    @Mapping(target = "user.phone", source = "user.phone")
    @Mapping(target = "age", expression = "java(calculateAge(patient.getDateOfBirth()))")
    PatientResponse toResponse(Patient patient);

    @Mapping(target = "fullName", expression = "java(patient.getUser().getFirstName() + \" \" + patient.getUser().getLastName())")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "phone", source = "user.phone")
    PatientSummaryResponse toSummaryResponse(Patient patient);

    PatientAllergy toAllergyEntity(CreatePatientRequest.AllergyRequest request);

    PatientResponse.AllergyResponse toAllergyResponse(PatientAllergy allergy);

    PatientMedicalCondition toConditionEntity(CreatePatientRequest.ConditionRequest request);

    PatientResponse.ConditionResponse toConditionResponse(PatientMedicalCondition condition);

    default int calculateAge(LocalDate dateOfBirth) {
        if (dateOfBirth == null)
            return 0;
        return Period.between(dateOfBirth, LocalDate.now()).getYears();
    }
}
