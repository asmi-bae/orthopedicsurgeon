export enum ReportType {
  BLOOD_TEST = 'BLOOD_TEST',
  X_RAY = 'X_RAY',
  MRI = 'MRI',
  CT_SCAN = 'CT_SCAN',
  URINE_TEST = 'URINE_TEST'
}

export enum LabReportStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface LabReport {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId?: string;
  reportName: string;
  reportType: ReportType;
  reportUrl: string;
  resultNotes?: string;
  status: LabReportStatus;
  createdAt: string;
}

export interface LabReportSummary {
  id: string;
  reportName: string;
  patientName: string;
  doctorName: string;
  status: LabReportStatus;
  createdAt: string;
}
