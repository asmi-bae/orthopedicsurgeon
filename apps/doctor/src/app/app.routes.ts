import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '@core/layouts/layout.component';
import { authGuard, guestGuard } from '@repo/auth';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard', 
        loadComponent: () => import('@features/dashboard/admin.component').then(m => m.AdminComponent),
        data: { breadcrumb: 'Dashboard' }
      },
      { 
        path: 'users', 
        loadComponent: () => import('@features/users/user-management.component').then(m => m.UserManagementComponent),
        data: { breadcrumb: 'Users' }
      },
      { 
        path: 'doctors', 
        loadComponent: () => import('@features/doctors/doctor-management.component').then(m => m.DoctorManagementComponent),
        data: { breadcrumb: 'Doctors' }
      },
      { 
        path: 'patients', 
        loadComponent: () => import('@features/patients/patient-management.component').then(m => m.PatientManagementComponent),
        data: { breadcrumb: 'Patients' }
      },
      {
        path: 'patients/:id/health',
        loadComponent: () => import('@features/health/patient-health-detail/patient-health-detail.component').then(m => m.PatientHealthDetailComponent),
        data: { breadcrumb: 'Health Detail' }
      },
      { 
        path: 'appointments', 
        loadComponent: () => import('@features/appointments/appointment-management.component').then(m => m.AppointmentManagementComponent),
        data: { breadcrumb: 'Appointments' }
      },
      { 
        path: 'records/prescriptions', 
        loadComponent: () => import('@features/records/prescription-management.component').then(m => m.PrescriptionManagementComponent),
        data: { breadcrumb: 'Prescriptions' }
      },
      { 
        path: 'records/reports', 
        loadComponent: () => import('@features/records/report-management.component').then(m => m.ReportManagementComponent),
        data: { breadcrumb: 'Reports' }
      },
      { 
        path: 'finance', 
        loadComponent: () => import('@features/finance/finance-management.component').then(m => m.FinanceManagementComponent),
        data: { breadcrumb: 'Finance' }
      },
      { 
        path: 'hospitals', 
        loadComponent: () => import('@features/hospitals/hospital-management.component').then(m => m.HospitalManagementComponent),
        data: { breadcrumb: 'Hospitals' }
      },
      {
        path: 'account',
        loadComponent: () => import('@features/account/account.component').then(m => m.AccountComponent),
        data: { breadcrumb: 'Account Settings' }
      },
      {
        path: 'system/api-control',
        loadComponent: () => import('@features/system/api-control/api-control.component').then(m => m.ApiControlComponent),
        data: { breadcrumb: 'API Control' }
      },
      {
        path: 'system/audit-logs',
        loadComponent: () => import('@features/system/audit-logs/audit-logs.component').then(m => m.AuditLogsComponent),
        data: { breadcrumb: 'Audit Logs' }
      },
      {
        path: 'system/health',
        loadComponent: () => import('@features/system/health/system-health.component').then(m => m.SystemHealthComponent),
        data: { breadcrumb: 'System Health' }
      },
      {
        path: 'system/settings',
        loadComponent: () => import('@features/system/settings/system-settings.component').then(m => m.SystemSettingsComponent),
        data: { breadcrumb: 'System Settings' }
      }
    ]
  },
  {
    path: 'auth/login',
    canActivate: [guestGuard],
    loadComponent: () => import('@features/auth/admin-login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: 'auth/forgot-password',
    canActivate: [guestGuard],
    loadComponent: () => import('@features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'auth/reset-password',
    canActivate: [guestGuard],
    loadComponent: () => import('@features/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  }
];
