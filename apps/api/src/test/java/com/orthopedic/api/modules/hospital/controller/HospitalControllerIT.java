package com.orthopedic.api.modules.hospital.controller;

import com.orthopedic.api.BaseIntegrationTest;
import com.orthopedic.api.modules.hospital.dto.request.CreateHospitalRequest;
import com.orthopedic.api.modules.hospital.repository.HospitalRepository;
import com.orthopedic.api.modules.doctor.repository.DoctorRepository;
import com.orthopedic.api.modules.appointment.repository.AppointmentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

class HospitalControllerIT extends BaseIntegrationTest {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private HospitalRepository hospitalRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private ObjectMapper objectMapper;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
        appointmentRepository.deleteAll();
        doctorRepository.deleteAll();
        hospitalRepository.deleteAll();
    }

    @Test
    @WithMockUser(roles = "SUPER_ADMIN")
    void createHospital_Success() throws Exception {
        CreateHospitalRequest request = new CreateHospitalRequest();
        request.setName("General Hospital");
        request.setAddress("123 Main St");
        request.setCity("Test City");
        request.setPhone("1234567890");
        request.setLicenseNumber("LIC-" + System.currentTimeMillis());

        mockMvc.perform(post("/api/v1/hospitals")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.name").value("General Hospital"));
    }

    @Test
    void getHospitals_Unauthorized() throws Exception {
        mockMvc.perform(get("/api/v1/hospitals"))
                .andExpect(status().isUnauthorized());
    }
}
