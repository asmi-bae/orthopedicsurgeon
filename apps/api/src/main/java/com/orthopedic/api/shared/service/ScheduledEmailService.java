package com.orthopedic.api.shared.service;

import com.orthopedic.api.modules.appointment.entity.Appointment;
import com.orthopedic.api.modules.appointment.repository.AppointmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class ScheduledEmailService {
    private static final Logger log = LoggerFactory.getLogger(ScheduledEmailService.class);

    private final AppointmentRepository appointmentRepository;
    private final EmailService emailService;

    public ScheduledEmailService(AppointmentRepository appointmentRepository, EmailService emailService) {
        this.appointmentRepository = appointmentRepository;
        this.emailService = emailService;
    }

    // Run every day at 8:00 AM
    @Scheduled(cron = "0 0 8 * * *")
    public void sendAppointmentReminders() {
        log.info("Starting scheduled appointment reminders...");

        LocalDate tomorrow = LocalDate.now().plusDays(1);

        // Fetch appointments for tomorrow
        List<Appointment> appointments = appointmentRepository.findAllByAppointmentDateAndStatus(
                tomorrow,
                Appointment.AppointmentStatus.CONFIRMED);

        for (Appointment appointment : appointments) {
            try {
                Map<String, Object> vars = new HashMap<>();
                vars.put("patientName", appointment.getPatient().getUser().getFirstName());
                vars.put("doctorName", appointment.getDoctor().getUser().getFirstName());
                vars.put("date", appointment.getAppointmentDate().toString());
                vars.put("time", appointment.getStartTime().toString());
                vars.put("hospitalName", appointment.getHospital().getName());

                emailService.sendHtmlEmail(
                        appointment.getPatient().getUser().getEmail(),
                        "Appointment Reminder - Tomorrow",
                        "appointment-reminder.html",
                        vars);
            } catch (Exception e) {
                log.error("Failed to send reminder for appointment ID: {}", appointment.getId(), e);
            }
        }
    }
}
