import { HospitalSummary } from './hospital.models';
import { User } from './user.models';

export enum DoctorStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface DoctorAvailability {
  id: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  maxAppointments: number;
}

export interface Doctor {
  id: string;
  user: User;
  specialization: string;
  licenseNumber: string;
  experienceYears: number;
  consultationFee: number;
  bio?: string;
  rating: number;
  availableForOnline: boolean;
  status: DoctorStatus;
  hospital: HospitalSummary;
  availabilities: DoctorAvailability[];
}

export interface DoctorSummary {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  hospitalName: string;
  consultationFee: number;
  rating: number;
  status: DoctorStatus;
}
