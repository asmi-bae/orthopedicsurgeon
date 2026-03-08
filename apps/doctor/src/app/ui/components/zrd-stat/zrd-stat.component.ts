import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'zrd-stat',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl border border-secondary-200">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-secondary-500">{{ label }}</span>
        <div *ngIf="icon" class="p-2 bg-primary-50 text-primary-600 rounded-lg">
          <ng-content select="[icon]"></ng-content>
        </div>
      </div>
      
      <div class="flex items-baseline gap-2">
        <h3 class="text-2xl font-bold text-secondary-900">
          <ng-container *ngIf="loading; else valueTpl">
            <div class="h-8 w-24 bg-secondary-100 animate-pulse rounded"></div>
          </ng-container>
          <ng-template #valueTpl>{{ value }}</ng-template>
        </h3>
        
        <div *ngIf="change !== undefined" class="flex items-center text-xs font-medium" [class]="change >= 0 ? 'text-green-600' : 'text-red-600'">
          <svg *ngIf="change >= 0" class="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <svg *ngIf="change < 0" class="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          {{ change >= 0 ? '+' : '' }}{{ change }}%
        </div>
      </div>
      
      <p *ngIf="description" class="mt-1 text-xs text-secondary-400">{{ description }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdStatComponent {
  @Input() label = '';
  @Input() value: string | number = '';
  @Input() change?: number;
  @Input() description?: string;
  @Input({ transform: booleanAttribute }) loading = false;
  @Input({ transform: booleanAttribute }) icon = false;
}
