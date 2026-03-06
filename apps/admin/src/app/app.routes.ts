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
        path: 'content/hero',
        loadComponent: () => import('@features/content/hero/hero-management.component').then(m => m.HeroManagementComponent),
        data: { breadcrumb: 'Hero Section' }
      },
      {
        path: 'content/faq',
        loadComponent: () => import('@features/content/faq/faq-management.component').then(m => m.FaqManagementComponent),
        data: { breadcrumb: 'FAQ' }
      },
      {
        path: 'content/partners',
        loadComponent: () => import('@features/content/partners/partner-management.component').then(m => m.PartnerManagementComponent),
        data: { breadcrumb: 'Partners' }
      },
      {
        path: 'blog',
        loadComponent: () => import('@features/blog/blog-management.component').then(m => m.BlogManagementComponent),
        data: { breadcrumb: 'Blog' }
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
