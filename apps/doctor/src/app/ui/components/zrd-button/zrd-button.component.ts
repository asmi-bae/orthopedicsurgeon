import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ZrdButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
export type ZrdButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'zrd-button, button[zrdButton], a[zrdButton]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="flex items-center justify-center gap-2">
      <ng-container *ngIf="loading">
        <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </ng-container>
      <ng-content select="[leftIcon]"></ng-content>
      <ng-content></ng-content>
      <ng-content select="[rightIcon]"></ng-content>
    </span>
  `,
  host: {
    '[class]': 'classes',
    '[attr.disabled]': '(disabled || loading) ? true : null',
    '[attr.aria-busy]': 'loading',
    '[attr.aria-disabled]': 'disabled || loading'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdButtonComponent {
  @Input() variant: ZrdButtonVariant = 'primary';
  @Input() size: ZrdButtonSize = 'md';
  @Input({ transform: booleanAttribute }) loading = false;
  @Input({ transform: booleanAttribute }) disabled = false;

  get classes(): string {
    const base = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants: Record<ZrdButtonVariant, string> = {
      primary: 'bg-google-blue text-white hover:bg-google-blue/90 focus:ring-google-blue/50 shadow-sm shadow-google-blue/20',
      secondary: 'bg-google-gray-100 text-google-gray-900 hover:bg-google-gray-200 dark:bg-white/5 dark:text-google-gray-100 dark:hover:bg-white/10 focus:ring-google-gray-500',
      outline: 'border border-google-gray-300 bg-transparent text-google-gray-800 hover:bg-google-gray-50 dark:border-white/20 dark:text-google-gray-300 dark:hover:bg-white/5 focus:ring-google-gray-500',
      ghost: 'bg-transparent text-google-gray-700 hover:bg-google-gray-100 dark:text-google-gray-400 dark:hover:bg-white/5 focus:ring-google-gray-500',
      danger: 'bg-google-red text-white hover:bg-google-red/90 focus:ring-google-red/50 shadow-sm shadow-google-red/20'
    };

    const sizes: Record<ZrdButtonSize, string> = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    };

    return `${base} ${variants[this.variant]} ${sizes[this.size]}`;
  }
}
