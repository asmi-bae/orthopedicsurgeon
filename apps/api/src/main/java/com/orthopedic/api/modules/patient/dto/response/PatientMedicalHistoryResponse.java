package com.orthopedic.api.modules.patient.dto.response;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public class PatientMedicalHistoryResponse {
    private PatientResponse patient;
    private List<AppointmentSummary> appointments;
    private List<PrescriptionSummary> prescriptions;
    private List<LabReportSummary> labReports;

    public PatientResponse getPatient() {
        return patient;
    }

    public void setPatient(PatientResponse patient) {
        this.patient = patient;
    }

    public List<AppointmentSummary> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<AppointmentSummary> appointments) {
        this.appointments = appointments;
    }

    public List<PrescriptionSummary> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(List<PrescriptionSummary> prescriptions) {
        this.prescriptions = prescriptions;
    }

    public List<LabReportSummary> getLabReports() {
        return labReports;
    }

    public void setLabReports(List<LabReportSummary> labReports) {
        this.labReports = labReports;
    }

    public static class AppointmentSummary {
        private UUID id;
        private LocalDate date;
        private String doctorName;
        private String reason;
        private String status;

        public UUID getId() {
            return id;
        }

        public void setId(UUID id) {
            this.id = id;
        }

        public LocalDate getDate() {
            return date;
        }

        public void setDate(LocalDate date) {
            this.date = date;
        }

        public String getDoctorName() {
            return doctorName;
        }

        public void setDoctorName(String doctorName) {
            this.doctorName = doctorName;
        }

        public String getReason() {
            return reason;
        }

        public void setReason(String reason) {
            this.reason = reason;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }

    public static class PrescriptionSummary {
        private UUID id;
        private LocalDate date;
        private String doctorName;
        private String diagnosis;

        public UUID getId() {
            return id;
        }

        public void setId(UUID id) {
            this.id = id;
        }

        public LocalDate getDate() {
            return date;
        }

        public void setDate(LocalDate date) {
            this.date = date;
        }

        public String getDoctorName() {
            return doctorName;
        }

        public void setDoctorName(String doctorName) {
            this.doctorName = doctorName;
        }

        public String getDiagnosis() {
            return diagnosis;
        }

        public void setDiagnosis(String diagnosis) {
            this.diagnosis = diagnosis;
        }
    }

    public static class LabReportSummary {
        private UUID id;
        private LocalDate date;
        private String testName;
        private String result;

        public UUID getId() {
            return id;
        }

        public void setId(UUID id) {
            this.id = id;
        }

        public LocalDate getDate() {
            return date;
        }

        public void setDate(LocalDate date) {
            this.date = date;
        }

        public String getTestName() {
            return testName;
        }

        public void setTestName(String testName) {
            this.testName = testName;
        }

        public String getResult() {
            return result;
        }

        public void setResult(String result) {
            this.result = result;
        }
    }
}
