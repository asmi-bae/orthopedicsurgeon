export enum PrescriptionStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  DISPENSED = 'DISPENSED'
}

export interface PrescriptionMedicine {
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  diagnosis: string;
  notes?: string;
  medicines: PrescriptionMedicine[];
  followUpDate?: string;
  status: PrescriptionStatus;
  createdAt: string;
}

export interface PrescriptionSummary {
  id: string;
  patientName: string;
  doctorName: string;
  diagnosis: string;
  createdAt: string;
  status: PrescriptionStatus;
}
