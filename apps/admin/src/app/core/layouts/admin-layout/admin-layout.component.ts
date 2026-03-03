import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
    TranslateModule,
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
    <mat-sidenav-container class="h-screen overflow-hidden">
      <!-- Sidebar -->
      <mat-sidenav #sidenav [mode]="'side'" [opened]="!sidebarCollapsed()" 
                   class="border-r transition-all duration-300"
                   [class.w-72]="!sidebarCollapsed()" [class.w-20]="sidebarCollapsed()">
        
        <div class="h-16 flex items-center px-6 border-b overflow-hidden">
           <div class="flex items-center gap-4 w-full">
             <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center shrink-0">
               <mat-icon class="text-white">grid_view</mat-icon>
             </div>
             @if (!sidebarCollapsed()) {
               <div class="flex flex-col truncate">
                  <span class="text-xs font-bold text-primary-500 uppercase leading-none mb-1">Precision</span>
                  <span class="text-lg font-black text-white italic uppercase leading-none">CONSOLE</span>
               </div>
             }
           </div>
        </div>

        <mat-nav-list class="py-4 px-2 overflow-y-auto custom-scrollbar flex-1">
           @for (item of navItems; track item.labelKey) {
             <a mat-list-item 
                  [routerLink]="item.route" 
                  routerLinkActive="active-nav"
                  class="rounded-lg mb-1 group"
                  [matTooltip]="sidebarCollapsed() ? (item.labelKey | translate) : ''"
                  matTooltipPosition="right">
               <mat-icon matListItemIcon [class]="item.icon" class="text-xl"></mat-icon>
               @if (!sidebarCollapsed()) {
                 <span class="font-medium text-sm">{{ item.labelKey | translate }}</span>
               }
             </a>
           }
        </mat-nav-list>

        <div class="p-4 border-t">
           <button mat-button (click)="sidebarCollapsed.set(!sidebarCollapsed())" 
                   class="w-full rounded-lg">
             <div class="flex items-center justify-center gap-2">
               <mat-icon [class.rotate-180]="sidebarCollapsed()">chevron_left</mat-icon>
               @if (!sidebarCollapsed()) {
                 <span class="text-xs uppercase tracking-wider">Minimize</span>
               }
             </div>
           </button>
        </div>
      </mat-sidenav>

      <mat-sidenav-content class="flex flex-col min-w-0 relative overflow-hidden h-full">
        <!-- Top Bar -->
        <mat-toolbar class="h-16 flex items-center justify-between px-6 shrink-0 border-b z-20">
          <div class="flex items-center gap-4">
            <h2 class="text-lg font-bold text-white tracking-tight flex items-center gap-3">
              {{ 'COMMON.DASHBOARD' | translate }}
            </h2>
          </div>

          <div class="flex-1 px-8 hidden md:flex justify-center">
            <div class="flex items-center bg-white/[0.05] px-4 py-2 rounded-lg border border-white/10 w-full max-w-xl group focus-within:border-primary-500 transition-all">
               <mat-icon class="text-white/40 mr-3 scale-90">search</mat-icon>
               <input type="text" [placeholder]="'COMMON.SEARCH' | translate" class="bg-transparent border-none text-sm outline-none w-full text-white placeholder-white/20" />
            </div>
          </div>

          <div class="flex items-center gap-4">
              <!-- Language Switcher -->
              <button mat-button [matMenuTriggerFor]="langMenu" class="rounded-lg">
                 <div class="flex items-center gap-2">
                    <mat-icon class="scale-90">language</mat-icon>
                    <span class="text-xs font-bold uppercase">{{ currentLang() === 'en' ? 'EN' : 'BN' }}</span>
                 </div>
              </button>
              <mat-menu #langMenu="matMenu">
                 <button mat-menu-item (click)="switchLang('en')">English</button>
                 <button mat-menu-item (click)="switchLang('bn')">বাংলা</button>
              </mat-menu>

            <button mat-icon-button class="text-white/40 hover:text-primary-400 transition-all">
              <mat-icon [matBadge]="'4'" matBadgeColor="warn" matBadgeSize="small" class="scale-90">notifications</mat-icon>
            </button>

            <div class="h-8 w-[1px] bg-white/10 mx-1"></div>

            @if (auth.currentUser(); as user) {
              <button mat-button [matMenuTriggerFor]="profileMenu" class="h-10 px-2 rounded-lg hover:bg-white/[0.05] transition-all">
                <div class="flex items-center gap-3 relative z-10">
                  <div class="text-right hidden sm:block">
                    <div class="text-[11px] font-bold text-white leading-none truncate max-w-[100px]">{{user.firstName}} {{user.lastName}}</div>
                  </div>
                  <div class="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                     <img [src]="'https://ui-avatars.com/?name=' + user.firstName + '+' + user.lastName + '&background=0d4b9b&color=fff&bold=true'" 
                          class="w-full h-full object-cover" />
                  </div>
                </div>
              </button>

              <mat-menu #profileMenu="matMenu">
                <div class="px-4 py-3 border-b">
                   <div class="text-xs font-bold text-white">{{user.firstName}} {{user.lastName}}</div>
                   <div class="text-[10px] text-white/40 mt-1 uppercase tracking-wider">Administrator</div>
                </div>
                <button mat-menu-item (click)="navigateTo('/settings')">
                  <mat-icon class="scale-90">settings</mat-icon>
                  <span>{{ 'COMMON.SETTINGS' | translate }}</span>
                </button>
                <mat-divider></mat-divider>
                <button mat-menu-item (click)="auth.logout()">
                  <mat-icon class="text-red-500/70 scale-90">power_settings_new</mat-icon>
                  <span class="text-red-500/70">{{ 'COMMON.LOGOUT' | translate }}</span>
                </button>
              </mat-menu>
            }
          </div>
        </mat-toolbar>

        <!-- Dynamic Viewport -->
        <main class="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar relative z-10 scroll-smooth">
          <div class="max-w-[1400px] mx-auto animate-fade-in pb-12">
            <router-outlet></router-outlet>
          </div>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
    
    .active-nav { background: rgba(59, 130, 246, 0.1) !important; color: #3b82f6 !important; }
    .active-nav mat-icon { color: #3b82f6 !important; }
  `]
})
export class AdminLayoutComponent {
  auth = inject(AuthService);
  translate = inject(TranslateService);
  sidebarCollapsed = signal(false);
  currentLang = signal('en');

  navItems = [
    { labelKey: 'COMMON.NAV.OVERVIEW', icon: 'monitoring', route: '/dashboard' },
    { labelKey: 'COMMON.NAV.ORGANIZATION', icon: 'corporate_fare', route: '/hospitals' },
    { labelKey: 'COMMON.NAV.MEDICAL_STAFF', icon: 'medical_services', route: '/doctors' },
    { labelKey: 'COMMON.NAV.PATIENTS', icon: 'contact_page', route: '/patients' },
    { labelKey: 'COMMON.NAV.APPOINTMENTS', icon: 'event_available', route: '/appointments' },
    { labelKey: 'COMMON.NAV.RECORDS', icon: 'description', route: '/records' },
    { labelKey: 'COMMON.NAV.FINANCE', icon: 'payments', route: '/finance' },
    { labelKey: 'COMMON.NAV.CONTENT.HERO', icon: 'view_carousel', route: '/content/hero' },
    { labelKey: 'COMMON.NAV.CONTENT.FAQ', icon: 'quiz', route: '/content/faq' },
    { labelKey: 'COMMON.NAV.CONTENT.PARTNERS', icon: 'handshake', route: '/content/partners' },
    { labelKey: 'COMMON.NAV.CONTENT.BLOG', icon: 'podcasts', route: '/blog' },
    { labelKey: 'COMMON.NAV.SETTINGS', icon: 'settings', route: '/settings' },
  ];

  switchLang(lang: string) {
    this.translate.use(lang);
    this.currentLang.set(lang);
  }

  navigateTo(url: string) {
    if (url.startsWith('http')) {
      window.location.href = url;
    } else {
      // Handle internal nav if needed
    }
  }
}
