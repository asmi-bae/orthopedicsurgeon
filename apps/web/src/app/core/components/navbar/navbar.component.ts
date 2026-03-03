import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '@repo/auth';
import { LogoComponent } from '@core/components/logo/logo.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    LogoComponent
  ],
  template: `
    <!-- Emergency Top Bar -->
    <div class="h-10 bg-secondary-900 border-b border-white/5 flex items-center justify-between px-6 sm:px-12 text-white">
     <!-- Top Bar -->
    <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <mat-icon class="text-primary text-sm scale-75">error</mat-icon>
          <span class="text-[9px] font-black uppercase tracking-[0.2em]">Emergency Network:</span>
          <span class="text-[9px] font-black uppercase tracking-[0.2em] text-primary underline underline-offset-4">+1 (800) 911-ORTHO</span>
        </div>
        <div class="hidden md:flex items-center gap-2 border-l border-white/10 pl-6">
           <mat-icon class="text-white/40 text-sm scale-75">location_on</mat-icon>
           <span class="text-[9px] font-bold uppercase tracking-widest text-white/40">Clinical Hub, Ortho City</span>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <button class="text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-primary transition-colors">EN</button>
        <div class="w-[1px] h-3 bg-white/10"></div>
        <button class="text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-primary transition-colors">BN</button>
      </div>
    </div>

    <mat-toolbar class="h-24 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 sm:px-10 lg:px-12 transition-all">
      <app-logo [height]="44" routerLink="/"></app-logo>

      <span class="flex-1"></span>

      <!-- Desktop Links -->
      <div class="hidden xl:flex items-center gap-2 mr-8">
        <a mat-button routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}" class="nav-btn">Home</a>
        <a mat-button routerLink="/departments" routerLinkActive="active-link" class="nav-btn">Centres</a>
        <a mat-button routerLink="/doctors" routerLinkActive="active-link" class="nav-btn">Specialists</a>
        <a mat-button routerLink="/hospitals" routerLinkActive="active-link" class="nav-btn">Facilities</a>
        <a mat-button routerLink="/about" routerLinkActive="active-link" class="nav-btn">About</a>
        <a mat-button routerLink="/contact" routerLinkActive="active-link" class="nav-btn">Contact</a>
        <a mat-tonal-button color="primary" (click)="navigateToPortal()" class="nav-btn">Portal</a>
      </div>

      <div class="flex items-center gap-4">
        <!-- Global Search Placeholder -->
        <div class="hidden md:flex items-center bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 group focus-within:border-primary/30 transition-all">
          <mat-icon class="text-gray-300 scale-75">search</mat-icon>
          <input type="text" placeholder="PRECISION SEARCH" class="bg-transparent border-none text-[9px] font-black uppercase tracking-widest text-secondary-900 focus:outline-none ml-2 w-32 placeholder:text-gray-300">
        </div>

        <ng-container *ngIf="auth.currentUser() as user; else guest">
          <button mat-button [matMenuTriggerFor]="userMenu" class="rounded-full border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-premium transition-all">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs uppercase">
                {{user.firstName[0]}}{{user.lastName[0]}}
              </div>
              <span class="text-[10px] font-black text-foreground uppercase tracking-widest hidden sm:inline">{{user.firstName}}</span>
              <mat-icon class="text-foreground/20 text-sm">expand_more</mat-icon>
            </div>
          </button>

          <mat-menu #userMenu="matMenu" class="premium-menu">
            <div class="px-4 py-3 border-b border-gray-50">
              <div class="text-[10px] font-black text-foreground uppercase tracking-widest">{{user.firstName}} {{user.lastName}}</div>
              <div class="text-[9px] font-bold text-foreground/40 uppercase tracking-[0.2em] mt-1">Authorized Patient</div>
            </div>
            <button mat-menu-item (click)="navigateToPortal()">
              <mat-icon>dashboard</mat-icon>
              <span>My Dashboard</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="auth.logout()" class="text-red-500">
              <mat-icon class="text-red-500">logout</mat-icon>
              <span>Logout</span>
            </button>
          </mat-menu>
        </ng-container>

        <ng-template #guest>
           <div class="flex items-center gap-3">
             <a mat-tonal-button color="primary" matButton="tonal" routerLink="/auth/login" class="font-bold uppercase tracking-widest text-[10px]">
               Sign In
             </a>
             <a mat-flat-button color="primary" routerLink="/auth/register" class="font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">
               Get Started
             </a>
           </div>
        </ng-template>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    :host { display: block; position: sticky; top: 0; z-index: 1000; }
    .nav-btn { font-size: 10px !important; font-weight: 900 !important; text-transform: uppercase !important; letter-spacing: 0.15em !important; opacity: 0.6; }
    .active-link { color: var(--mat-sys-primary) !important; opacity: 1 !important; }
    .premium-menu { border-radius: 16px !important; margin-top: 8px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 20px 50px rgba(0,0,0,0.1) !important; }
  `]
})
export class NavbarComponent {
  auth = inject(AuthService);

  navigateToPortal() {
    window.location.href = 'http://localhost:4200';
  }
}
