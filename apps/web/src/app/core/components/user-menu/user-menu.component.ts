import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '@repo/auth';
import { LogoutDialogComponent } from './logout-dialog.component';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule
  ],
  template: `
    <ng-container *ngIf="auth.currentUser() as user">
      <!-- Avatar Trigger -->
      <button mat-button [matMenuTriggerFor]="userMenu" class="h-10 px-1 rounded-full hover:bg-slate-100 transition-all">
        <div class="flex items-center gap-2">
           <div class="relative">
              <div class="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border border-slate-200 bg-white group-hover:border-primary transition-colors">
                <img *ngIf="user.imageUrl" [src]="user.imageUrl" [alt]="user.firstName" class="w-full h-full object-cover">
                <div *ngIf="!user.imageUrl" class="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                  {{user.firstName[0]}}{{user.lastName[0]}}
                </div>
              </div>
           </div>
           <mat-icon class="text-slate-400 text-sm !w-4 !h-4 hidden sm:block">expand_more</mat-icon>
        </div>
      </button>

      <!-- Google Style Menu -->
      <mat-menu #userMenu="matMenu" xPosition="before" class="user-profile-menu">
        <div class="px-6 py-5 min-w-[280px]">
          <!-- Profile Header -->
          <div class="flex flex-col items-center text-center mb-6">
            <div class="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border-4 border-slate-50 bg-white mb-3 shadow-sm">
              <img *ngIf="user.imageUrl" [src]="user.imageUrl" [alt]="user.firstName" class="w-full h-full object-cover">
              <div *ngIf="!user.imageUrl" class="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
                {{user.firstName[0]}}{{user.lastName[0]}}
              </div>
            </div>
            <div class="text-base font-bold text-slate-900 tracking-tight">{{user.firstName}} {{user.lastName}}</div>
            <div class="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-0.5">{{user.email}}</div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col gap-1">
            <a mat-button routerLink="/portal/dashboard" class="!justify-start !h-11 !rounded-xl text-slate-700 font-bold !px-4 hover:!bg-slate-50">
              <mat-icon class="mr-3 text-slate-400">dashboard</mat-icon>
              <span>Personal Dashboard</span>
            </a>
            <a mat-button routerLink="/portal/settings" class="!justify-start !h-11 !rounded-xl text-slate-700 font-bold !px-4 hover:!bg-slate-50">
              <mat-icon class="mr-3 text-slate-400">manage_accounts</mat-icon>
              <span>Manage Profile</span>
            </a>
          </div>

          <mat-divider class="!my-4"></mat-divider>

          <!-- Logout Button -->
          <button mat-stroked-button (click)="onLogout()" class="w-full !h-11 !rounded-xl font-bold border-2 hover:bg-slate-50 transition-colors">
            <mat-icon class="mr-2">logout</mat-icon>
            Sign Out
          </button>
          
          <div class="mt-4 text-[10px] text-center text-slate-300 font-medium">
            <a href="#" class="hover:underline">Privacy Policy</a> • <a href="#" class="hover:underline">Terms of Service</a>
          </div>
        </div>
      </mat-menu>
    </ng-container>
  `,
  styles: [`
    :host { display: block; }
    ::ng-deep .user-profile-menu { 
      border-radius: 28px !important; 
      margin-top: 12px; 
      box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important; 
      border: 1px solid rgba(0,0,0,0.05);
    }
  `]
})
export class UserMenuComponent {
  auth = inject(AuthService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  onLogout() {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '320px',
      panelClass: 'logout-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.auth.logout();
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
