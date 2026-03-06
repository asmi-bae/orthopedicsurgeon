import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ZrdCardVariant = 'default' | 'elevated' | 'outlined' | 'ghost';

@Component({
  selector: 'zrd-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="classes">
      <div *ngIf="hasHeader" class="px-6 py-4 border-b border-secondary-100">
        <ng-content select="[header]"></ng-content>
      </div>
      
      <div class="px-6 py-5">
        <ng-container *ngIf="loading; else content">
          <div class="space-y-3">
            <div class="h-4 bg-secondary-100 rounded animate-pulse w-3/4"></div>
            <div class="h-4 bg-secondary-100 rounded animate-pulse"></div>
            <div class="h-4 bg-secondary-100 rounded animate-pulse w-5/6"></div>
          </div>
        </ng-container>
        <ng-template #content>
          <ng-content></ng-content>
        </ng-template>
      </div>

      <div *ngIf="hasFooter" class="px-6 py-4 bg-secondary-50/50 border-t border-secondary-100">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
  host: {
    '[class.block]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdCardComponent {
  @Input() variant: ZrdCardVariant = 'default';
  @Input({ transform: booleanAttribute }) loading = false;
  @Input({ transform: booleanAttribute }) hasHeader = false;
  @Input({ transform: booleanAttribute }) hasFooter = false;

  get classes(): string {
    const base = 'overflow-hidden rounded-md transition-all duration-300 bg-white dark:bg-surface-dark';
    
    const variants: Record<ZrdCardVariant, string> = {
      default: 'border border-google-gray-200 dark:border-white/10 shadow-sm',
      elevated: 'border border-google-gray-100 dark:border-white/5 shadow-google',
      outlined: 'border-2 border-google-gray-200 dark:border-white/20',
      ghost: 'bg-transparent border-none shadow-none'
    };

    return `${base} ${variants[this.variant]}`;
  }
}
