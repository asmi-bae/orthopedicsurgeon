package com.orthopedic.api.modules.hospital.repository;

import com.orthopedic.api.modules.hospital.entity.Hospital;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, UUID> {

    Page<Hospital> findAllByStatus(Hospital.HospitalStatus status, Pageable pageable);

    Page<Hospital> findAllByCity(String city, Pageable pageable);

    boolean existsByLicenseNumber(String licenseNumber);

    long countByStatus(Hospital.HospitalStatus status);

    @Query("SELECT COUNT(d) FROM Doctor d WHERE d.hospital.id = :id")
    int countDoctors(@org.springframework.data.repository.query.Param("id") java.util.UUID id);

    @Query("SELECT COUNT(s) FROM ServiceEntity s WHERE s.hospital.id = :id")
    int countServices(@org.springframework.data.repository.query.Param("id") java.util.UUID id);

    @Query("SELECT d.hospital.id, COUNT(d) FROM Doctor d WHERE d.hospital.id IN :ids GROUP BY d.hospital.id")
    java.util.List<Object[]> countDoctorsByHospitalIds(@org.springframework.data.repository.query.Param("ids") java.util.Collection<java.util.UUID> ids);

    @Query("SELECT s.hospital.id, COUNT(s) FROM ServiceEntity s WHERE s.hospital.id IN :ids GROUP BY s.hospital.id")
    java.util.List<Object[]> countServicesByHospitalIds(@org.springframework.data.repository.query.Param("ids") java.util.Collection<java.util.UUID> ids);
}
