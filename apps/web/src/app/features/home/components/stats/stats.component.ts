import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@core/pipes/translate.pipe';

export interface Stat {
  label: string;
  value: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-home-stats',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    TranslatePipe
  ],
  template: `
    <section class="bg-white py-32 relative overflow-hidden -mx-6 sm:-mx-10 lg:-mx-12">
       <div class="app-container relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
             @for (stat of stats(); track stat.label) {
               <div class="flex flex-col group items-center">
                  <div class="w-16 h-16 rounded-2xl bg-medical-teal/5 flex items-center justify-center text-medical-teal mb-6 transition-all duration-500 group-hover:bg-medical-teal group-hover:text-white">
                    <mat-icon>{{stat.icon}}</mat-icon>
                  </div>
                  <h3 class="text-4xl font-black text-secondary-900 tracking-tighter uppercase mb-2">{{stat.value}}</h3>
                  <p class="text-xs font-black text-primary uppercase tracking-[0.3em] mb-2">{{ stat.label | translate }}</p>
                  <p class="text-sm text-secondary-400 font-medium leading-relaxed">{{ stat.description | translate }}</p>
               </div>
             }
          </div>
       </div>
       <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class StatsComponent {
  stats = input.required<Stat[]>();
}
