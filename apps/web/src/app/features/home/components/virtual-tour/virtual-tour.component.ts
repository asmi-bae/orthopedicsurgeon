import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-home-virtual-tour',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    TranslatePipe
  ],
  template: `
    <section class="py-32 bg-secondary-900 relative overflow-hidden group text-center -mx-6 sm:-mx-10 lg:-mx-12">
        <!-- Top/Bottom Soft Transitions -->
        <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10 opacity-10"></div>
        <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10 opacity-10"></div>
        
        <div class="app-container flex flex-col items-center relative z-10">
          <h2 class="text-xs font-black text-primary uppercase tracking-[0.5em] mb-6">{{ 'HOME.VIRTUAL_TOUR.SUBTITLE' | translate }}</h2>
          <h3 class="text-5xl font-black text-white tracking-tighter uppercase mb-10">{{ 'HOME.VIRTUAL_TOUR.TITLE' | translate }}</h3>
          <a mat-flat-button color="primary" routerLink="/gallery" class="h-16 px-12 rounded-2xl text-lg font-bold uppercase shadow-2xl shadow-primary/30">
            {{ 'HOME.VIRTUAL_TOUR.ACTION' | translate }}
          </a>
       </div>
       <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
       <div class="absolute -right-20 -top-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"></div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class VirtualTourComponent {}
