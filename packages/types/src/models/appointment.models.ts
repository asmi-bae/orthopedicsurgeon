import { DoctorSummary } from './doctor.models';
import { PatientSummary } from './patient.models';

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW',
  IN_PROGRESS = 'IN_PROGRESS'
}

export enum AppointmentType {
  IN_PERSON = 'IN_PERSON',
  VIDEO_CONSULTATION = 'VIDEO_CONSULTATION'
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  hospitalId: string;
  serviceId: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  type: AppointmentType;
  chiefComplaint: string;
  notes?: string;
  cancellationReason?: string;
  consultationFee: number;
  createdAt: string;
}

export interface AppointmentSummary {
  id: string;
  doctorName: string;
  patientName: string;
  appointmentDate: string;
  startTime: string;
  status: AppointmentStatus;
  type: AppointmentType;
  serviceName: string;
}

export interface CalendarAppointment {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  status: AppointmentStatus;
}

export interface AppointmentStats {
  total: number;
  completed: number;
  cancelled: number;
  pending: number;
}
