import { Component, inject, signal, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { 
  ZrdSidebarComponent, 
  ZrdNavItem 
} from '@repo/ui';
import { AdminHeaderComponent } from '@core/components/admin-header/admin-header.component';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    ZrdSidebarComponent,
    AdminHeaderComponent
  ],
  template: `
    <div class="flex h-screen overflow-hidden bg-google-gray-50 dark:bg-google-gray-900">
      
      <!-- Spartan Sidebar -->
      <zrd-sidebar 
        [items]="navItems" 
        [collapsed]="collapsed()"
        [isMobile]="isMobile()"
        (onToggle)="toggleCollapsed()"
      ></zrd-sidebar>

      <div class="flex-1 flex flex-col min-w-0">
        <!-- Spartan Header -->
        <app-admin-header (toggleSidebar)="toggleCollapsed()"></app-admin-header>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto custom-scrollbar">
          <div class="p-6 lg:p-8 max-w-[1600px] mx-auto">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100vh; }
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: theme('colors.google-gray.300'); border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  `]
})
export class AdminLayoutComponent implements OnInit {
  isMobile = signal(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
  collapsed = signal(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

  navItems: ZrdNavItem[] = [
    { label: 'Dashboard', icon: 'mat-icon:home', route: '/dashboard' },
    { label: 'Appointments', icon: 'mat-icon:calendar_today', route: '/appointments' },
    { label: 'Doctors', icon: 'mat-icon:medical_services', route: '/doctors' },
    { label: 'Patients', icon: 'mat-icon:people', route: '/patients' },
    { label: 'Prescriptions', icon: 'mat-icon:description', route: '/records/prescriptions' },
    { label: 'Reports', icon: 'mat-icon:assessment', route: '/records/reports' },
    { label: 'Hospitals', icon: 'mat-icon:local_hospital', route: '/hospitals' },
    { label: 'Finance', icon: 'mat-icon:payments', route: '/finance' },
    { label: 'Content Management', icon: 'mat-icon:article', route: '/content/hero' },
    { label: 'Blog', icon: 'mat-icon:rss_feed', route: '/blog' },
    { label: 'Users', icon: 'mat-icon:admin_panel_settings', route: '/users' }
  ];

  ngOnInit() { 
    // Initial check already done in signal initialization
  }

  @HostListener('window:resize')
  checkBreakpoint() {
    if (typeof window === 'undefined') return;
    const mobile = window.innerWidth < 1024;
    this.isMobile.set(mobile);
    if (mobile) this.collapsed.set(true);
  }

  toggleCollapsed() {
    this.collapsed.update(v => !v);
  }
}
