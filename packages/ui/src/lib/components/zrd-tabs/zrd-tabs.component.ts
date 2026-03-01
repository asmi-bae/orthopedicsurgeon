import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ZrdTab {
  label: string;
  id: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'zrd-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="containerClasses">
      <!-- Tab List -->
      <div 
        class="flex gap-2 border-b border-secondary-200 p-1 bg-secondary-50/50 rounded-t-xl"
        [class.flex-col]="vertical"
        role="tablist"
      >
        <button
          *ngFor="let tab of tabs"
          [id]="'tab-' + tab.id"
          role="tab"
          [attr.aria-selected]="activeTabId === tab.id"
          [disabled]="tab.disabled"
          (click)="selectTab(tab.id)"
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
          [class]="getTabClasses(tab)"
        >
          <i *ngIf="tab.icon" [class]="tab.icon"></i>
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab Content -->
      <div class="p-6 bg-white border border-t-0 border-secondary-200 rounded-b-xl shadow-sm">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdTabsComponent {
  @Input() tabs: ZrdTab[] = [];
  @Input() activeTabId = '';
  @Input() vertical = false;
  
  @Output() tabChange = new EventEmitter<string>();

  get containerClasses(): string {
    return this.vertical ? 'flex gap-4' : 'flex flex-col';
  }

  getTabClasses(tab: ZrdTab): string {
    if (this.activeTabId === tab.id) {
      return 'bg-white text-primary-600 shadow-sm ring-1 ring-secondary-200';
    }
    return tab.disabled 
      ? 'opacity-40 cursor-not-allowed' 
      : 'text-secondary-500 hover:text-secondary-900 hover:bg-white/50';
  }

  selectTab(id: string) {
    this.activeTabId = id;
    this.tabChange.emit(id);
  }
}
