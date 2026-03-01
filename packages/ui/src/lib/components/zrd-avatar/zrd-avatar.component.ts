import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ZrdAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'zrd-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-flex items-center justify-center" [class]="sizeClasses">
      <ng-container *ngIf="src && !imageError(); else fallback">
        <img 
          [src]="src" 
          [alt]="name" 
          class="rounded-full object-cover w-full h-full border border-secondary-100" 
          (error)="imageError.set(true)"
        />
      </ng-container>
      
      <ng-template #fallback>
        <div class="w-full h-full rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold" [class]="initialsSizeClass">
          {{ initials }}
        </div>
      </ng-template>

      <span 
        *ngIf="status" 
        class="absolute border-2 border-white rounded-full"
        [class]="statusClasses"
      ></span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdAvatarComponent {
  @Input() src?: string;
  @Input() name = '';
  @Input() size: ZrdAvatarSize = 'md';
  @Input() status?: 'online' | 'offline' | 'busy' | 'away';

  imageError = signal(false);

  get initials(): string {
    if (!this.name) return '';
    return this.name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  get sizeClasses(): string {
    const sizes: Record<ZrdAvatarSize, string> = {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16'
    };
    return sizes[this.size];
  }

  get initialsSizeClass(): string {
    const sizes: Record<ZrdAvatarSize, string> = {
      xs: 'text-[10px]',
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-xl'
    };
    return sizes[this.size];
  }

  get statusClasses(): string {
    const statusColors = {
      online: 'bg-green-500',
      offline: 'bg-secondary-400',
      busy: 'bg-red-500',
      away: 'bg-amber-500'
    };

    const statusSizes: Record<ZrdAvatarSize, string> = {
      xs: 'w-2 h-2 bottom-0 right-0',
      sm: 'w-2.5 h-2.5 bottom-0 right-0',
      md: 'w-3 h-3 bottom-0 right-0',
      lg: 'w-3.5 h-3.5 bottom-0 right-0.5',
      xl: 'w-4 h-4 bottom-0.5 right-1'
    };

    return `${statusColors[this.status || 'offline']} ${statusSizes[this.size]}`;
  }
}
