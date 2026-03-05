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
public class TopHospitalResponse {
    private UUID id;
    private String name;
    private String city;
    private String revenue;
    private String growth;
}
