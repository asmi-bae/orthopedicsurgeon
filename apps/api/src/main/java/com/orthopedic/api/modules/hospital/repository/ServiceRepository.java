package com.orthopedic.api.modules.hospital.repository;

import com.orthopedic.api.modules.hospital.entity.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, UUID> {
    List<ServiceEntity> findAllByHospitalId(UUID hospitalId);
}
