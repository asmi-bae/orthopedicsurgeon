import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ZrdCardVariant = 'default' | 'elevated' | 'outlined' | 'ghost';

@Component({
  selector: 'zrd-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="classes">
      <div *ngIf="hasHeader" class="px-4 py-4 sm:px-6">
        <ng-content select="[header]"></ng-content>
      </div>
      
      <div class="px-4 py-5 sm:p-6">
        <ng-container *ngIf="loading; else content">
          <div class="space-y-3 animate-pulse">
            <div class="h-4 bg-google-gray-200 dark:bg-white/10 rounded w-3/4"></div>
            <div class="h-4 bg-google-gray-200 dark:bg-white/10 rounded w-full"></div>
            <div class="h-4 bg-google-gray-200 dark:bg-white/10 rounded w-5/6"></div>
          </div>
        </ng-container>
        <ng-template #content>
          <ng-content></ng-content>
        </ng-template>
      </div>

      <div *ngIf="hasFooter" class="px-4 py-4 sm:px-6 bg-google-gray-50/50 dark:bg-white/5">
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
    const base = 'block bg-white dark:bg-[#1f1f1f] rounded-md overflow-hidden';
    
    const variants: Record<ZrdCardVariant, string> = {
      default: 'border border-google-gray-200 dark:border-white/10 shadow-sm',
      elevated: 'shadow-google dark:border dark:border-white/10 dark:shadow-none',
      outlined: 'border border-google-gray-300 dark:border-white/20',
      ghost: 'bg-transparent border-none shadow-none'
    };

    return `${base} ${variants[this.variant]}`;
  }
}
