import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, booleanAttribute, OnInit, inject } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { filter } from 'rxjs/operators';

export interface ZrdNavItem {
  label: string;
  icon?: string;
  route?: string;
  badge?: string | number;
  children?: ZrdNavItem[];
  permissions?: string[];
  isHeader?: boolean;
}

@Component({
  selector: 'zrd-sidebar',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ],
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
      class="h-screen bg-google-gray-50 dark:bg-sidebar-dark flex flex-col fixed left-0 top-0 z-50 lg:translate-x-0 transition-transform duration-300 ease-in-out"
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
      <nav class="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar pb-6">
        @for (item of items; track item.label) {
          <div class="flex flex-col">
            @if (item.isHeader) {
              @if (!collapsed) {
                <div class="px-5 pt-5 pb-2 text-[11px] font-bold uppercase tracking-wider text-google-gray-500 dark:text-google-gray-400">
                  {{ item.label }}
                </div>
              } @else {
                <div class="h-px bg-google-gray-200 dark:bg-white/10 my-4 mx-4"></div>
              }
            } @else {
              <!-- Parent Item -->
              <div class="flex flex-col">
                <a 
                  [routerLink]="item.children ? null : item.route"
                  (click)="item.children ? toggleItem(item) : (isMobile && onToggle.emit())"
                  [routerLinkActive]="!item.children ? 'bg-google-blue/10 text-google-blue active-nav' : ''"
                  #rla="routerLinkActive"
                  class="flex items-center py-2 rounded-full hover:bg-google-gray-200 dark:hover:bg-white/5 transition-all duration-200 group relative cursor-pointer"
                  [class.justify-center]="collapsed"
                  [class.px-0]="collapsed"
                  [class.gap-0]="collapsed"
                  [class.gap-4]="!collapsed"
                  [class.px-5]="!collapsed"
                  [title]="collapsed ? item.label : ''"
                >
                  <div 
                    class="flex-shrink-0 transition-colors"
                    [class.text-google-blue]="rla.isActive || isChildActive(item)"
                    [class.text-google-gray-900]="!rla.isActive && !isChildActive(item)"
                    [class.dark:text-google-gray-100]="!rla.isActive && !isChildActive(item)"
                  >
                    @if (item.icon?.startsWith('mat-icon:')) {
                      <mat-icon class="text-xl">{{ (item.icon || '').split(':')[1] }}</mat-icon>
                    } @else if (item.icon) {
                      <i [class]="item.icon" class="text-xl"></i>
                    }
                  </div>
                  
                  @if (!collapsed) {
                    <span class="text-sm font-semibold whitespace-nowrap flex-1"
                          [class.text-google-blue]="isChildActive(item)"
                          [class.text-google-gray-900]="!isChildActive(item)"
                          [class.dark:text-google-gray-100]="!isChildActive(item)"
                          [class.dark:group-hover:text-white]="!isChildActive(item)">
                      {{ item.label }}
                    </span>
                    
                    @if (item.children) {
                      <mat-icon class="text-lg text-google-gray-400">
                        {{ isExpanded(item) ? 'expand_less' : 'expand_more' }}
                      </mat-icon>
                    }
                  }
                </a>

                <!-- Children -->
                @if (item.children && !collapsed) {
                  <div class="flex flex-col ml-9 space-y-1 overflow-hidden"
                       [@expandCollapse]="isExpanded(item) ? 'expanded' : 'collapsed'">
                    <div class="pt-1 pb-2">
                       @for (child of item.children; track child.label) {
                        <a 
                          [routerLink]="child.route"
                          (click)="isMobile && onToggle.emit()"
                          routerLinkActive="bg-google-blue/5 text-google-blue active-nav"
                          #rlaChild="routerLinkActive"
                          class="flex items-center py-1.5 px-3 rounded-full hover:bg-google-gray-200 dark:hover:bg-white/5 transition-all duration-200 text-sm group/child"
                          [class.text-google-blue]="rlaChild.isActive"
                          [class.text-google-gray-800]="!rlaChild.isActive"
                          [class.dark:text-google-gray-200]="!rlaChild.isActive"
                        >
                          @if (child.icon) {
                            <div class="mr-3 flex items-center justify-center">
                              @if (child.icon.startsWith('mat-icon:')) {
                                <mat-icon class="text-lg">{{ child.icon.split(':')[1] }}</mat-icon>
                              } @else {
                                <i [class]="child.icon" class="text-lg"></i>
                              }
                            </div>
                          }
                          <span class="whitespace-nowrap flex-1 truncate dark:group-hover/child:text-white font-medium"
                                [class.text-google-gray-800]="!rlaChild.isActive"
                                [class.dark:text-google-gray-200]="!rlaChild.isActive">
                            {{ child.label }}
                          </span>
                        </a>
                      }
                    </div>
                  </div>
                }
              </div>
            }
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
export class ZrdSidebarComponent implements OnInit {
  @Input() items: ZrdNavItem[] = [];
  @Input({ transform: booleanAttribute }) collapsed = false;
  @Input({ transform: booleanAttribute }) isMobile = false;
  @Output() onToggle = new EventEmitter<void>();

  private router = inject(Router);
  expandedItems = new Set<string>();

  ngOnInit() {
    this.checkActiveState();
    
    // Also check on navigation end
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkActiveState();
    });
  }

  private checkActiveState() {
    const currentUrl = this.router.url;
    this.items.forEach(item => {
      if (item.children && item.children.some(child => child.route && currentUrl.includes(child.route))) {
        this.expandedItems.add(item.label);
      }
    });
  }

  toggleItem(item: ZrdNavItem) {
    if (this.expandedItems.has(item.label)) {
      this.expandedItems.delete(item.label);
    } else {
      this.expandedItems.add(item.label);
    }
  }

  isExpanded(item: ZrdNavItem): boolean {
    return this.expandedItems.has(item.label);
  }

  isChildActive(item: ZrdNavItem): boolean {
    if (!item.children) return false;
    const currentUrl = this.router.url;
    return item.children.some(child => child.route && currentUrl.includes(child.route));
  }
}
