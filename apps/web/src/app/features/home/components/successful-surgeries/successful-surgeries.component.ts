import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@core/pipes/translate.pipe';

export interface CaseStudy {
  title: string;
  desc: string;
  tag: string;
  image: string;
}

@Component({
  selector: 'app-home-surgeries',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, TranslatePipe],
  template: `
    <section class="py-32 bg-secondary-900 overflow-hidden -mx-6 sm:-mx-10 lg:-mx-12 px-6 sm:px-10 lg:px-12 relative">
      <!-- Decorative Blobs -->
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-medical-teal/10 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div class="app-container relative z-10">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div class="max-w-2xl">
            <h3 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">{{ 'HOME.SUCCESSFUL_SURGERIES.SUBTITLE' | translate }}</h3>
            <h4 class="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mb-6">
              {{ 'HOME.SUCCESSFUL_SURGERIES.TITLE' | translate }}
            </h4>
            <p class="text-lg text-white/60 font-medium leading-relaxed">
              {{ 'HOME.SUCCESSFUL_SURGERIES.DESCRIPTION' | translate }}
            </p>
          </div>
          <button mat-stroked-button color="primary" class="h-14 px-8 rounded-xl font-bold uppercase tracking-widest text-white border-white/20 hover:bg-white/5 transition-all">
            {{ 'HOME.SUCCESSFUL_SURGERIES.VIEW_ALL' | translate }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <!-- Case 1 -->
          <mat-card class="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden group hover:border-primary/40 transition-all duration-700">
            <div class="grid grid-cols-1 lg:grid-cols-2 h-full">
              <div class="relative h-64 lg:h-full overflow-hidden min-h-[300px]">
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118" class="absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
              </div>
              <div class="p-10 flex flex-col justify-center">
                <span class="text-[10px] font-black text-primary uppercase tracking-widest mb-4 block">{{ 'HOME.SUCCESSFUL_SURGERIES.CASE1.TAG' | translate }}</span>
                <h5 class="text-xl font-black text-white uppercase tracking-tight mb-4">{{ 'HOME.SUCCESSFUL_SURGERIES.CASE1.TITLE' | translate }}</h5>
                <p class="text-white/50 text-sm font-medium leading-relaxed">{{ 'HOME.SUCCESSFUL_SURGERIES.CASE1.DESC' | translate }}</p>
              </div>
            </div>
          </mat-card>

          <!-- Case 2 -->
          <mat-card class="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden group hover:border-primary/40 transition-all duration-700">
            <div class="grid grid-cols-1 lg:grid-cols-2 h-full">
              <div class="relative h-64 lg:h-full overflow-hidden min-h-[300px]">
                <img src="https://images.unsplash.com/photo-1584515933487-779824d29309" class="absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
              </div>
              <div class="p-10 flex flex-col justify-center">
                <span class="text-[10px] font-black text-primary uppercase tracking-widest mb-4 block">{{ 'HOME.SUCCESSFUL_SURGERIES.CASE2.TAG' | translate }}</span>
                <h5 class="text-xl font-black text-white uppercase tracking-tight mb-4">{{ 'HOME.SUCCESSFUL_SURGERIES.CASE2.TITLE' | translate }}</h5>
                <p class="text-white/50 text-sm font-medium leading-relaxed">{{ 'HOME.SUCCESSFUL_SURGERIES.CASE2.DESC' | translate }}</p>
              </div>
            </div>
          </mat-card>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class SuccessfulSurgeriesComponent {}
