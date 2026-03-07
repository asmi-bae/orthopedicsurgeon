import { ChangeDetectionStrategy, Component, Input, booleanAttribute, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ZrdDropdownItem {
  label: string;
  icon?: string;
  action: () => void;
  danger?: boolean;
}

@Component({
  selector: 'zrd-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block text-left">
      <div (click)="toggle()">
        <ng-content select="[trigger]"></ng-content>
      </div>

      <div 
        *ngIf="isOpen()" 
        class="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-2xl ring-1 ring-secondary-200 divide-y divide-secondary-100 focus:outline-none z-50 animate-in fade-in zoom-in-95 duration-200"
      >
        <div class="py-1">
          <button
            *ngFor="let item of items"
            (click)="handleAction(item)"
            class="group flex items-center w-full px-4 py-2.5 text-sm transition-colors"
            [class]="item.danger ? 'text-red-600 hover:bg-red-50' : 'text-secondary-700 hover:bg-secondary-50 hover:text-secondary-900'"
          >
            <i *ngIf="item.icon" [class]="item.icon" class="mr-3 text-secondary-400 group-hover:text-inherit"></i>
            {{ item.label }}
          </button>
        </div>
      </div>

      <!-- Backdrop for closing -->
      <div *ngIf="isOpen()" (click)="close()" class="fixed inset-0 z-40 bg-transparent"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdDropdownComponent {
  @Input() items: ZrdDropdownItem[] = [];
  
  isOpen = signal(false);

  toggle() {
    this.isOpen.update(v => !v);
  }

  close() {
    this.isOpen.set(false);
  }

  handleAction(item: ZrdDropdownItem) {
    item.action();
    this.close();
  }
}
