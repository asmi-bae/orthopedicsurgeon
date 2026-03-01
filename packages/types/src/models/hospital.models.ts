export enum HospitalStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum ServiceCategory {
  CONSULTATION = 'CONSULTATION',
  SURGERY = 'SURGERY',
  DIAGNOSTICS = 'DIAGNOSTICS',
  THERAPY = 'THERAPY'
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  category: ServiceCategory;
  status: HospitalStatus;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  website?: string;
  licenseNumber: string;
  status: HospitalStatus;
  services: Service[];
  createdAt: string;
}

export interface HospitalSummary {
  id: string;
  name: string;
  city: string;
  status: HospitalStatus;
}
