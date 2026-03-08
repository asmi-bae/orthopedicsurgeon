import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@core/pipes/translate.pipe';

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

@Component({
  selector: 'app-home-testimonials',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    TranslatePipe
  ],
  template: `
    <section class="py-32 bg-gray-50 relative overflow-hidden -mx-6 sm:-mx-10 lg:-mx-12">
      <!-- Top/Bottom Soft Transitions -->
      <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10"></div>
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
      
      <div class="app-container relative z-20">
        <div class="text-center mb-20">
          <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">{{ 'HOME.TESTIMONIALS.SUBTITLE' | translate }}</h2>
          <h3 class="text-5xl font-black text-secondary-900 tracking-tighter uppercase">{{ 'HOME.TESTIMONIALS.TITLE' | translate }}</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (t of testimonials(); track t.name) {
            <mat-card class="p-8 rounded-[32px] bg-white border border-gray-100 shadow-none">
              <div class="flex items-center gap-4 mb-8">
                <img [src]="t.avatar" class="w-12 h-12 rounded-full border-2 border-primary/30" />
                <div>
                  <p class="text-sm font-black text-secondary-900 uppercase tracking-tight">{{ t.name | translate }}</p>
                  <p class="text-[10px] font-bold text-primary uppercase tracking-widest">{{ t.role | translate }}</p>
                </div>
              </div>
              <p class="text-secondary-600 text-sm leading-relaxed font-medium">"{{ t.content | translate }}"</p>
              <div class="mt-8 flex gap-1 text-primary">
                @for (i of [1,2,3,4,5]; track i) {
                  <mat-icon class="text-sm">star</mat-icon>
                }
              </div>
            </mat-card>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class TestimonialsComponent {
  testimonials = input.required<Testimonial[]>();
}
