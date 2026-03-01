import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZrdDialogContainerComponent } from './zrd-dialog-container.component';
import { ZrdButtonComponent } from '../zrd-button/zrd-button.component';

@Component({
  selector: 'zrd-confirm-dialog',
  standalone: true,
  imports: [CommonModule, ZrdDialogContainerComponent, ZrdButtonComponent],
  template: `
    <zrd-dialog-container [title]="title" size="sm" (close)="cancel.emit()">
      <div class="flex flex-col items-center text-center py-2">
        <div class="p-3 rounded-full bg-red-50 text-red-600 mb-4">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p class="text-secondary-600 text-sm">{{ message }}</p>
      </div>

      <div footer class="flex justify-end gap-3 w-full">
        <button zrdButton variant="ghost" (click)="cancel.emit()">{{ cancelText }}</button>
        <button zrdButton variant="danger" (click)="confirm.emit()">{{ confirmText }}</button>
      </div>
    </zrd-dialog-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdConfirmDialogComponent {
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed?';
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
