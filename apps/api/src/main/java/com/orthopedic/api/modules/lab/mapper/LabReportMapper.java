package com.orthopedic.api.modules.lab.mapper;

import com.orthopedic.api.modules.lab.dto.request.CreateLabReportRequest;
import com.orthopedic.api.modules.lab.dto.response.LabReportResponse;
import com.orthopedic.api.modules.lab.entity.LabReport;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface LabReportMapper {

    @Mapping(target = "appointment", ignore = true)
    @Mapping(target = "patient", ignore = true)
    @Mapping(target = "doctor", ignore = true)
    LabReport toEntity(CreateLabReportRequest request);

    @Mapping(target = "appointmentId", source = "appointment.id")
    @Mapping(target = "patient.id", source = "patient.id")
    @Mapping(target = "patient.fullName", expression = "java(report.getPatient().getUser().getFirstName() + \" \" + report.getPatient().getUser().getLastName())")
    @Mapping(target = "doctor.id", source = "doctor.id")
    @Mapping(target = "doctor.fullName", expression = "java(report.getDoctor() != null ? report.getDoctor().getUser().getFirstName() + \" \" + report.getDoctor().getUser().getLastName() : null)")
    @Mapping(target = "doctor.specialization", source = "doctor.specialization")
    LabReportResponse toResponse(LabReport report);
}
