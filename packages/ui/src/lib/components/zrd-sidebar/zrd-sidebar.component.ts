import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, booleanAttribute } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

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
  imports: [RouterModule, MatIcon],
  template: `
    <aside 
      [class.w-72]="!collapsed" 
      [class.w-20]="collapsed"
      class="h-screen bg-google-gray-50 dark:bg-sidebar-dark transition-all duration-300 flex flex-col fixed left-0 top-0 z-40"
    >
      <!-- Logo Area -->
      <div class="h-16 flex items-center px-3 mb-4 gap-3">
        @if (!collapsed) {
          <div class="flex items-center gap-2 overflow-hidden">
            <!-- Menu toggle button — same position as logo, always visible in sidebar -->
            <button
              (click)="onToggle.emit()"
              class="p-2 h-10 w-10 flex items-center justify-center rounded-full hover:bg-google-gray-100 dark:hover:bg-white/5 transition-colors flex-shrink-0"
            >
              <mat-icon class="text-google-gray-600 dark:text-google-gray-400">menu</mat-icon>
            </button>

            <span class="font-medium text-lg text-google-gray-900 dark:text-white truncate">Orthopedic Admin</span>
          </div>
        }
      </div>

      <!-- Nav Items -->
      <nav class="flex-1 overflow-y-auto px-3 space-y-0 custom-scrollbar">
        @for (item of items; track item.route) {
          <div class="flex flex-col">
            <a 
              [routerLink]="item.route"
              routerLinkActive="bg-google-blue/10 text-google-blue active-nav"
              #rla="routerLinkActive"
              class="flex items-center gap-4 py-2 rounded-full hover:bg-google-gray-100 dark:hover:bg-white/5 transition-all duration-200 group relative"
              [class.px-3.5]="collapsed"
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
  @Output() onToggle = new EventEmitter<void>();
}
