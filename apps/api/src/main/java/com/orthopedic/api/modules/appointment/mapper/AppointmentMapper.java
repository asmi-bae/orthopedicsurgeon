package com.orthopedic.api.modules.appointment.mapper;

import com.orthopedic.api.modules.appointment.dto.request.BookAppointmentRequest;
import com.orthopedic.api.modules.appointment.dto.response.AppointmentResponse;
import com.orthopedic.api.modules.appointment.dto.response.AppointmentSummaryResponse;
import com.orthopedic.api.modules.appointment.entity.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import org.mapstruct.AfterMapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AppointmentMapper {

    @Mapping(target = "doctor", ignore = true)
    @Mapping(target = "patient", ignore = true)
    @Mapping(target = "service", ignore = true)
    @Mapping(target = "hospital", ignore = true)
    Appointment toEntity(BookAppointmentRequest request);

    @Mapping(target = "patient.id", source = "patient.id")
    @Mapping(target = "patient.fullName", ignore = true)
    @Mapping(target = "patient.phone", source = "patient.user.phone")
    @Mapping(target = "doctor.id", source = "doctor.id")
    @Mapping(target = "doctor.fullName", ignore = true)
    @Mapping(target = "doctor.specialization", source = "doctor.specialization")
    @Mapping(target = "service.id", source = "service.id")
    @Mapping(target = "service.name", source = "service.name")
    @Mapping(target = "service.durationMinutes", source = "service.durationMinutes")
    @Mapping(target = "hospital.id", source = "hospital.id")
    @Mapping(target = "hospital.name", source = "hospital.name")
    @Mapping(target = "hospital.city", source = "hospital.city")
    AppointmentResponse toResponse(Appointment appointment);

    @AfterMapping
    default void finalizeResponse(@MappingTarget AppointmentResponse response, Appointment appointment) {
        if (appointment.getPatient() != null && appointment.getPatient().getUser() != null) {
            response.getPatient().setFullName(appointment.getPatient().getUser().getFirstName() + " " + appointment.getPatient().getUser().getLastName());
        }
        if (appointment.getDoctor() != null && appointment.getDoctor().getUser() != null) {
            response.getDoctor().setFullName(appointment.getDoctor().getUser().getFirstName() + " " + appointment.getDoctor().getUser().getLastName());
        }
    }

    @Mapping(target = "doctorName", ignore = true)
    @Mapping(target = "patientName", ignore = true)
    @Mapping(target = "serviceName", source = "service.name")
    AppointmentSummaryResponse toSummaryResponse(Appointment appointment);

    @AfterMapping
    default void finalizeSummary(@MappingTarget AppointmentSummaryResponse response, Appointment appointment) {
        if (appointment.getPatient() != null && appointment.getPatient().getUser() != null) {
            response.setPatientName(appointment.getPatient().getUser().getFirstName() + " " + appointment.getPatient().getUser().getLastName());
        }
        if (appointment.getDoctor() != null && appointment.getDoctor().getUser() != null) {
            response.setDoctorName(appointment.getDoctor().getUser().getFirstName() + " " + appointment.getDoctor().getUser().getLastName());
        }
    }
}
