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
    <section class="py-32 bg-gray-50 relative overflow-hidden -mx-6 sm:-mx-10 lg:-mx-12">
       <!-- Top/Bottom Soft Transitions -->
       <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10"></div>
       <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
       
       <div class="app-container relative z-20">
        <div class="text-center mb-20 text-balance">
          <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">{{ 'HOME.SERVICES.SUBTITLE' | translate }}</h2>
          <h3 class="text-5xl font-black text-secondary-900 tracking-tighter uppercase">{{ 'HOME.SERVICES.TITLE' | translate }}</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (service of services(); track service.title) {
            <mat-card class="p-8 rounded-[32px] border border-gray-100 shadow-none hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white">
              <div class="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8">
                <mat-icon class="scale-125">{{service.icon}}</mat-icon>
              </div>
              <h4 class="text-xl font-black text-secondary-900 uppercase tracking-tight mb-4">{{ service.title | translate }}</h4>
              <p class="text-secondary-600 text-sm leading-relaxed mb-6 font-medium">{{ service.description | translate }}</p>
              <a mat-button color="primary" class="font-black uppercase tracking-widest text-[10px] p-0" routerLink="/departments">{{ 'HOME.SERVICES.LEARN_MORE' | translate }} <mat-icon class="text-sm ml-1">arrow_forward</mat-icon></a>
            </mat-card>
          }
        </div>
      </div>
      <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-medical-teal/5 rounded-full blur-[120px] -z-10"></div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ServicesComponent {
  services = input.required<Service[]>();
}
