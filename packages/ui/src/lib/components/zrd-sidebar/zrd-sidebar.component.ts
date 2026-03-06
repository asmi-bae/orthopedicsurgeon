import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, booleanAttribute } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

export interface ZrdNavItem {
  label: string;
  icon?: string;
  route: string;
  badge?: string | number;
  children?: ZrdNavItem[];
  permissions?: string[];
}

@Component({
  selector: 'zrd-sidebar',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  template: `
    @if (isMobile && !collapsed) {
      <div 
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
        (click)="onToggle.emit()"
      ></div>
    }

    <aside 
      [class.w-72]="!collapsed || isMobile" 
      [class.w-20]="collapsed && !isMobile"
      [class.-translate-x-full]="isMobile && collapsed"
      [class.translate-x-0]="!isMobile || !collapsed"
      class="h-screen bg-google-gray-100 dark:bg-sidebar-dark flex flex-col fixed left-0 top-0 z-50 lg:translate-x-0"
    >
      <!-- Logo Area -->
      <div class="h-16 flex items-center px-4 gap-1"
           [class.justify-center]="collapsed">

        <!-- PNG Logo Icon (always visible) -->
        <img
          src="logo-orthopedic.png"
          alt="Orthopedic Logo"
          class="flex-shrink-0 object-contain"
          [class.w-12]="!collapsed"
          [class.h-12]="!collapsed"
          [class.w-11]="collapsed"
          [class.h-11]="collapsed"
        />

        <!-- Text: only when expanded -->
        @if (!collapsed) {
          <div class="flex flex-col overflow-hidden">
            <span class="font-black tracking-tighter leading-none uppercase text-base text-google-gray-900 dark:text-white truncate">Orthopedic</span>
            <span class="font-bold uppercase tracking-widest leading-none mt-0.5 text-xs text-google-red dark:text-google-red truncate">Surgeon</span>
          </div>
        }
      </div>

      <!-- Nav Items -->
      <nav class="flex-1 overflow-y-auto px-3 space-y-0 custom-scrollbar">
        @for (item of items; track item.route) {
          <div class="flex flex-col">
            <a 
              [routerLink]="item.route"
              (click)="isMobile && onToggle.emit()"
              routerLinkActive="bg-google-blue/10 text-google-blue active-nav"
              #rla="routerLinkActive"
              class="flex items-center py-2 rounded-full hover:bg-google-gray-200 dark:hover:bg-white/5 transition-all duration-200 group relative"
              [class.justify-center]="collapsed"
              [class.px-0]="collapsed"
              [class.gap-0]="collapsed"
              [class.gap-4]="!collapsed"
              [class.px-5]="!collapsed"
              [title]="collapsed ? item.label : ''"
            >
              <div 
                class="flex-shrink-0 transition-colors dark:group-hover:text-google-gray-300"
                [class.text-google-blue]="rla.isActive"
                [class.text-google-gray-600]="!rla.isActive"
              >
                @if (item.icon?.startsWith('mat-icon:')) {
                  <mat-icon class="text-xl">{{ (item.icon || '').split(':')[1] }}</mat-icon>
                } @else {
                  <i [class]="item.icon" class="text-xl"></i>
                }
              </div>
              
              @if (!collapsed) {
                <span class="text-sm font-medium whitespace-nowrap dark:text-google-gray-300 dark:group-hover:text-white">
                  {{ item.label }}
                </span>
              }
            </a>
          </div>
        }
      </nav>
    </aside>

    <!-- Content margin spacer -->
    <div [class.ml-72]="!collapsed" [class.ml-20]="collapsed" class="transition-all duration-300 hidden lg:block"></div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: theme('colors.google-gray.300'); border-radius: 10px; }
    .active-nav { font-weight: 500; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdSidebarComponent {
  @Input() items: ZrdNavItem[] = [];
  @Input({ transform: booleanAttribute }) collapsed = false;
  @Input({ transform: booleanAttribute }) isMobile = false;
  @Output() onToggle = new EventEmitter<void>();
}
