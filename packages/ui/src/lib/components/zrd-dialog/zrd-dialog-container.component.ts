import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@angular/cdk/dialog';

export type ZrdDialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';

@Component({
  selector: 'zrd-dialog-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div [class]="classes" class="bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-secondary-100">
          <h3 class="text-lg font-semibold text-secondary-900">{{ title }}</h3>
          <button (click)="close.emit()" class="p-1.5 rounded-lg hover:bg-secondary-100 text-secondary-400 hover:text-secondary-600 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto px-6 py-5">
          <ng-content></ng-content>
        </div>

        <!-- Footer -->
        <div *ngIf="hasFooter" class="px-6 py-4 bg-secondary-50/50 border-t border-secondary-100 rounded-b-2xl flex justify-end gap-3">
          <ng-content select="[footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdDialogContainerComponent {
  @Input() title = '';
  @Input() size: ZrdDialogSize = 'md';
  @Input({ transform: booleanAttribute }) hasFooter = false;
  @Output() close = new EventEmitter<void>();

  get classes(): string {
    const sizes: Record<ZrdDialogSize, string> = {
      sm: 'w-full max-w-md',
      md: 'w-full max-w-lg',
      lg: 'w-full max-w-2xl',
      xl: 'w-full max-w-4xl',
      fullscreen: 'w-full h-full max-w-none rounded-none'
    };
    return sizes[this.size];
  }
}
