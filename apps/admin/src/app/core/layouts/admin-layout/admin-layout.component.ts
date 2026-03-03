import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '@repo/auth';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule,
    MatTooltipModule
  ],
  template: `
    <mat-sidenav-container class="h-screen bg-[#070708] overflow-hidden font-inter">
      <!-- Sidebar -->
      <mat-sidenav #sidenav [mode]="'side'" [opened]="!sidebarCollapsed()" 
                   class="bg-secondary-900 border-r border-white/5 transition-all duration-500 glass flex flex-col shrink-0"
                   [class.w-72]="!sidebarCollapsed()" [class.w-20]="sidebarCollapsed()">
        
        <div class="h-24 flex items-center px-8 border-b border-white/5 overflow-hidden">
           <div class="flex items-center gap-4 w-full">
             <div class="w-11 h-11 bg-primary-600 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl shadow-primary-500/20 premium-border">
               <mat-icon class="text-white scale-110">grid_view</mat-icon>
             </div>
             <div *ngIf="!sidebarCollapsed()" class="flex flex-col truncate">
               <span class="text-xs font-black tracking-[0.2em] text-primary-400 uppercase leading-none mb-1">Precision</span>
               <span class="text-xl font-black tracking-tighter text-white italic uppercase leading-none">CONSOLE</span>
             </div>
           </div>
        </div>

        <mat-nav-list class="py-10 px-4 space-y-2 overflow-y-auto custom-scrollbar flex-1">
           <a mat-list-item *ngFor="let item of navItems" 
                [routerLink]="item.route" 
                routerLinkActive="active-nav"
                class="rounded-2xl transition-all text-white/40 mb-2 group hover:bg-white/[0.02]"
                [matTooltip]="sidebarCollapsed() ? item.label : ''"
                matTooltipPosition="right">
             <mat-icon matListItemIcon [class]="item.icon" class="text-xl group-hover:scale-110 group-hover:text-primary-400 transition-all"></mat-icon>
             <span *ngIf="!sidebarCollapsed()" class="font-bold text-xs uppercase tracking-[0.15em] shrink-0 transform group-hover:translate-x-1 transition-transform">{{item.label}}</span>
           </a>
        </mat-nav-list>

        <div class="p-6 border-t border-white/5 bg-black/20">
           <button mat-button (click)="sidebarCollapsed.set(!sidebarCollapsed())" 
                   class="w-full text-white/20 hover:text-white/40 rounded-2xl py-3 transition-all duration-500 border border-transparent hover:border-white/5">
             <div class="flex items-center justify-center gap-4">
               <mat-icon class="transition-transform duration-500" [class.rotate-180]="sidebarCollapsed()">chevron_left</mat-icon>
               <span *ngIf="!sidebarCollapsed()" class="font-black text-[9px] uppercase tracking-[0.3em]">Minimize Interface</span>
             </div>
           </button>
        </div>
      </mat-sidenav>

      <mat-sidenav-content class="flex flex-col min-w-0 bg-transparent relative overflow-hidden h-full">
        <!-- Top Bar -->
        <mat-toolbar class="h-24 flex items-center justify-between px-10 shrink-0 border-b border-white/5 bg-secondary-950/50 backdrop-blur-xl z-20">
          <div class="flex flex-col">
            <span class="text-[9px] font-black uppercase tracking-[0.4em] text-primary-500 mb-1 animate-pulse">System Online</span>
            <h2 class="text-2xl font-black text-white tracking-tighter italic uppercase flex items-center gap-3">
              Operational Matrix
              <span class="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
            </h2>
          </div>

          <div class="flex-1 px-12 hidden md:flex justify-center">
            <div class="flex items-center bg-white/[0.03] px-6 py-3 rounded-2xl border border-white/5 w-full max-w-xl group focus-within:border-primary-500/50 focus-within:bg-white/[0.05] transition-all">
               <mat-icon class="text-white/20 mr-4 group-focus-within:text-primary-400 transition-colors">search</mat-icon>
               <input type="text" placeholder="Search operational directives..." class="bg-transparent border-none text-xs outline-none w-full text-white placeholder-white/10 font-bold tracking-wide" />
               <div class="flex items-center gap-1 opacity-20 group-focus-within:opacity-50 transition-opacity">
                 <kbd class="text-[9px] font-black text-white bg-white/10 px-1.5 py-0.5 rounded">⌘</kbd>
                 <kbd class="text-[9px] font-black text-white bg-white/10 px-1.5 py-0.5 rounded">K</kbd>
               </div>
            </div>
          </div>

          <div class="flex items-center gap-8">
            <button mat-icon-button class="w-12 h-12 bg-white/[0.03] text-white/30 rounded-2xl hover:text-primary-400 transition-all border border-white/5 group premium-border">
              <mat-icon [matBadge]="'4'" matBadgeColor="warn" matBadgeSize="small" class="scale-90">notifications</mat-icon>
            </button>

            <div class="h-10 w-[1px] bg-white/5 mx-2"></div>

            <ng-container *ngIf="auth.currentUser() as user">
              <button mat-button [matMenuTriggerFor]="profileMenu" class="h-14 px-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group overflow-hidden relative">
                <div class="flex items-center gap-4 px-2 relative z-10">
                  <div class="text-right hidden sm:block">
                    <div class="text-[10px] font-black text-white uppercase italic leading-none truncate max-w-[100px]">{{user.firstName}} {{user.lastName}}</div>
                    <div class="text-[8px] font-bold text-primary-500 tracking-widest uppercase mt-1.5 leading-none">Security Clearance A</div>
                  </div>
                  <div class="w-10 h-10 rounded-xl border border-white/10 p-0.5 group-hover:border-primary-500/50 transition-all overflow-hidden bg-secondary-900 shadow-inner">
                     <img [src]="'https://ui-avatars.com/?name=' + user.firstName + '+' + user.lastName + '&background=0d4b9b&color=fff&bold=true'" 
                          class="w-full h-full rounded-lg object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </button>

              <mat-menu #profileMenu="matMenu" class="premium-admin-menu">
                <div class="px-6 py-5 border-b border-white/5 bg-white/[0.02]">
                   <div class="text-xs font-black text-white uppercase italic">{{user.firstName}} {{user.lastName}}</div>
                   <div class="text-[9px] font-bold text-primary-400 tracking-widest uppercase mt-1.5">Sector Authorization active</div>
                </div>
                <button mat-menu-item (click)="navigateTo('http://localhost:4201')">
                  <mat-icon class="text-white/40 scale-90">swap_horiz</mat-icon>
                  <span class="text-white/60 font-bold text-[10px] uppercase tracking-[0.2em]">Switch Context</span>
                </button>
                <button mat-menu-item (click)="navigateTo('/settings')">
                  <mat-icon class="text-white/40 scale-90">settings</mat-icon>
                  <span class="text-white/60 font-bold text-[10px] uppercase tracking-[0.2em]">Platform Sync</span>
                </button>
                <mat-divider class="bg-white/5"></mat-divider>
                <button mat-menu-item (click)="auth.logout()" class="group">
                  <mat-icon class="text-red-500/50 group-hover:text-red-500 scale-90 transition-colors">power_settings_new</mat-icon>
                  <span class="text-red-500/60 group-hover:text-red-500 font-bold text-[10px] uppercase tracking-[0.2em] transition-colors">Terminate Link</span>
                </button>
              </mat-menu>
            </ng-container>
          </div>
        </mat-toolbar>

        <!-- Dynamic Viewport -->
        <main class="flex-1 overflow-y-auto p-10 sm:p-14 custom-scrollbar relative z-10 scroll-smooth bg-transparent">
          <div class="max-w-[1600px] mx-auto animate-fade-in pb-24">
            <router-outlet></router-outlet>
          </div>
        </main>

        <!-- Background FX -->
        <div class="fixed top-[-15%] right-[-10%] w-[1000px] h-[1000px] bg-primary-900/10 rounded-full blur-[180px] pointer-events-none animate-pulse duration-[10s]"></div>
        <div class="fixed bottom-[-15%] left-[-10%] w-[800px] h-[800px] bg-accent-400/5 rounded-full blur-[150px] pointer-events-none animate-pulse duration-[8s]"></div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    
    mat-sidenav { border: none !important; box-shadow: 20px 0 50px rgba(0,0,0,0.5); }
    .active-nav { background: rgba(59, 130, 246, 0.15) !important; border-left: 3px solid #3b82f6 !important; border-radius: 0 12px 12px 0 !important; }
    .active-nav * { color: #3b82f6 !important; }

    ::ng-deep .premium-admin-menu { 
      background: rgba(20, 20, 22, 0.95) !important;
      backdrop-filter: blur(20px) !important;
      border: 1px solid rgba(255,255,255,0.1) !important;
      border-radius: 20px !important;
      margin-top: 12px !important;
      padding: 0 !important;
      overflow: hidden !important;
    }
    ::ng-deep .premium-admin-menu .mat-mdc-menu-item {
      min-height: 54px !important;
    }
    ::ng-deep .premium-admin-menu .mat-mdc-menu-item:hover:not([disabled]) {
      background: rgba(255,255,255,0.05) !important;
    }
  `]
})
export class AdminLayoutComponent {
  auth = inject(AuthService);
  sidebarCollapsed = signal(false);

  navItems = [
    { label: 'Overview', icon: 'monitoring', route: '/dashboard' },
    { label: 'Organization', icon: 'corporate_fare', route: '/hospitals' },
    { label: 'Medical Staff', icon: 'medical_services', route: '/doctors' },
    { label: 'Patient Registry', icon: 'contact_page', route: '/patients' },
    { label: 'Appointments', icon: 'event_available', route: '/appointments' },
    { label: 'Medical Records', icon: 'description', route: '/records' },
    { label: 'Financials', icon: 'payments', route: '/finance' },
    { label: 'Hero Matrix', icon: 'view_carousel', route: '/content/hero' },
    { label: 'Inquiry Matrix', icon: 'quiz', route: '/content/faq' },
    { label: 'Affiliation Matrix', icon: 'handshake', route: '/content/partners' },
    { label: 'Dispatch Matrix', icon: 'podcasts', route: '/blog' },
    { label: 'Platform Settings', icon: 'settings', route: '/settings' },
  ];

  navigateTo(url: string) {
    if (url.startsWith('http')) {
      window.location.href = url;
    } else {
      // Local navigation can be added here if needed
    }
  }
}
