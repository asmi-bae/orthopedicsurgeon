import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { LogoComponent } from '@core/components/logo/logo.component';
import { TranslatePipe } from '@core/pipes/translate.pipe';
import { UserMenuComponent } from '../../user-menu/user-menu.component';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    LogoComponent,
    UserMenuComponent,
    TranslatePipe
  ],
  template: `
    <mat-toolbar 
      class="h-24 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all fixed left-0 right-0 z-[1000] duration-200"
      [class.top-10]="!isHidden()"
      [class.top-0]="isHidden()"
      [class.-translate-y-full]="isHidden()">
      <div class="app-container flex items-center px-2 sm:px-4">
        <app-logo [height]="44" routerLink="/"></app-logo>

        <span class="flex-1"></span>

        <!-- Desktop Links -->
        <div class="hidden md:flex items-center gap-2">
          <a mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">{{ 'NAV.HOME' | translate }}</a>
          <a mat-button routerLink="/departments" routerLinkActive="active">{{ 'NAV.CENTRES' | translate }}</a>
          <a mat-button routerLink="/doctors" routerLinkActive="active">{{ 'NAV.SPECIALISTS' | translate }}</a>
          <a mat-button routerLink="/hospitals" routerLinkActive="active">{{ 'NAV.FACILITIES' | translate }}</a>
          <a mat-button routerLink="/about" routerLinkActive="active">{{ 'NAV.ABOUT' | translate }}</a>
          <a mat-button routerLink="/contact" routerLinkActive="active">{{ 'NAV.CONTACT' | translate }}</a>
          <a mat-button (click)="portalClick.emit()">{{ 'COMMON.PORTAL' | translate }}</a>
        </div>

        <div class="flex items-center gap-2 ml-4">
          <ng-container *ngIf="user(); else guest">
            <app-user-menu></app-user-menu>
          </ng-container>

          <ng-template #guest>
            <div class="hidden md:flex items-center gap-2">
              <a mat-button matButton="tonal" routerLink="/auth/login">{{ 'COMMON.SIGN_IN' | translate }}</a>
              <a mat-flat-button routerLink="/auth/register">{{ 'COMMON.GET_STARTED' | translate }}</a>
            </div>
          </ng-template>

          <!-- Mobile Menu Trigger -->
          <button mat-icon-button class="flex md:!hidden" [matMenuTriggerFor]="mobileMenu">
            <mat-icon>menu</mat-icon>
          </button>

          <mat-menu #mobileMenu="matMenu">
            <div class="p-4">
              <app-logo [height]="44" routerLink="/"></app-logo>
            </div>
            <mat-divider></mat-divider>
            
            <ng-container *ngIf="!user()">
              <a mat-menu-item routerLink="/auth/login">{{ 'COMMON.SIGN_IN' | translate }}</a>
              <a mat-menu-item routerLink="/auth/register">{{ 'COMMON.GET_STARTED' | translate }}</a>
            </ng-container>

            <mat-divider></mat-divider>
            <a mat-menu-item routerLink="/" routerLinkActive="active-mobile" [routerLinkActiveOptions]="{exact: true}">{{ 'NAV.HOME' | translate }}</a>
            <a mat-menu-item routerLink="/departments" routerLinkActive="active-mobile">{{ 'NAV.CENTRES' | translate }}</a>
            <a mat-menu-item routerLink="/doctors" routerLinkActive="active-mobile">{{ 'NAV.SPECIALISTS' | translate }}</a>
            <a mat-menu-item routerLink="/hospitals" routerLinkActive="active-mobile">{{ 'NAV.FACILITIES' | translate }}</a>
            <a mat-menu-item routerLink="/about" routerLinkActive="active-mobile">{{ 'NAV.ABOUT' | translate }}</a>
            <a mat-menu-item routerLink="/contact" routerLinkActive="active-mobile">{{ 'NAV.CONTACT' | translate }}</a>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="portalClick.emit()">{{ 'COMMON.PORTAL' | translate }}</button>
          </mat-menu>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    :host { display: block; }
    
    .active { 
      color: var(--primary-color, #f97316) !important;
      position: relative;
    }

    .active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 12px;
      right: 12px;
      height: 3px;
      background: var(--primary-color, #f97316);
      border-radius: 3px 3px 0 0;
      animation: slideIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .active-mobile {
      background: rgba(249, 115, 22, 0.05) !important;
      color: var(--primary-color, #f97316) !important;
      border-left: 4px solid var(--primary-color, #f97316);
      font-weight: 800 !important;
    }

    @keyframes slideIn {
      from { transform: scaleX(0); opacity: 0; }
      to { transform: scaleX(1); opacity: 1; }
    }
  `]
})
export class MainHeaderComponent {
  isHidden = input<boolean>(false);
  user = input<any>(null);
  portalClick = output<void>();
}
