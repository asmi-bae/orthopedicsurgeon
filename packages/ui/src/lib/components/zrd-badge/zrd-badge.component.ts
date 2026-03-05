import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ZrdBadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'neutral';
export type ZrdBadgeSize = 'sm' | 'md';

@Component({
  selector: 'zrd-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="classes">
      <span *ngIf="dot" class="w-1.5 h-1.5 rounded-full mr-1.5" [class]="dotClasses"></span>
      <ng-content></ng-content>
      <button 
        *ngIf="removable" 
        (click)="remove.emit()" 
        class="ml-1.5 hover:opacity-70 focus:outline-none"
        aria-label="Remove"
      >
        <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdBadgeComponent {
  @Input() variant: ZrdBadgeVariant = 'default';
  @Input() size: ZrdBadgeSize = 'sm';
  @Input({ transform: booleanAttribute }) dot = false;
  @Input({ transform: booleanAttribute }) removable = false;
  
  @Output() remove = new EventEmitter<void>();

  get classes(): string {
    const base = 'inline-flex items-center font-medium rounded-full transition-colors';
    
    const variants: Record<ZrdBadgeVariant, string> = {
      default: 'bg-google-gray-100 text-google-gray-700 dark:bg-white/10 dark:text-google-gray-300',
      success: 'bg-google-green/10 text-google-green border border-google-green/20 dark:bg-google-green/20',
      warning: 'bg-google-amber/10 text-google-amber border border-google-amber/20 dark:bg-google-amber/20',
      danger: 'bg-google-red/10 text-google-red border border-google-red/20 dark:bg-google-red/20',
      info: 'bg-google-blue/10 text-google-blue border border-google-blue/20 dark:bg-google-blue/20',
      neutral: 'bg-google-gray-100 text-google-gray-600 dark:bg-white/5 dark:text-google-gray-400'
    } as any;

    const sizes: Record<ZrdBadgeSize, string> = {
      sm: 'px-2 py-0.5 text-[11px]',
      md: 'px-2.5 py-1 text-xs'
    };

    return `${base} ${variants[this.variant]} ${sizes[this.size]}`;
  }

  get dotClasses(): string {
    const dots: Record<ZrdBadgeVariant, string> = {
      default: 'bg-secondary-400',
      success: 'bg-green-500',
      warning: 'bg-amber-500',
      danger: 'bg-red-500',
      info: 'bg-primary-500',
      outline: 'bg-secondary-400',
      neutral: 'bg-google-gray-400'
    };
    return dots[this.variant];
  }
}
