import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@core/pipes/translate.pipe';

export interface Hospital {
  name: string;
  city: string;
  image: string;
}

@Component({
  selector: 'app-home-partners',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TranslatePipe
  ],
  template: `
    <section class="py-32 bg-white relative overflow-hidden -mx-6 sm:-mx-10 lg:-mx-12">
      <div class="app-container relative z-10">
        <div class="text-center mb-20">
          <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">{{ 'HOME.PARTNERS.SUBTITLE' | translate }}</h2>
          <h3 class="text-5xl font-black text-secondary-900 tracking-tighter uppercase mb-6">{{ 'HOME.PARTNERS.TITLE' | translate }}</h3>
          <p class="text-lg text-secondary-500 max-w-2xl mx-auto font-medium leading-relaxed">
            {{ 'HOME.PARTNERS.DESCRIPTION' | translate }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          @for (h of hospitals(); track h.name) {
            <mat-card class="rounded-[32px] border border-gray-100 shadow-none overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div class="h-48 relative overflow-hidden">
                 <img [src]="h.image" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div class="p-6">
                 <h4 class="text-sm font-black text-secondary-900 uppercase tracking-tight mb-2">{{ h.name | translate }}</h4>
                 <div class="flex items-center gap-2 text-[9px] font-bold text-primary uppercase tracking-widest">
                    <mat-icon class="scale-50">location_on</mat-icon>
                    <span>{{ h.city | translate }}</span>
                 </div>
              </div>
            </mat-card>
          }
        </div>
        
        <div class="mt-20 text-center">
           <a mat-tonal-button color="primary" routerLink="/hospitals" class="h-14 px-10 rounded-xl font-bold uppercase tracking-widest text-[11px]">
              {{ 'HOME.PARTNERS.EXPLORE_ALL' | translate }}
           </a>
        </div>
      </div>
      <div class="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10"></div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class PartnersComponent {
  hospitals = input.required<Hospital[]>();
}
