import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { LogoComponent } from '@core/components/logo/logo.component';
import { TranslatePipe } from '@core/pipes/translate.pipe';
import { UserMenuComponent } from '../../user-menu/user-menu.component';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbar,
    MatButton,
    MatIconButton,
    MatIcon,
    MatMenuModule,
    MatDivider,
    LogoComponent,
    UserMenuComponent,
    TranslatePipe
  ],
  template: `
    <mat-toolbar 
      class="h-24 bg-white border-b border-gray-100 transition-all fixed left-0 right-0 z-[1000] duration-200"
      [class.top-10]="!isHidden()"
      [class.top-0]="isHidden()"
      [class.-translate-y-full]="isHidden()">
      <div class="app-container flex items-center px-2 sm:px-4">
        <app-logo [height]="44" routerLink="/"></app-logo>

        <span class="flex-1"></span>

        <!-- Desktop Links -->
        <div class="hidden md:flex items-center gap-1">
          <div *ngFor="let link of navLinks" class="group">
            <a mat-button 
               [routerLink]="link.path" 
               routerLinkActive="active" 
               [routerLinkActiveOptions]="{exact: link.path === '/'}"
               class="px-3 py-2 rounded-xl text-sm font-bold tracking-[0.2em] relative overflow-hidden transition-all duration-300">
              <mat-icon *ngIf="link.children" class="text-[10px] w-3 h-3 flex items-center justify-center transition-transform duration-300 group-hover:rotate-180">expand_more</mat-icon>
              {{ link.label | translate }}
            </a>

            <!-- Premium Dual-Pane Megamenu (Full-Width, Auto-Height) -->
            <div *ngIf="link.children" 
                 class="absolute top-full left-0 w-full bg-white border-b border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[999] overflow-hidden"
                 style="max-height: 0;">
              <div class="app-container py-8 px-2 sm:px-4">
                <div class="flex gap-20 items-start">
                  <!-- Left Pane: Description -->
                  <div class="w-1/2 space-y-3 animate-in fade-in slide-in-from-left duration-700">
                    <div class="inline-flex items-center gap-3">
                      <div class="w-8 h-[1px] bg-primary"></div>
                      <span class="text-[10px] font-black text-primary tracking-[0.5em] uppercase">{{ link.label | translate }}</span>
                    </div>
                    <h3 class="text-8xl font-black text-secondary-900 leading-[0.8] tracking-tighter">{{ 'NAV.DROPDOWN.' + link.label.split('.')[1] + '.TITLE' | translate }}</h3>
                  </div>

                  <!-- Right Pane: Condensed Links List -->
                  <div class="flex-1 animate-in fade-in slide-in-from-right duration-700 delay-100">
                    <div class="grid grid-cols-1 gap-y-0 max-w-sm">
                      <ng-container *ngFor="let child of link.children">
                        <!-- Sub-header -->
                        <div *ngIf="child.isHeader" class="pt-2 pb-1 border-b border-gray-50 mb-1">
                          <span class="text-[10px] font-black text-gray-300 tracking-[0.2em] uppercase">{{ child.label | translate }}</span>
                        </div>
                        
                        <!-- Condensed Premium Link (Matching Header Font) -->
                        <a *ngIf="!child.isHeader"
                           [routerLink]="child.path"
                           class="group/link flex items-center justify-between gap-4 px-0 py-1.5 text-sm font-bold text-secondary-600 hover:text-primary tracking-[0.2em] transition-all duration-200 border-b border-transparent hover:border-primary/5">
                           <div class="flex items-center gap-2">
                             <mat-icon *ngIf="child.icon" class="text-xs opacity-30 group-hover/link:opacity-100 transition-opacity">{{child.icon}}</mat-icon>
                             <span>{{ child.label | translate }}</span>
                           </div>
                           <mat-icon class="text-[12px] w-3 h-3 flex items-center justify-center opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300">north_east</mat-icon>
                        </a>
                      </ng-container>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button mat-button class="px-5 py-2 font-black tracking-[0.2em] text-[10px] text-primary" (click)="portalClick.emit()">{{ 'COMMON.PORTAL' | translate }}</button>
        </div>

        <div class="flex items-center gap-2 ml-4">
          <ng-container *ngIf="user(); else guest">
            <app-user-menu></app-user-menu>
          </ng-container>

          <ng-template #guest>
            <div class="hidden md:flex items-center gap-2">
              <a mat-button matButton="tonal" routerLink="/auth/login">{{ 'COMMON.SIGN_IN' | translate }}</a>
              <a mat-flat-button class="rounded-xl font-bold" routerLink="/auth/register">{{ 'COMMON.GET_STARTED' | translate }}</a>
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
            <ng-container *ngFor="let link of navLinks">
              <a mat-menu-item [routerLink]="link.path" routerLinkActive="active-mobile" [routerLinkActiveOptions]="{exact: link.path === '/'}">{{ link.label | translate }}</a>
              <ng-container *ngIf="link.children">
                <a *ngFor="let child of link.children" 
                   mat-menu-item 
                   [routerLink]="child.path" 
                   class="pl-8 text-xs opacity-70">
                   {{ child.label | translate }}
                </a>
              </ng-container>
            </ng-container>
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
    }

    .active-mobile {
      background: rgba(249, 115, 22, 0.05) !important;
      color: var(--primary-color, #f97316) !important;
      border-left: 4px solid var(--primary-color, #f97316);
      font-weight: 800 !important;
    }

    .group:hover > div[style*="max-height: 0"] {
      max-height: 800px !important; /* Expansion height auto-limit */
      box-shadow: 0 40px 80px -20px rgba(0,0,0,0.08);
    }
  `]
})
export class MainHeaderComponent {
  isHidden = input<boolean>(false);
  user = input<any>(null);
  portalClick = output<void>();

  navLinks = [
    { label: 'NAV.HOME', path: '/' },
    { 
      label: 'NAV.ABOUT', 
      path: '/about',
      children: [
        { label: 'NAV.DROPDOWN.ABOUT.PROFILE', path: '/about', icon: 'person' },
        { label: 'NAV.DROPDOWN.ABOUT.EDUCATION', path: '/about', icon: 'school' },
        { label: 'NAV.DROPDOWN.ABOUT.EXPERIENCE', path: '/about', icon: 'work' },
        { label: 'NAV.DROPDOWN.ABOUT.CERTIFICATIONS', path: '/about', icon: 'verified' }
      ]
    },
    { 
      label: 'NAV.SERVICES', 
      path: '/services',
      children: [
        { label: 'NAV.DROPDOWN.SERVICES.SHOWCASE', isHeader: true },
        { label: 'NAV.DROPDOWN.SERVICES.SURGERIES', path: '/services', icon: 'biotech' },
        { label: 'NAV.DROPDOWN.SERVICES.GALLERY', path: '/services', icon: 'photo_library' },
        { label: 'NAV.DROPDOWN.SERVICES.TREATMENTS', isHeader: true },
        { label: 'NAV.DROPDOWN.SERVICES.KNEE', path: '/services', icon: 'rebase_edit' },
        { label: 'NAV.DROPDOWN.SERVICES.HIP', path: '/services', icon: 'accessibility_new' },
        { label: 'NAV.DROPDOWN.SERVICES.FRACTURE', path: '/services', icon: 'healing' },
        { label: 'NAV.DROPDOWN.SERVICES.ARTHROSCOPY', path: '/services', icon: 'visibility' },
        { label: 'NAV.DROPDOWN.SERVICES.SPINE', path: '/services', icon: 'accessibility' },
        { label: 'NAV.DROPDOWN.SERVICES.SPORTS', path: '/services', icon: 'sports_scores' }
      ]
    },
    { 
      label: 'NAV.APPOINTMENT', 
      path: '/appointment',
      children: [
        { label: 'NAV.DROPDOWN.APPOINTMENT.FORM', path: '/appointment', icon: 'event' },
        { label: 'NAV.DROPDOWN.APPOINTMENT.WHATSAPP', path: '/appointment', icon: 'chat' },
        { label: 'NAV.DROPDOWN.APPOINTMENT.INSTRUCTIONS', path: '/appointment', icon: 'description' }
      ]
    },
    { 
      label: 'NAV.BLOG', 
      path: '/blog',
      children: [
        { label: 'NAV.DROPDOWN.BLOG.ARTICLES', path: '/blog', icon: 'article' },
        { label: 'NAV.DROPDOWN.BLOG.TIPS', path: '/blog', icon: 'lightbulb' },
        { label: 'NAV.DROPDOWN.BLOG.CASES', path: '/blog', icon: 'biotech' }
      ]
    },
    { 
      label: 'NAV.CONTACT', 
      path: '/contact',
      // children: [
      //   { label: 'NAV.DROPDOWN.CONTACT.DETAILS', path: '/contact', icon: 'location_on' },
      //   { label: 'NAV.DROPDOWN.CONTACT.FORM', path: '/contact', icon: 'email' },
      //   { label: 'NAV.DROPDOWN.CONTACT.HOURS', path: '/contact', icon: 'schedule' }
      // ]
    }
  ];
}
