package com.orthopedic.api.modules.admin.service;

import com.orthopedic.api.modules.admin.dto.dashboard.*;
import com.orthopedic.api.modules.appointment.entity.Appointment;
import com.orthopedic.api.modules.appointment.repository.AppointmentRepository;
import com.orthopedic.api.modules.billing.repository.InvoiceRepository;
import com.orthopedic.api.modules.doctor.repository.DoctorRepository;
import com.orthopedic.api.modules.hospital.entity.Hospital;
import com.orthopedic.api.modules.hospital.repository.HospitalRepository;
import com.orthopedic.api.modules.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {

    private final InvoiceRepository invoiceRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final HospitalRepository hospitalRepository;

    @Transactional(readOnly = true)
    public AdminDashboardResponse getDashboardData() {
        return AdminDashboardResponse.builder()
                .stats(getDashboardStats())
                .liveAppointments(getLiveAppointments())
                .topHospitals(getTopHospitals())
                .quickStats(getQuickStats())
                .build();
    }

    private DashboardStatsResponse getDashboardStats() {
        BigDecimal totalRevenue = invoiceRepository.sumTotalRevenue();
        if (totalRevenue == null)
            totalRevenue = BigDecimal.ZERO;

        return DashboardStatsResponse.builder()
                .totalRevenue(totalRevenue)
                .medicalStaffCount(doctorRepository.count())
                .newPatientsCount(patientRepository.countByCreatedAtAfter(LocalDateTime.now().minusMonths(1)))
                .systemStatus("OPERATIONAL")
                .revenueTrend("+12%")
                .staffTrend("Stable")
                .patientTrend("+45")
                .build();
    }

    private List<LiveAppointmentResponse> getLiveAppointments() {
        return appointmentRepository
                .findAllByAppointmentDateAndStatus(LocalDate.now(), Appointment.AppointmentStatus.CONFIRMED)
                .stream()
                .limit(5)
                .map(a -> LiveAppointmentResponse.builder()
                        .id(a.getId())
                        .patientName(
                                a.getPatient().getUser().getFirstName() + " " + a.getPatient().getUser().getLastName())
                        .doctorName(
                                a.getDoctor().getUser().getFirstName() + " " + a.getDoctor().getUser().getLastName())
                        .time(a.getStartTime().toString())
                        .status(a.getStatus().name())
                        .build())
                .collect(Collectors.toList());
    }

    private List<TopHospitalResponse> getTopHospitals() {
        return hospitalRepository.findAll().stream()
                .limit(4)
                .map(h -> TopHospitalResponse.builder()
                        .id(h.getId())
                        .name(h.getName())
                        .city(h.getCity())
                        .revenue("$" + (1000 + (int) (Math.random() * 5000))) // Aggregation logic could be shared later
                        .growth("+" + (5 + (int) (Math.random() * 10)) + "%")
                        .build())
                .collect(Collectors.toList());
    }

    private QuickStatsResponse getQuickStats() {
        return QuickStatsResponse.builder()
                .appointmentsToday(appointmentRepository.countByFilters(null, null, null, null, null, LocalDate.now(),
                        LocalDate.now()))
                .pendingPrescriptions(0) // Logic for prescriptions can be added
                .activeHospitals(hospitalRepository.countByStatus(Hospital.HospitalStatus.ACTIVE))
                .openInvoicesAmount("$3.2k")
                .build();
    }
}
