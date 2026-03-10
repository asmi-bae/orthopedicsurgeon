import { ZrdNavItem, ZrdSidebarComponent } from '@ui/components';
import { Component, inject, signal, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DoctorHeaderComponent } from '@core/components/doctor-header/doctor-header.component';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-doctor-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    ZrdSidebarComponent,
    DoctorHeaderComponent
  ],
  template: `
    <div class="flex h-screen overflow-hidden bg-google-gray-50 dark:bg-google-gray-900">
      
      <!-- Doctor Sidebar -->
      <zrd-sidebar 
        [items]="navItems" 
        [collapsed]="collapsed()"
        [isMobile]="isMobile()"
        (onToggle)="toggleCollapsed()"
      ></zrd-sidebar>

      <div class="flex-1 flex flex-col min-w-0">
        <!-- Doctor Header -->
        <app-doctor-header (toggleSidebar)="toggleCollapsed()"></app-doctor-header>

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
export class DoctorLayoutComponent implements OnInit {
  isMobile = signal(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
  collapsed = signal(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

  navItems: ZrdNavItem[] = [
    { label: 'Dr. Rahman Portal', isHeader: true },
    { label: 'Dashboard', icon: 'mat-icon:dashboard', route: '/dashboard' },
    
    { label: 'Appointments', icon: 'mat-icon:calendar_today', children: [
        { label: 'All Appointments', route: '/appointments/all', icon: 'mat-icon:list' },
        { label: 'Calendar View', route: '/appointments/calendar', icon: 'mat-icon:calendar_month' },
        { label: 'Add Appointment', route: '/appointments/add', icon: 'mat-icon:add_circle_outline' },
        { label: 'Time Slots', route: '/appointments/slots', icon: 'mat-icon:schedule' },
        { label: 'Blocked Dates', route: '/appointments/blocked', icon: 'mat-icon:block' }
    ]},

    { label: 'Patients', icon: 'mat-icon:people', children: [
        { label: 'All Patients', route: '/patients/all', icon: 'mat-icon:groups' },
        { label: 'Add Patient', route: '/patients/add', icon: 'mat-icon:person_add' },
        { label: 'Patient History', route: '/patients/history', icon: 'mat-icon:history' }
    ]},

    { label: 'Website Content', icon: 'mat-icon:language', children: [
        { label: 'Home Page', route: '/website/home', icon: 'mat-icon:home' },
        { label: 'About Page', route: '/website/about', icon: 'mat-icon:info' },
        { label: 'Services', route: '/website/services', icon: 'mat-icon:medical_services' },
        { label: 'Successful Cases', route: '/website/cases', icon: 'mat-icon:assignment_turned_in' },
        { label: 'Gallery', route: '/website/gallery', icon: 'mat-icon:photo_library' },
        { label: 'FAQ Page', route: '/website/faq', icon: 'mat-icon:quiz' },
        { label: 'Legal Pages', route: '/website/legal', icon: 'mat-icon:gavel' }
    ]},

    { label: 'Blog', icon: 'mat-icon:edit_note', children: [
        { label: 'All Posts', route: '/blog/posts', icon: 'mat-icon:article' },
        { label: 'Add New Post', route: '/blog/add', icon: 'mat-icon:add_box' },
        { label: 'Categories', route: '/blog/categories', icon: 'mat-icon:category' }
    ]},

    { label: 'Media Library', icon: 'mat-icon:folder_open', route: '/media' },

    { label: 'Messages', icon: 'mat-icon:chat', children: [
        { label: 'Contact Messages', route: '/messages/contact', icon: 'mat-icon:mail' },
        { label: 'Form Submissions', route: '/messages/submissions', icon: 'mat-icon:assignment' }
    ]},

    { label: 'Reports', icon: 'mat-icon:bar_chart', children: [
        { label: 'Appointments', route: '/reports/appointments', icon: 'mat-icon:event' },
        { label: 'Patients', route: '/reports/patients', icon: 'mat-icon:person' },
        { label: 'Blog Views', route: '/reports/blog', icon: 'mat-icon:visibility' }
    ]},

    { label: 'Settings', icon: 'mat-icon:settings', children: [
        { label: 'General', route: '/settings/general', icon: 'mat-icon:tune' },
        { label: 'Contact Info', route: '/settings/contact', icon: 'mat-icon:contact_support' },
        { label: 'Language (EN/BN)', route: '/settings/language', icon: 'mat-icon:translate' },
        { label: 'Theme & Colors', route: '/settings/theme', icon: 'mat-icon:palette' },
        { label: 'Notifications', route: '/settings/notifications', icon: 'mat-icon:notifications' },
        { label: 'Users & Roles', route: '/settings/users', icon: 'mat-icon:admin_panel_settings' },
        { label: 'Backup & Restore', route: '/settings/backup', icon: 'mat-icon:backup' }
    ]},

    { label: 'Logout', icon: 'mat-icon:logout', route: '/logout' }
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
