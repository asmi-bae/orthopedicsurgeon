import { Routes } from '@angular/router';
import { PortalLayoutComponent } from './layout/portal-layout.component';
import { authGuard } from '@repo/auth';

export const PORTAL_ROUTES: Routes = [
  {
    path: '',
    component: PortalLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard', 
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) 
      },
      { 
        path: 'appointments', 
        loadComponent: () => import('./appointments/appointment-list.component').then(m => m.AppointmentListComponent) 
      },
      { 
        path: 'history/prescriptions', 
        loadComponent: () => import('./prescriptions/prescription-list.component').then(m => m.PrescriptionListComponent) 
      },
      { 
        path: 'history/reports', 
        loadComponent: () => import('./reports/report-list.component').then(m => m.ReportListComponent) 
      },
      { 
        path: 'payments', 
        loadComponent: () => import('./payments/payment-list.component').then(m => m.PaymentListComponent) 
      },
      { 
        path: 'settings', 
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) 
      }
    ]
  }
];
