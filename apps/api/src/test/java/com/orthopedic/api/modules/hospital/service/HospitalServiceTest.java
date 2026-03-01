package com.orthopedic.api.modules.hospital.service;

import com.orthopedic.api.modules.hospital.dto.request.CreateHospitalRequest;
import com.orthopedic.api.modules.hospital.dto.request.UpdateHospitalRequest;
import com.orthopedic.api.modules.hospital.dto.response.HospitalResponse;
import com.orthopedic.api.modules.hospital.entity.Hospital;
import com.orthopedic.api.modules.hospital.mapper.HospitalMapper;
import com.orthopedic.api.modules.hospital.repository.HospitalRepository;
import com.orthopedic.api.shared.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class HospitalServiceTest {

    @Mock
    private HospitalRepository hospitalRepository;

    @Mock
    private HospitalMapper hospitalMapper;

    @InjectMocks
    private HospitalServiceImpl hospitalService;

    private Hospital hospital;
    private UUID hospitalId;

    @BeforeEach
    void setUp() {
        hospitalId = UUID.randomUUID();
        hospital = new Hospital();
        hospital.setId(hospitalId);
        hospital.setName("City Hospital");
    }

    @Test
    void createHospital_Success() {
        CreateHospitalRequest request = new CreateHospitalRequest();
        request.setName("City Hospital");
        
        when(hospitalMapper.toEntity(any())).thenReturn(hospital);
        when(hospitalRepository.save(any())).thenReturn(hospital);
        when(hospitalMapper.toResponse(any())).thenReturn(new HospitalResponse());

        HospitalResponse response = hospitalService.createHospital(request);

        assertNotNull(response);
        verify(hospitalRepository, times(1)).save(any());
    }

    @Test
    void getHospitalById_Success() {
        when(hospitalRepository.findById(hospitalId)).thenReturn(Optional.of(hospital));
        when(hospitalMapper.toResponse(hospital)).thenReturn(new HospitalResponse());

        HospitalResponse response = hospitalService.getHospitalById(hospitalId);

        assertNotNull(response);
        verify(hospitalRepository, times(1)).findById(hospitalId);
    }

    @Test
    void getHospitalById_NotFound() {
        when(hospitalRepository.findById(hospitalId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> hospitalService.getHospitalById(hospitalId));
    }

    @Test
    void updateHospital_Success() {
        UpdateHospitalRequest request = new UpdateHospitalRequest();
        request.setName("Updated Hospital");

        when(hospitalRepository.findById(hospitalId)).thenReturn(Optional.of(hospital));
        when(hospitalRepository.save(any())).thenReturn(hospital);
        when(hospitalMapper.toResponse(any())).thenReturn(new HospitalResponse());

        HospitalResponse response = hospitalService.updateHospital(hospitalId, request);

        assertNotNull(response);
        verify(hospitalRepository, times(1)).save(any());
    }
}
