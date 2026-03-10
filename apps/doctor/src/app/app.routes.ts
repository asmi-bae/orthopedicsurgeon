import { Routes } from '@angular/router';
import { DoctorLayoutComponent } from '@core/layouts/layout.component';
import { authGuard, guestGuard } from '@repo/auth';

export const routes: Routes = [
  // Redirects for old auth paths
  { path: 'auth/login', redirectTo: 'login', pathMatch: 'full' },
  { path: 'auth/forgot-password', redirectTo: 'forgot-password', pathMatch: 'full' },
  { path: 'auth/reset-password', redirectTo: 'reset-password', pathMatch: 'full' },
  { path: 'auth/two-factor', redirectTo: 'two-factor', pathMatch: 'full' },
  { path: 'auth/totp-setup', redirectTo: 'totp-setup', pathMatch: 'full' },
  { path: 'auth', redirectTo: 'login', pathMatch: 'full' },

  {
    path: '',
    component: DoctorLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard', 
        loadComponent: () => import('@features/dashboard/admin.component').then(m => m.AdminComponent),
        data: { breadcrumb: 'Dashboard' }
      },
      // Appointments
      { 
        path: 'appointments/all', 
        loadComponent: () => import('@features/appointments/appointment-management.component').then(m => m.AppointmentManagementComponent),
        data: { breadcrumb: 'All Appointments' }
      },
      { 
        path: 'appointments/calendar', 
        loadComponent: () => import('@features/appointments/appointment-management.component').then(m => m.AppointmentManagementComponent),
        data: { breadcrumb: 'Calendar View' }
      },
      { 
        path: 'appointments/add', 
        loadComponent: () => import('@features/appointments/appointment-management.component').then(m => m.AppointmentManagementComponent),
        data: { breadcrumb: 'Add Appointment' }
      },
      { 
        path: 'appointments/slots', 
        loadComponent: () => import('@features/shared/feature-placeholder.component').then(m => m.FeaturePlaceholderComponent),
        data: { breadcrumb: 'Time Slots' }
      },
      { 
        path: 'appointments/blocked', 
        loadComponent: () => import('@features/shared/feature-placeholder.component').then(m => m.FeaturePlaceholderComponent),
        data: { breadcrumb: 'Blocked Dates' }
      },
      // Patients
      { 
        path: 'patients/all', 
        loadComponent: () => import('@features/patients/patient-management.component').then(m => m.PatientManagementComponent),
        data: { breadcrumb: 'All Patients' }
      },
      { 
        path: 'patients/add', 
        loadComponent: () => import('@features/patients/patient-management.component').then(m => m.PatientManagementComponent),
        data: { breadcrumb: 'Add Patient' }
      },
      { 
        path: 'patients/history', 
        loadComponent: () => import('@features/patients/patient-management.component').then(m => m.PatientManagementComponent),
        data: { breadcrumb: 'Patient History' }
      },
      // Website Content
      { 
        path: 'website/home', 
        loadComponent: () => import('@features/shared/feature-placeholder.component').then(m => m.FeaturePlaceholderComponent),
        data: { breadcrumb: 'Home Page' }
      },
      { 
        path: 'website/about', 
        loadComponent: () => import('@features/shared/feature-placeholder.component').then(m => m.FeaturePlaceholderComponent),
        data: { breadcrumb: 'About Page' }
      },
      { 
        path: 'website/services', 
        loadComponent: () => import('@features/shared/feature-placeholder.component').then(m => m.FeaturePlaceholderComponent),
        data: { breadcrumb: 'Services' }
      },
      { 
        path: 'website/cases', 
        loadComponent: () => import('@features/shared/feature-placeholder.component').then(m => m.FeaturePlaceholderComponent),
        data: { breadcrumb: 'Successful Cases' }
      },
      { 
        path: 'website/gallery', 
        loadComponent: () => import('@features/shared/feature-placeholder.component').then(m => m.FeaturePlaceholderComponent),
        data: { breadcrumb: 'Gallery' }
      },
      { 
        path: 'website/faq', 
        loadComponent: () => import('@features/shared/feature-placeholder.component').then(m => m.FeaturePlaceholderComponent),
        data: { breadcrumb: 'FAQ Page' }
      },
      { 
        path: 'website/legal', 
        loadComponent: () => import('@features/shared/feature-placeholder.component').then(m => m.FeaturePlaceholderComponent),
        data: { breadcrumb: 'Legal Pages' }
      },
      // Blog
      { 
        path: 'blog/posts', 
        loadComponent: () => import('@features/shared/feature-placeholder.component').then(m => m.FeaturePlaceholderComponent),
        data: { breadcrumb: 'All Posts' }
      },
      { 
        path: 'blog/add', 
        loadComponent: () => import('@features/shared/feature-placeholder.component').then(m => m.FeaturePlaceholderComponent),
        data: { breadcrumb: 'Add New Post' }
      },
      { 
        path: 'blog/categories', 
        loadComponent: () => import('@features/shared/feature-placeholder.component').then(m => m.FeaturePlaceholderComponent),
        data: { breadcrumb: 'Categories' }
      },
      // Media
      { 
        path: 'media', 
        loadComponent: () => import('@features/shared/feature-placeholder.component').then(m => m.FeaturePlaceholderComponent),
        data: { breadcrumb: 'Media Library' }
      },
      // Messages
      { 
        path: 'messages/contact', 
        loadComponent: () => import('@features/shared/feature-placeholder.component').then(m => m.FeaturePlaceholderComponent),
        data: { breadcrumb: 'Contact Messages' }
      },
      { 
        path: 'messages/submissions', 
        loadComponent: () => import('@features/shared/feature-placeholder.component').then(m => m.FeaturePlaceholderComponent),
        data: { breadcrumb: 'Form Submissions' }
      },
      // Reports
      { 
        path: 'reports/appointments', 
        loadComponent: () => import('@features/records/report-management.component').then(m => m.ReportManagementComponent),
        data: { breadcrumb: 'Appointment Reports' }
      },
      { 
        path: 'reports/patients', 
        loadComponent: () => import('@features/records/report-management.component').then(m => m.ReportManagementComponent),
        data: { breadcrumb: 'Patient Reports' }
      },
      { 
        path: 'reports/blog', 
        loadComponent: () => import('@features/records/report-management.component').then(m => m.ReportManagementComponent),
        data: { breadcrumb: 'Blog View Reports' }
      },
      // Settings
      { 
        path: 'settings/general', 
        loadComponent: () => import('@features/system/settings/system-settings.component').then(m => m.SystemSettingsComponent),
        data: { breadcrumb: 'General Settings' }
      },
      { 
        path: 'settings/contact', 
        loadComponent: () => import('@features/system/settings/system-settings.component').then(m => m.SystemSettingsComponent),
        data: { breadcrumb: 'Contact Info' }
      },
      { 
        path: 'settings/language', 
        loadComponent: () => import('@features/system/settings/language-management.component').then(m => m.LanguageManagementComponent),
        data: { breadcrumb: 'Language Management' }
      },
      { 
        path: 'settings/theme', 
        loadComponent: () => import('@features/system/settings/system-settings.component').then(m => m.SystemSettingsComponent),
        data: { breadcrumb: 'Theme & Colors' }
      },
      { 
        path: 'settings/notifications', 
        loadComponent: () => import('@features/system/settings/system-settings.component').then(m => m.SystemSettingsComponent),
        data: { breadcrumb: 'Notifications' }
      },
      { 
        path: 'settings/users', 
        loadComponent: () => import('@features/users/user-management.component').then(m => m.UserManagementComponent),
        data: { breadcrumb: 'Users & Roles' }
      },
      { 
        path: 'settings/backup', 
        loadComponent: () => import('@features/shared/feature-placeholder.component').then(m => m.FeaturePlaceholderComponent),
        data: { breadcrumb: 'Backup & Restore' }
      }
    ]
  },
  {
    path: '',
    loadComponent: () => import('@features/auth/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      {
        path: 'login',
        canActivate: [guestGuard],
        loadComponent: () => import('@features/auth/login/login.component').then(m => m.DoctorLoginComponent)
      },
      {
        path: 'forgot-password',
        canActivate: [guestGuard],
        loadComponent: () => import('@features/auth/forgot-password/forgot-password.component').then(m => m.DoctorForgotPasswordComponent)
      },
      {
        path: 'reset-password',
        canActivate: [guestGuard],
        loadComponent: () => import('@features/auth/reset-password/reset-password.component').then(m => m.DoctorResetPasswordComponent)
      },
      {
        path: 'two-factor',
        loadComponent: () => import('@features/auth/two-factor/two-factor.component').then(m => m.DoctorTwoFactorComponent)
      },
      {
        path: 'totp-setup',
        loadComponent: () => import('@features/auth/totp-setup/totp-setup.component').then(m => m.DoctorTotpSetupComponent)
      }
    ]
  }
];
