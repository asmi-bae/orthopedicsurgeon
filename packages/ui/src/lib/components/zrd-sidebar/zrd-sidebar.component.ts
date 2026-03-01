import { ChangeDetectionStrategy, Component, Input, booleanAttribute, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  imports: [CommonModule, RouterModule],
  template: `
    <aside 
      [class.w-64]="!collapsed" 
      [class.w-20]="collapsed"
      class="h-screen bg-secondary-900 text-white transition-all duration-300 flex flex-col fixed left-0 top-0 z-40 border-r border-secondary-800"
    >
      <!-- Logo Area -->
      <div class="h-16 flex items-center px-6 border-b border-secondary-800">
         <div class="flex items-center gap-3">
           <div class="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center flex-shrink-0">
             <span class="font-bold text-white">O</span>
           </div>
           <span *ngIf="!collapsed" class="font-bold text-lg tracking-tight animate-in fade-in duration-300">ORTHO<span class="text-primary-400">SYNC</span></span>
         </div>
      </div>

      <!-- Nav Items -->
      <nav class="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
        <ng-container *ngFor="let item of items">
          <!-- Parent Item -->
          <div class="flex flex-col">
            <a 
              [routerLink]="item.route"
              routerLinkActive="bg-primary-600/10 text-primary-400"
              #rla="routerLinkActive"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative"
              [class.justify-center]="collapsed"
              [title]="collapsed ? item.label : ''"
            >
              <div 
                class="flex-shrink-0 transition-colors"
                [class.text-primary-400]="rla.isActive"
                [class.text-secondary-400]="!rla.isActive"
              >
                <i [class]="item.icon" class="text-lg"></i>
              </div>
              
              <span *ngIf="!collapsed" class="text-sm font-medium animate-in fade-in slide-in-from-left-2 duration-300">
                {{ item.label }}
              </span>

              <span *ngIf="item.badge && !collapsed" class="ml-auto bg-primary-600 text-[10px] px-1.5 py-0.5 rounded-full text-white font-bold">
                {{ item.badge }}
              </span>

              <!-- Active Indicator -->
              <div *ngIf="rla.isActive" class="absolute left-0 top-2 bottom-2 w-1 bg-primary-500 rounded-r-full"></div>
            </a>

            <!-- Submenu (if any and not collapsed) -->
            <div *ngIf="item.children && !collapsed" class="mt-1 ml-9 flex flex-col gap-1">
               <a 
                 *ngFor="let child of item.children"
                 [routerLink]="child.route"
                 routerLinkActive="text-primary-400"
                 class="text-[13px] py-1.5 text-secondary-400 hover:text-white transition-colors"
               >
                 {{ child.label }}
               </a>
            </div>
          </div>
        </ng-container>
      </nav>

      <!-- Footer / Toggle -->
      <div class="p-4 border-t border-secondary-800">
        <button 
          (click)="collapsed = !collapsed"
          class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-secondary-400 hover:bg-secondary-800 hover:text-white transition-all"
          [class.justify-center]="collapsed"
        >
          <div class="flex-shrink-0">
            <svg class="w-5 h-5 transition-transform duration-300" [class.rotate-180]="collapsed" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </div>
          <span *ngIf="!collapsed" class="text-sm font-medium">Collapse</span>
        </button>
      </div>
    </aside>

    <!-- Content margin spacer -->
    <div [class.ml-64]="!collapsed" [class.ml-20]="collapsed" class="transition-all duration-300"></div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdSidebarComponent {
  @Input() items: ZrdNavItem[] = [];
  @Input({ transform: booleanAttribute }) collapsed = false;
}
