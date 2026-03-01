package com.orthopedic.api.modules.hospital.mapper;

import com.orthopedic.api.modules.hospital.dto.request.CreateHospitalRequest;
import com.orthopedic.api.modules.hospital.dto.request.CreateServiceRequest;
import com.orthopedic.api.modules.hospital.dto.request.UpdateHospitalRequest;
import com.orthopedic.api.modules.hospital.dto.request.UpdateServiceRequest;
import com.orthopedic.api.modules.hospital.dto.response.HospitalResponse;
import com.orthopedic.api.modules.hospital.dto.response.HospitalSummaryResponse;
import com.orthopedic.api.modules.hospital.dto.response.ServiceResponse;
import com.orthopedic.api.modules.hospital.entity.Hospital;
import com.orthopedic.api.modules.hospital.entity.ServiceEntity;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface HospitalMapper {

    Hospital toEntity(CreateHospitalRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(UpdateHospitalRequest request, @MappingTarget Hospital hospital);

    @Mapping(target = "doctorCount", ignore = true)
    @Mapping(target = "serviceCount", ignore = true)
    HospitalResponse toResponse(Hospital hospital);

    HospitalSummaryResponse toSummaryResponse(Hospital hospital);

    @Mapping(target = "hospitalId", source = "hospital.id")
    @Mapping(target = "hospitalName", source = "hospital.name")
    ServiceResponse toServiceResponse(ServiceEntity service);

    ServiceEntity toServiceEntity(CreateServiceRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateServiceEntity(UpdateServiceRequest request, @MappingTarget ServiceEntity service);
}
