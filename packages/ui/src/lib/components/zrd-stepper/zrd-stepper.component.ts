import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ZrdStep {
  label: string;
  description?: string;
  icon?: string;
}

@Component({
  selector: 'zrd-stepper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-start w-full">
      <ng-container *ngFor="let step of steps; let i = index; let last = last">
        <!-- Step Item -->
        <div class="flex-1 flex flex-col items-center">
          <div class="relative flex items-center justify-center">
            <!-- Connector Line (Before) -->
            <div *ngIf="i > 0" 
                 class="absolute right-1/2 w-full h-[2px] -translate-y-1/2 top-5"
                 [class]="i <= currentStep ? 'bg-primary-600' : 'bg-secondary-200'"
            ></div>
            
            <!-- Step Circle -->
            <div 
              class="z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ring-4 ring-white"
              [class]="getStepClasses(i)"
            >
              <ng-container *ngIf="i < currentStep; else stepNum">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </ng-container>
              <ng-template #stepNum>{{ i + 1 }}</ng-template>
            </div>
          </div>

          <!-- Labels -->
          <div class="mt-3 text-center px-2">
            <p class="text-sm font-bold transition-colors duration-300" 
               [class]="i <= currentStep ? 'text-secondary-900' : 'text-secondary-400'">
              {{ step.label }}
            </p>
            <p *ngIf="step.description && !collapsed" 
               class="text-[11px] text-secondary-500 mt-0.5 line-clamp-1">
              {{ step.description }}
            </p>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdStepperComponent {
  @Input() steps: ZrdStep[] = [];
  @Input() currentStep = 0;
  @Input() collapsed = false;

  getStepClasses(index: number): string {
    if (index < this.currentStep) {
      return 'bg-primary-600 text-white';
    } else if (index === this.currentStep) {
      return 'bg-primary-50 text-primary-600 border-2 border-primary-600';
    } else {
      return 'bg-white text-secondary-400 border-2 border-secondary-200';
    }
  }
}
