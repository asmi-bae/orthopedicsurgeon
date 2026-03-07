package com.orthopedic.api.integration;

import com.orthopedic.api.BaseIntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
public class RbacIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void visitorCanAccessPublicRoutes() throws Exception {
        mockMvc.perform(post("/api/v1/auth/verify-email")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"test@test.com\",\"code\":\"123456\"}"))
                .andExpect(status().isBadRequest()); 
    }

    @Test
    public void visitorCannotAccessProtectedRoutes() throws Exception {
        mockMvc.perform(get("/api/v1/patient/profile"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "patient_user", authorities = {"ROLE_PATIENT"})
    public void patientCanAccessPatientRoutes() throws Exception {
        mockMvc.perform(get("/api/v1/patient/profile"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "patient_user", authorities = {"ROLE_PATIENT"})
    public void patientCannotAccessAdminRoutes() throws Exception {
        mockMvc.perform(get("/api/v1/admin/users"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "doctor_admin", authorities = {"ROLE_DOCTOR_ADMIN"})
    public void doctorAdminCanAccessAdminRoutes() throws Exception {
        mockMvc.perform(get("/api/v1/admin/users"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "doctor_admin", authorities = {"ROLE_DOCTOR_ADMIN"})
    public void doctorAdminCannotAccessSuperAdminExclusive() throws Exception {
        mockMvc.perform(post("/api/v1/admin/api-controls/maintenance")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"enabled\":true}"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "super_admin", authorities = {"ROLE_SUPER_ADMIN"})
    public void superAdminCanAccessExclusiveRoutes() throws Exception {
        mockMvc.perform(post("/api/v1/admin/api-controls/maintenance")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"enabled\":true}"))
                .andExpect(status().isOk());
    }
}
