import { ZrdButtonComponent, ZrdBadgeComponent } from '@ui/components';
import { Component, inject, signal, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '@repo/auth';
import { LogoutConfirmDialogComponent } from '@core/components/logout-confirm-dialog/logout-confirm-dialog.component';



interface NavItem {
  label: string;
  icon: string;
  route?: string;
  children?: NavItem[];
  badge?: string;
  roles?: string[]; // if set, only show for these roles
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDialogModule,
    ZrdButtonComponent,
    ZrdBadgeComponent
  ],
  template: `
    <div class="flex flex-col h-full transition-all duration-300 overflow-hidden border-r border-white/5 shadow-2xl"
         [class.w-16]="collapsed">

      <!-- Brand Block -->
      <div class="h-20 flex items-center shrink-0 px-4 mb-4"
           [class.justify-center]="collapsed">
        <div class="flex items-center gap-3 overflow-hidden">
          <div class="w-10 h-10 rounded-2xl bg-google-blue flex items-center justify-center shrink-0 shadow-lg shadow-google-blue/20">
            <mat-icon class="text-white text-[20px] leading-none">medical_services</mat-icon>
          </div>
          @if (!collapsed) {
            <div class="flex flex-col leading-none overflow-hidden animate-in fade-in slide-in-from-left-2">
              <span class="text-[10px] font-black text-google-blue uppercase tracking-widest">Dr. Ab Rahman</span>
              <span class="text-lg font-black text-white truncate tracking-tighter">Admin Console</span>
            </div>
          }
        </div>
      </div>

      <!-- Role Badge -->
      @if (!collapsed) {
        <div class="mx-3 mb-3">
          <div class="px-3 py-1.5 rounded-xl bg-google-blue/10 border border-google-blue/20 text-center">
            <span class="text-[10px] font-black text-google-blue uppercase tracking-widest">{{ getRoleLabel() }}</span>
          </div>
        </div>
      }

      <!-- Navigation -->
      <div class="flex-1 overflow-y-auto overflow-x-hidden py-2 custom-scrollbar">
        <div class="flex flex-col gap-1 px-2">
          @for (item of getVisibleNavItems(); track item.label) {
            @if (item.children) {
              @if (collapsed) {
                <div class="flex justify-center py-1">
                   <button class="w-10 h-10 rounded-full flex items-center justify-center text-google-gray-400 hover:text-white hover:bg-white/10 transition-all group"
                           [matTooltip]="item.label" matTooltipPosition="right">
                      <mat-icon class="text-[20px]">{{ item.icon }}</mat-icon>
                   </button>
                </div>
              } @else {
                <mat-expansion-panel class="mat-elevation-z0 !bg-transparent !p-0 shadow-none border-none expansion-spartan">
                  <mat-expansion-panel-header class="!px-3 !h-12 !rounded-2xl hover:!bg-white/5 transition-colors group">
                    <mat-panel-title class="!items-center !gap-3 !text-google-gray-400 group-hover:!text-white">
                      <mat-icon class="text-[20px] shrink-0">{{ item.icon }}</mat-icon>
                      <span class="text-sm font-bold tracking-tight">{{ item.label }}</span>
                    </mat-panel-title>
                  </mat-expansion-panel-header>
                  <div class="flex flex-col gap-1 mt-1 pl-10">
                    @for (child of item.children; track child.label) {
                      <a [routerLink]="child.route" routerLinkActive="!text-white !bg-white/10"
                         (click)="onNavClick()"
                         class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-google-gray-400 hover:text-white hover:bg-white/5 transition-all">
                        <mat-icon class="text-[14px]">{{ child.icon }}</mat-icon>
                        <span>{{ child.label }}</span>
                      </a>
                    }
                  </div>
                </mat-expansion-panel>
              }
            } @else {
              @if (collapsed) {
                 <div class="flex justify-center py-1">
                   <a [routerLink]="item.route" routerLinkActive="!text-white !bg-google-blue/10 !border-google-blue/20"
                      [matTooltip]="item.label" matTooltipPosition="right"
                      (click)="onNavClick()"
                      class="w-10 h-10 rounded-full flex items-center justify-center text-google-gray-400 hover:text-white hover:bg-white/10 transition-all group">
                      <mat-icon class="text-[20px]">{{ item.icon }}</mat-icon>
                   </a>
                 </div>
              } @else {
                <a [routerLink]="item.route" routerLinkActive="!text-white !bg-google-blue/10 !border-google-blue/20"
                   (click)="onNavClick()"
                   class="flex items-center gap-3 px-3 py-3 rounded-2xl text-google-gray-500 hover:text-white hover:bg-white/5 transition-all group border border-transparent">
                  <mat-icon class="text-[20px] shrink-0">{{ item.icon }}</mat-icon>
                  <span class="text-sm font-bold tracking-tight">{{ item.label }}</span>
                  @if (item.badge) {
                     <zrd-badge variant="info" class="ml-auto text-[8px] px-1.5 py-0 font-black">{{ item.badge }}</zrd-badge>
                  }
                </a>
              }
            }
          }
        </div>
      </div>

      <!-- Identity Layer -->
      @if (!collapsed) {
        <div class="p-4 animate-in slide-in-from-bottom-4 duration-500">
          <div class="p-4 bg-white/5 rounded-3xl border border-white/10 group hover:border-google-blue/30 transition-all cursor-pointer">
            <div class="flex items-center gap-3">
               <div class="w-10 h-10 rounded-full bg-google-gray-800 flex items-center justify-center shrink-0 border border-white/10">
                  <mat-icon class="text-google-blue text-lg">face</mat-icon>
               </div>
               <div class="flex flex-col min-w-0">
                  <p class="text-[10px] font-black text-google-gray-500 uppercase tracking-widest leading-none mb-1">Signed In</p>
                  <p class="text-xs font-black text-white truncate tracking-tight">{{ getUserDisplay() }}</p>
               </div>
            </div>
          </div>
        </div>
      }

      <!-- Logout -->
      <div class="p-4 mt-2">
         <zrd-button
           variant="ghost"
           [size]="collapsed ? 'sm' : 'md'"
           class="w-full !rounded-2xl !bg-transparent hover:!bg-google-red/10 !text-google-red hover:!text-google-red group"
           (click)="confirmLogout()"
           [matTooltip]="collapsed ? 'Sign Out' : ''"
           matTooltipPosition="right"
         >
           <mat-icon leftIcon class="transition-transform group-hover:-translate-x-1">power_settings_new</mat-icon>
           @if (!collapsed) { <span class="font-black uppercase tracking-widest text-[10px] ml-1">Sign Out</span> }
         </zrd-button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; width: 100%; overflow: hidden; }
    ::ng-deep .expansion-spartan .mat-expansion-panel-body { padding: 0 0 12px 0 !important; }
    ::ng-deep .expansion-spartan .mat-expansion-indicator::after { color: #94a3b8 !important; }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
  `]
})
export class AdminSidebarComponent {
  @Input() collapsed = false;
  @Output() closeRequested = new EventEmitter<void>();

  auth = inject(AuthService);
  dialog = inject(MatDialog);

  // All nav items — DOCTOR_ADMIN and SUPER_ADMIN see everything
  // SUPER_ADMIN also sees system-level items
  allNavItems: NavItem[] = [
    { label: 'Dashboard',         icon: 'insights',          route: '/dashboard' },
    { label: 'My Appointments',   icon: 'event_repeat',      route: '/appointments' },
    { label: 'Patients',          icon: 'groups',            route: '/patients' },
    { label: 'Prescriptions',     icon: 'medication',        route: '/records/prescriptions' },
    { label: 'Lab Reports',       icon: 'biotech',           route: '/records/reports' },
    { label: 'Health Records',    icon: 'monitor_heart',     route: '/health' },
    { label: 'Payments',          icon: 'account_balance',   route: '/finance' },
    {
      label: 'Website Control',   icon: 'web',
      children: [
        { label: 'Theme Identity',  icon: 'palette',           route: '/website/theme' },
        { label: 'Hero Slider',     icon: 'auto_awesome',      route: '/content/hero' },
        { label: 'About Profile',   icon: 'person_pin',        route: '/website/about' },
        { label: 'Services',        icon: 'medical_services',  route: '/website/services' },
        { label: 'Blog / News',     icon: 'article',           route: '/blog' },
        { label: 'Media Gallery',   icon: 'collections',       route: '/website/gallery' },
        { label: 'Reviews',         icon: 'star_rate',         route: '/website/reviews' },
        { label: 'FAQ Builder',     icon: 'help_center',       route: '/content/faq' },
        { label: 'Contact Info',    icon: 'contact_phone',     route: '/website/contact' },
        { label: 'Partners',        icon: 'handshake',         route: '/content/partners' },
      ]
    },
    { label: 'Notifications',     icon: 'notifications',     route: '/notifications' },
    { label: 'User Management',   icon: 'manage_accounts',   route: '/users',           roles: ['SUPER_ADMIN', 'DOCTOR_ADMIN'] },
    { label: 'Audit Logs',        icon: 'receipt_long',      route: '/audit',           roles: ['SUPER_ADMIN'] },
    { label: 'System Settings',   icon: 'tune',              route: '/settings',        roles: ['SUPER_ADMIN'] },
  ];

  getVisibleNavItems(): NavItem[] {
    const user = this.auth.currentUser();
    if (!user) return [];
    const roles: string[] = (user as any).roles ?? [];
    const isSuperAdmin = roles.includes('SUPER_ADMIN');
    return this.allNavItems.filter(item => {
      if (!item.roles) return true; // visible to all admin roles
      return item.roles.some(r => roles.includes(r)) || isSuperAdmin;
    });
  }

  getRoleLabel(): string {
    const user = this.auth.currentUser();
    if (!user) return 'ADMIN';
    const roles: string[] = (user as any).roles ?? [];
    if (roles.includes('SUPER_ADMIN')) return 'SUPER ADMIN';
    if (roles.includes('DOCTOR_ADMIN')) return 'DOCTOR / ADMIN';
    return 'ADMIN';
  }

  getUserDisplay(): string {
    const user = this.auth.currentUser();
    if (!user) return 'Dr. Ab Rahman';
    return `${user.firstName} ${user.lastName}`;
  }

  onNavClick() { this.closeRequested.emit(); }

  confirmLogout() {
    const dialogRef = this.dialog.open(LogoutConfirmDialogComponent, {
      width: '400px',
      autoFocus: false,
      panelClass: 'logout-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.auth.logout();
    });
  }
}
