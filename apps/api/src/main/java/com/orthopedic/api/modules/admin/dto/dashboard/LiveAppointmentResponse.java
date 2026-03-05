package com.orthopedic.api.modules.admin.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LiveAppointmentResponse {
    private UUID id;
    private String patientName;
    private String doctorName;
    private String time;
    private String status;
}
