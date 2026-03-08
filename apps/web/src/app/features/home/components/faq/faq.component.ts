import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslatePipe } from '@core/pipes/translate.pipe';

export interface FAQ {
  qKey: string;
  aKey: string;
}

@Component({
  selector: 'app-home-faq',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    TranslatePipe
  ],
  template: `
    <section class="py-32 bg-white relative overflow-hidden -mx-6 sm:-mx-10 lg:-mx-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-20">
          <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">{{ 'HOME.FAQ.SUBTITLE' | translate }}</h2>
          <h3 class="text-5xl font-black text-secondary-900 tracking-tighter uppercase">{{ 'HOME.FAQ.TITLE' | translate }}</h3>
        </div>

        <mat-accordion class="premium-accordion">
           @for (faq of faqs(); track faq.qKey) {
             <mat-expansion-panel class="mb-4 rounded-2xl border-none shadow-none bg-gray-50">
               <mat-expansion-panel-header class="h-20 px-8">
                 <mat-panel-title class="text-sm font-black text-secondary-900 uppercase tracking-tight">
                   {{ faq.qKey | translate }}
                 </mat-panel-title>
               </mat-expansion-panel-header>
               <div class="px-8 pb-8">
                 <p class="text-secondary-600 text-sm leading-relaxed font-medium">{{ faq.aKey | translate }}</p>
               </div>
             </mat-expansion-panel>
           }
        </mat-accordion>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .premium-accordion ::ng-deep .mat-expansion-panel { border-radius: 20px !important; overflow: hidden; margin-bottom: 16px; border: 1px solid #f1f5f9; }
    .premium-accordion ::ng-deep .mat-expansion-panel-header { background: transparent !important; }
    .premium-accordion ::ng-deep .mat-content { align-items: center; }
  `]
})
export class FaqComponent {
  faqs = input.required<FAQ[]>();
}
