package com.orthopedic.api.modules.appointment.dto.response;

import java.util.Map;

public class AppointmentStatsResponse {
    private long totalAppointments;
    private long pendingAppointments;
    private long confirmedAppointments;
    private long completedAppointments;
    private long cancelledAppointments;
    private Map<String, Long> appointmentsByDay;

    public AppointmentStatsResponse() {}

    public AppointmentStatsResponse(long totalAppointments, long pendingAppointments, 
                                  long confirmedAppointments, long completedAppointments, 
                                  long cancelledAppointments, Map<String, Long> appointmentsByDay) {
        this.totalAppointments = totalAppointments;
        this.pendingAppointments = pendingAppointments;
        this.confirmedAppointments = confirmedAppointments;
        this.completedAppointments = completedAppointments;
        this.cancelledAppointments = cancelledAppointments;
        this.appointmentsByDay = appointmentsByDay;
    }

    public long getTotalAppointments() { return totalAppointments; }
    public void setTotalAppointments(long totalAppointments) { this.totalAppointments = totalAppointments; }

    public long getPendingAppointments() { return pendingAppointments; }
    public void setPendingAppointments(long pendingAppointments) { this.pendingAppointments = pendingAppointments; }

    public long getConfirmedAppointments() { return confirmedAppointments; }
    public void setConfirmedAppointments(long confirmedAppointments) { this.confirmedAppointments = confirmedAppointments; }

    public long getCompletedAppointments() { return completedAppointments; }
    public void setCompletedAppointments(long completedAppointments) { this.completedAppointments = completedAppointments; }

    public long getCancelledAppointments() { return cancelledAppointments; }
    public void setCancelledAppointments(long cancelledAppointments) { this.cancelledAppointments = cancelledAppointments; }

    public Map<String, Long> getAppointmentsByDay() { return appointmentsByDay; }
    public void setAppointmentsByDay(Map<String, Long> appointmentsByDay) { this.appointmentsByDay = appointmentsByDay; }
}
