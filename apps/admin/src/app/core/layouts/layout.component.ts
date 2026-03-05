import { Component, inject, signal, OnInit, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { 
  ZrdSidebarComponent, 
  ZrdAvatarComponent,
  ZrdNavItem 
} from '@repo/ui';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    ZrdSidebarComponent,
    ZrdAvatarComponent
  ],
  template: `
    <div class="flex h-screen overflow-hidden bg-google-gray-50 dark:bg-google-gray-900">
      
      <!-- Sidebar (handles its own toggle button at logo position) -->
      <zrd-sidebar 
        [items]="navItems" 
        [collapsed]="collapsed()"
        (onToggle)="toggleCollapsed()"
      ></zrd-sidebar>

      <div class="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <!-- Header -->
        <header class="h-16 flex items-center justify-between px-6 shrink-0 z-20 bg-white/80 dark:bg-google-gray-900/80 backdrop-blur-md border-b border-google-gray-200 dark:border-white/10 sticky top-0">
          
          <!-- Mobile-only menu button (lg+ uses sidebar's built-in button) -->
          <div class="flex items-center">
            <button
              (click)="toggleCollapsed()"
              class="lg:hidden p-2 h-10 w-10 flex items-center justify-center rounded-full hover:bg-google-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              <mat-icon class="text-google-gray-600 dark:text-google-gray-400">menu</mat-icon>
            </button>
          </div>

          <!-- Search -->
          <div class="flex-1 max-w-2xl px-4 hidden lg:block">
            <div class="relative group">
              <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-google-gray-400 group-focus-within:text-google-blue transition-colors">search</mat-icon>
              <input 
                type="text" 
                placeholder="Search resources, patients, doctors..." 
                class="w-full bg-google-gray-100 dark:bg-white/5 border-none rounded-pill py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-google-blue/20 transition-all outline-none"
              />
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <button (click)="themeService.toggleTheme()" 
                    class="h-10 w-10 flex items-center justify-center rounded-full hover:bg-google-gray-100 dark:hover:bg-white/5 text-google-gray-600 dark:text-google-gray-400 transition-all"
                    matTooltip="Toggle theme">
              <mat-icon>{{ themeService.isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
            </button>

            <button class="h-10 w-10 flex items-center justify-center rounded-full hover:bg-google-gray-100 dark:hover:bg-white/5 text-google-gray-600 dark:text-google-gray-400 transition-all relative">
              <mat-icon>notifications_none</mat-icon>
              <span class="absolute top-2 right-2 w-2 h-2 bg-google-red rounded-full border-2 border-white dark:border-google-gray-900"></span>
            </button>

            <div class="w-px h-6 bg-google-gray-200 dark:bg-white/10 mx-2"></div>

            <div class="flex items-center gap-3 pl-2">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-medium text-google-gray-900 dark:text-white leading-tight">Admin User</p>
                <p class="text-xs text-google-gray-500 dark:text-google-gray-400">Super Admin</p>
              </div>
              <zrd-avatar src="assets/images/avatar.jpg" fallback="A" size="md"></zrd-avatar>
            </div>
          </div>
        </header>

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
  collapsed = signal(false);
  isMobile = signal(false);
  themeService = inject(ThemeService);

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

  ngOnInit() { this.checkBreakpoint(); }

  @HostListener('window:resize')
  checkBreakpoint() {
    const mobile = window.innerWidth < 1024;
    this.isMobile.set(mobile);
    if (mobile) this.collapsed.set(true);
  }

  toggleCollapsed() {
    this.collapsed.update(v => !v);
  }
}
