import { Component, EventEmitter, Output, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '@core/services/theme.service';
import { AdminUserMenuComponent } from './user-menu.component';
import { NotificationMenuComponent } from './notification-menu.component';
import { AdminBreadcrumbComponent } from './admin-breadcrumb.component';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    AdminUserMenuComponent,
    NotificationMenuComponent,
    AdminBreadcrumbComponent
  ],
  template: `
    <header class="h-16 flex items-center justify-between px-6 shrink-0 z-20 bg-google-gray-100 dark:bg-sidebar-dark sticky top-0 border-b border-google-gray-200 dark:border-white/5">
      
      <!-- Left: Logo & Breadcrumbs (Hidden on Mobile when Search is Expanded) -->
      <div 
        class="flex items-center gap-4 transition-all duration-300 shrink-0" 
      >
         <button (click)="toggleSidebar.emit()" class="p-2 h-10 w-10 flex items-center justify-center rounded-full hover:bg-google-gray-200 dark:hover:bg-white/10 transition-colors">
           <mat-icon class="text-google-gray-600 dark:text-google-gray-400">menu</mat-icon>
         </button>
         
         <app-admin-breadcrumb class="hidden md:block"></app-admin-breadcrumb>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2 flex-1 justify-end min-w-0">
        
        <!-- Search Overlay Container -->
        <div class="transition-all duration-300 ease-in-out flex items-center" 
             [class.absolute]="isSearchExpanded"
             [class.inset-0]="isSearchExpanded"
             [class.z-30]="isSearchExpanded"
             [class.bg-google-gray-100]="isSearchExpanded"
             [class.dark:bg-sidebar-dark]="isSearchExpanded"
             [class.px-6]="isSearchExpanded"
             
             [class.lg:relative]="true"
             [class.lg:inset-auto]="true"
             [class.lg:z-auto]="true"
             [class.lg:bg-transparent]="true"
             [class.lg:p-0]="true"
             
             [class.w-full]="isSearchExpanded"
             [class.lg:w-[400px]]="isSearchExpanded"
             [class.w-10]="!isSearchExpanded">
          
          <button 
            (click)="toggleSearch()"
            class="z-10 h-10 w-10 flex items-center justify-center rounded-full hover:bg-google-gray-200 dark:hover:bg-white/10 transition-colors shrink-0"
            [class.bg-transparent]="!isSearchExpanded"
            [class.absolute]="isSearchExpanded"
            [class.left-6]="isSearchExpanded"
            [class.lg:left-0]="isSearchExpanded">
            <mat-icon [class.text-google-blue]="isSearchExpanded" class="text-google-gray-600 dark:text-google-gray-400 transition-colors">search</mat-icon>
          </button>

          <input 
            #searchInput
            type="text" 
            placeholder="Search resources, patients..." 
            class="w-full bg-google-gray-200 dark:bg-white/5 border-none rounded-full py-2.5 text-sm transition-all duration-300 outline-none"
            [class.opacity-0]="!isSearchExpanded"
            [class.pl-12]="isSearchExpanded"
            [class.pr-12]="isSearchExpanded"
            [class.lg:pr-4]="isSearchExpanded"
            [class.w-0]="!isSearchExpanded"
            [class.pointer-events-none]="!isSearchExpanded"
            (blur)="onSearchBlur()"
          />

          @if (isSearchExpanded) {
            <button 
              (click)="isSearchExpanded = false"
              class="absolute right-6 h-10 w-10 flex items-center justify-center rounded-full hover:bg-google-gray-200 dark:hover:bg-white/10 transition-colors shrink-0 lg:hidden"
            >
              <mat-icon class="text-google-gray-600 dark:text-google-gray-400">close</mat-icon>
            </button>
          }
        </div>

        <!-- Notification & User Actions (Hidden when Search is Expanded on Mobile) -->
        <div class="flex items-center gap-2 transition-all duration-300 shrink-0">
          <button (click)="themeService.toggleTheme()" 
                  class="h-10 w-10 flex items-center justify-center rounded-full hover:bg-google-gray-100 dark:hover:bg-white/5 text-google-gray-600 dark:text-google-gray-400 transition-all"
                  matTooltip="Toggle theme">
            <mat-icon>{{ themeService.isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>

          <app-admin-notification-menu></app-admin-notification-menu>

          <div class="w-px h-6 bg-google-gray-200 dark:bg-white/10 mx-2"></div>

          <div class="flex items-center gap-2">
            <app-admin-user-menu></app-admin-user-menu>
          </div>
        </div>
      </div>
    </header>
  `
})
export class AdminHeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  
  themeService = inject(ThemeService);
  isSearchExpanded = false;

  toggleSearch() {
    this.isSearchExpanded = !this.isSearchExpanded;
    if (this.isSearchExpanded) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 300);
    }
  }

  onSearchBlur() {
    if (this.searchInput.nativeElement && !this.searchInput.nativeElement.value) {
      this.isSearchExpanded = false;
    }
  }
}
