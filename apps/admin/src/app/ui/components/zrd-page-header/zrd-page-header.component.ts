import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface ZrdBreadcrumb {
  label: string;
  route?: string;
}

@Component({
  selector: 'zrd-page-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="mb-8 flex flex-col gap-4">
      <!-- Breadcrumbs -->
      <nav *ngIf="breadcrumbs.length > 0" class="flex items-center text-sm text-secondary-400 font-medium">
        <ng-container *ngFor="let crumb of breadcrumbs; let last = last">
          <a *ngIf="crumb.route; else textOnly" [routerLink]="crumb.route" class="hover:text-primary-600 transition-colors">
            {{ crumb.label }}
          </a>
          <ng-template #textOnly>
            <span class="text-secondary-500">{{ crumb.label }}</span>
          </ng-template>
          
          <svg *ngIf="!last" class="w-4 h-4 mx-2 text-secondary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </ng-container>
      </nav>

      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <button 
            *ngIf="showBackButton"
            (click)="onBack()"
            class="p-2 rounded-lg bg-white border border-secondary-200 text-secondary-600 hover:bg-secondary-50 transition-all hover:shadow-sm"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-secondary-900 tracking-tight">{{ title }}</h1>
            <p *ngIf="subtitle" class="text-secondary-500 text-sm md:text-base mt-1">{{ subtitle }}</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <ng-content select="[actions]"></ng-content>
        </div>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdPageHeaderComponent {
  @Input({ required: true }) title = '';
  @Input() subtitle?: string;
  @Input() breadcrumbs: ZrdBreadcrumb[] = [];
  @Input({ transform: booleanAttribute }) showBackButton = false;

  onBack() {
    window.history.back();
  }
}
