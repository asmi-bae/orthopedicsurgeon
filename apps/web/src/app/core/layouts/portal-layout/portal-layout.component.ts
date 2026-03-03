import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '@repo/auth';

@Component({
  selector: 'app-portal-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule, 
    MatListModule,
    MatDividerModule
  ],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <!-- Header -->
      <mat-toolbar class="h-16 bg-white border-b border-gray-200 flex justify-between px-6 shrink-0 z-10">
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-2 cursor-pointer" routerLink="/">
            <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span class="text-white font-black text-sm">O</span>
            </div>
            <span class="text-sm font-black text-foreground tracking-tighter uppercase">OrthoSync</span>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-1">
            <a *ngFor="let item of navItems" 
               mat-button 
               [routerLink]="item.route" 
               routerLinkActive="text-primary bg-primary/5"
               class="text-[11px] font-bold uppercase tracking-widest px-4">
               <mat-icon class="mr-2 text-sm">{{item.icon}}</mat-icon>
               {{item.label}}
            </a>
          </nav>
        </div>

        <div class="flex items-center gap-4">
          <button mat-icon-button class="text-gray-400">
            <mat-icon>notifications</mat-icon>
          </button>

          <ng-container *ngIf="auth.currentUser() as user">
            <button mat-button [matMenuTriggerFor]="portalUserMenu" class="h-10 px-2 rounded-lg hover:bg-gray-50 transition-all">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                  {{user.firstName[0]}}{{user.lastName[0]}}
                </div>
                <span class="text-[11px] font-bold text-gray-700 hidden sm:inline">{{user.firstName}}</span>
                <mat-icon class="text-gray-300 text-sm">expand_more</mat-icon>
              </div>
            </button>

            <mat-menu #portalUserMenu="matMenu" class="portal-menu">
              <div class="px-4 py-3 border-b border-gray-50">
                <div class="text-[11px] font-bold text-gray-900">{{user.firstName}} {{user.lastName}}</div>
                <div class="text-[9px] font-medium text-gray-400 uppercase tracking-widest mt-0.5">Verified Patient</div>
              </div>
              <button mat-menu-item routerLink="/">
                <mat-icon>open_in_new</mat-icon>
                <span>Back to Site</span>
              </button>
              <button mat-menu-item routerLink="/portal/settings">
                <mat-icon>settings</mat-icon>
                <span>Profile Settings</span>
              </button>
              <mat-divider></mat-divider>
              <button mat-menu-item (click)="auth.logout()" class="text-red-600">
                <mat-icon class="text-red-600">logout</mat-icon>
                <span>Logout</span>
              </button>
            </mat-menu>
          </ng-container>
        </div>
      </mat-toolbar>

      <!-- Mobile Nav -->
      <nav class="md:hidden bg-white border-b border-gray-200 px-4 py-2 flex overflow-x-auto gap-2 scrollbar-hide">
        <a *ngFor="let item of navItems" 
           [routerLink]="item.route" 
           routerLinkActive="bg-primary text-white"
           class="whitespace-nowrap px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-50">
          {{item.label}}
        </a>
      </nav>

      <!-- Content Area -->
      <main class="flex-1 overflow-y-auto p-6 md:p-8">
        <div class="max-w-6xl mx-auto">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .portal-menu { border-radius: 12px !important; margin-top: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.05) !important; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `]
})
export class PortalLayoutComponent {
  auth = inject(AuthService);

  navItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/portal/dashboard' },
    { label: 'Appointments', icon: 'calendar_today', route: '/portal/appointments' },
    { label: 'Reports', icon: 'description', route: '/portal/history/reports' },
    { label: 'Prescriptions', icon: 'medication', route: '/portal/history/prescriptions' },
    { label: 'Payments', icon: 'payments', route: '/portal/payments' },
  ];
}
