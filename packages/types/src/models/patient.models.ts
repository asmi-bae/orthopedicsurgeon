import { User, Gender, BloodGroup } from './user.models';

export enum PatientStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export interface PatientAllergy {
  allergyName: string;
  severity: string;
}

export interface PatientMedicalCondition {
  conditionName: string;
  diagnosedDate: string;
}

export interface Patient {
  id: string;
  user: User;
  dateOfBirth: string;
  gender: Gender;
  bloodGroup: BloodGroup;
  address: string;
  city: string;
  medicalHistoryNotes?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  status: PatientStatus;
  allergies: PatientAllergy[];
  conditions: PatientMedicalCondition[];
}

export interface PatientSummary {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  status: PatientStatus;
}

export interface PatientMedicalHistory {
  allergies: PatientAllergy[];
  conditions: PatientMedicalCondition[];
  pastAppointmentsCount: number;
  activePrescriptionsCount: number;
}
