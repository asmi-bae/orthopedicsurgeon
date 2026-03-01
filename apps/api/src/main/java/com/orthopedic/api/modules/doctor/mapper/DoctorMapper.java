package com.orthopedic.api.modules.doctor.mapper;

import com.orthopedic.api.modules.doctor.dto.request.AvailabilityRequest;
import com.orthopedic.api.modules.doctor.dto.request.CreateDoctorRequest;
import com.orthopedic.api.modules.doctor.dto.response.DoctorAvailabilityResponse;
import com.orthopedic.api.modules.doctor.dto.response.DoctorResponse;
import com.orthopedic.api.modules.doctor.dto.response.DoctorSummaryResponse;
import com.orthopedic.api.modules.doctor.entity.Doctor;
import com.orthopedic.api.modules.doctor.entity.DoctorAvailability;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DoctorMapper {

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "hospital", ignore = true)
    Doctor toEntity(CreateDoctorRequest request);

    @Mapping(target = "user.id", source = "user.id")
    @Mapping(target = "user.firstName", source = "user.firstName")
    @Mapping(target = "user.lastName", source = "user.lastName")
    @Mapping(target = "user.email", source = "user.email")
    @Mapping(target = "user.phone", source = "user.phone")
    @Mapping(target = "hospital.id", source = "hospital.id")
    @Mapping(target = "hospital.name", source = "hospital.name")
    @Mapping(target = "hospital.city", source = "hospital.city")
    DoctorResponse toResponse(Doctor doctor);

    @Mapping(target = "fullName", expression = "java(doctor.getUser().getFirstName() + \" \" + doctor.getUser().getLastName())")
    @Mapping(target = "hospitalName", source = "hospital.name")
    DoctorSummaryResponse toSummaryResponse(Doctor doctor);

    DoctorAvailability toAvailabilityEntity(AvailabilityRequest request);

    DoctorAvailabilityResponse toAvailabilityResponse(DoctorAvailability availability);
}
