package com.orthopedic.api.modules.health.service.impl;

import com.orthopedic.api.modules.appointment.repository.AppointmentRepository;
import com.orthopedic.api.modules.health.dto.request.RecordVitalsRequest;
import com.orthopedic.api.modules.health.dto.response.PatientDashboardResponse;
import com.orthopedic.api.modules.health.dto.response.VitalSignsResponse;
import com.orthopedic.api.modules.health.entity.VitalSigns;
import com.orthopedic.api.modules.health.repository.MedicalDocumentRepository;
import com.orthopedic.api.modules.health.repository.TreatmentHistoryRepository;
import com.orthopedic.api.modules.health.repository.VitalSignsRepository;
import com.orthopedic.api.modules.patient.entity.Patient;
import com.orthopedic.api.modules.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HealthRecordServiceImpl {

    private final VitalSignsRepository vitalSignsRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final MedicalDocumentRepository medicalDocumentRepository;
    private final TreatmentHistoryRepository treatmentHistoryRepository;

    @Transactional
    public VitalSignsResponse recordVitals(UUID patientId, RecordVitalsRequest request, Long recordedById) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        VitalSigns vitals = VitalSigns.builder()
                .patient(patient)
                .appointment(request.appointmentId() != null
                        ? appointmentRepository.getReferenceById(request.appointmentId())
                        : null)
                .bloodPressureSystolic(request.bloodPressureSystolic())
                .bloodPressureDiastolic(request.bloodPressureDiastolic())
                .heartRate(request.heartRate())
                .temperature(request.temperature())
                .weight(request.weight())
                .height(request.height())
                .oxygenSaturation(request.oxygenSaturation())
                .notes(request.notes())
                .build();

        VitalSigns saved = vitalSignsRepository.save(vitals);

        return VitalSignsResponse.builder()
                .id(saved.getId())
                .systolic(saved.getBloodPressureSystolic())
                .diastolic(saved.getBloodPressureDiastolic())
                .heartRate(saved.getHeartRate())
                .temperature(saved.getTemperature())
                .weight(saved.getWeight())
                .height(saved.getHeight())
                .bmi(saved.getBmi())
                .oxygenSaturation(saved.getOxygenSaturation())
                .notes(saved.getNotes())
                .recordedAt(saved.getRecordedAt())
                .build();
    }

    @Transactional(readOnly = true)
    public PatientDashboardResponse getPatientDashboard(UUID patientId) {
        VitalSigns latest = vitalSignsRepository.findFirstByPatientIdOrderByRecordedAtDesc(patientId).orElse(null);
        VitalSignsResponse vitalsResponse = null;
        if (latest != null) {
            vitalsResponse = VitalSignsResponse.builder()
                    .id(latest.getId())
                    .systolic(latest.getBloodPressureSystolic())
                    .diastolic(latest.getBloodPressureDiastolic())
                    .heartRate(latest.getHeartRate())
                    .temperature(latest.getTemperature())
                    .weight(latest.getWeight())
                    .height(latest.getHeight())
                    .bmi(latest.getBmi())
                    .oxygenSaturation(latest.getOxygenSaturation())
                    .notes(latest.getNotes())
                    .recordedAt(latest.getRecordedAt())
                    .build();
        }

        return PatientDashboardResponse.builder()
                .upcomingAppointments(List.of()) // Mock
                .activePrescriptions(0L) // Mock
                .pendingPayments(0L) // Mock
                .unreadNotifications(0L) // Mock
                .lastVisitDate(LocalDate.now().minusDays(10)) // Mock
                .nextAppointment(null) // Mock
                .recentLabReports(List.of()) // Mock
                .latestVitals(vitalsResponse)
                .build();
    }
}
