import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@core/pipes/translate.pipe';

export interface Service {
  title: string;
  description: string;
  icon: string;
  image?: string;
}

@Component({
  selector: 'app-home-services',
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
       <div class="app-container relative z-20">
        <div class="text-center mb-20 text-balance">
          <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">{{ 'HOME.SERVICES.SUBTITLE' | translate }}</h2>
          <h3 class="text-5xl font-black text-secondary-900 tracking-tighter uppercase">{{ 'HOME.SERVICES.TITLE' | translate }}</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (service of services(); track service.title) {
            <mat-card class="rounded-[40px] border border-gray-100 shadow-none hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-gray-50/50 overflow-hidden group">
              <!-- Image Header -->
              <div *ngIf="service.image" class="aspect-[4/3] overflow-hidden relative">
                <img [src]="service.image" [alt]="service.title | translate" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
              </div>

              <div class="p-8">
                <div class="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <mat-icon>{{service.icon}}</mat-icon>
                </div>
                <h4 class="text-xl font-black text-secondary-900 uppercase tracking-tight mb-4">{{ service.title | translate }}</h4>
                <p class="text-secondary-600 text-sm leading-relaxed mb-6 font-medium line-clamp-2 h-10">{{ service.description | translate }}</p>
                <a mat-button color="primary" class="font-black uppercase tracking-widest text-[10px] p-0" routerLink="/services">{{ 'HOME.SERVICES.LEARN_MORE' | translate }} <mat-icon class="text-sm ml-1">arrow_forward</mat-icon></a>
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
export class ServicesComponent {
  services = input.required<Service[]>();
}
