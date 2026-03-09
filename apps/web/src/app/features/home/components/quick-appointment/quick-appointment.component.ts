import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-home-quick-appointment',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    TranslatePipe
  ],
  template: `
    <section class="py-24 bg-medical-teal relative overflow-hidden -mx-6 sm:-mx-10 lg:-mx-12">
      <div class="app-container relative z-10 text-center">
        <div class="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-1000">
           <h2 class="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-8 leading-[0.9]">
             {{ 'HOME.QUICK_APPOINTMENT.TITLE' | translate }}
           </h2>
           <p class="text-white/80 text-xl font-medium mb-12">
             {{ 'HOME.QUICK_APPOINTMENT.DESC' | translate }}
           </p>
           <div class="flex flex-wrap justify-center gap-6">
              <a mat-flat-button color="primary" routerLink="/appointment" class="h-20 px-12 rounded-[24px] text-xl font-black uppercase shadow-2xl shadow-primary/40 bg-white !text-primary hover:scale-105 transition-transform duration-300">
                {{ 'HOME.HERO.CTA.BOOK' | translate }}
              </a>
              <a mat-stroked-button color="primary" href="tel:+8801711123456" class="h-20 px-12 rounded-[24px] text-xl font-black uppercase border-2 border-white !text-white hover:bg-white/10 transition-colors duration-300">
                {{ 'COMMON.CALL_DOCTOR' | translate }}
              </a>
           </div>
        </div>
      </div>
      
      <!-- Abstract Medical Shapes -->
      <div class="absolute -right-20 -top-20 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
      <div class="absolute -left-20 -bottom-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class QuickAppointmentComponent {}
