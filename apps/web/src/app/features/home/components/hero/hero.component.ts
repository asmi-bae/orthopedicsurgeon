import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe
  ],
  template: `
    <section class="relative min-h-[500px] lg:min-h-[70vh] flex items-center pt-48 pb-20 lg:pb-32 overflow-hidden bg-soft-blue -mt-[136px] -mx-6 sm:-mx-10 lg:-mx-12">
      <div class="app-container relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <!-- Text Content -->
          <div class="animate-in fade-in slide-in-from-left duration-1000 order-2 lg:order-1">
             <div class="inline-flex items-center gap-2 px-4 py-2 bg-medical-teal/10 rounded-full mb-8">
               <mat-icon class="text-medical-teal scale-75">medical_services</mat-icon>
               <span class="text-[10px] font-black text-medical-teal uppercase tracking-[0.2em]">{{ 'HOME.HERO.DOCTOR.TITLE' | translate }}</span>
             </div>
             
             <h1 class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-secondary-900 leading-[0.95] mb-8 tracking-tighter uppercase">
               {{ 'HOME.HERO.TITLE_PART1' | translate }} <br/>
               <span class="text-primary">{{ 'HOME.HERO.TITLE_PART2' | translate }}</span>
             </h1>
             
             <p class="text-lg text-secondary-500 mb-6 max-w-xl leading-relaxed font-medium capitalize">
               {{ 'HOME.HERO.SUBTITLE' | translate }}
             </p>

             <p class="text-sm text-secondary-400 mb-10 max-w-lg leading-relaxed font-medium">
               {{ 'HOME.HERO.DESCRIPTION' | translate }}
             </p>
             
             <div class="flex flex-wrap gap-5">
               <a mat-flat-button color="primary" href="https://www.facebook.com/Ab.rahman49" target="_blank"
                        class="h-16 px-10 rounded-2xl text-lg font-bold uppercase shadow-2xl shadow-primary/30">
                 {{ 'HOME.HERO.CTA.BOOK' | translate }}
               </a>
               <a mat-stroked-button color="primary" href="https://www.facebook.com/orthopedicsurgeonrahmanbd" target="_blank"
                        class="h-16 px-10 rounded-2xl text-lg font-bold uppercase border-2">
                 {{ 'HOME.HERO.CTA.CONTACT' | translate }}
               </a>
             </div>

             <!-- Specializations List -->
             <div class="mt-12 grid grid-cols-2 gap-4">
                @for (spec of 'HOME.HERO.DOCTOR.SPECIALIZATIONS' | translate; track spec) {
                  <div class="flex items-center gap-3">
                     <mat-icon class="text-xl text-blue-800">check_circle</mat-icon>
                     <span class="text-xs font-bold text-secondary-600 uppercase tracking-tight">{{spec}}</span>
                  </div>
                }
             </div>
          </div>

          <!-- Profile Image & Info Card -->
          <div class="relative animate-in fade-in slide-in-from-right duration-1000 order-1 lg:order-2 mb-12 lg:mb-0 lg:-mt-20">
             <div class="relative z-10 overflow-hidden aspect-[4/5] max-w-[320px] sm:max-w-md lg:max-w-xl mx-auto group">
                <img src="assets/images/Dr. Rahman.svg" [alt]="'HOME.HERO.DOCTOR.NAME' | translate" 
                     class="w-full h-full object-cover grayscale-0 group-hover:scale-105 transition-transform duration-1000" />
                
                <!-- Blurry Fade Transition at bottom - smoothed with mask -->
                <div class="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-soft-blue via-soft-blue/40 to-transparent backdrop-blur-[10px] pointer-events-none z-10 [mask-image:linear-gradient(to_top,black_20%,transparent)]"></div>

                <!-- Floating Info Elements -->
                <div class="absolute bottom-0 left-0 right-0 p-8 text-secondary-900 z-20">
                  <h2 class="text-2xl font-black uppercase tracking-tight mb-1">{{ 'HOME.HERO.DOCTOR.NAME' | translate }}</h2>
                  <p class="text-xs font-bold text-secondary-500 uppercase tracking-widest mb-4 opacity-80">{{ 'HOME.HERO.DOCTOR.TITLE' | translate }}</p>
                  
                  <div class="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                    <div class="flex items-center gap-1.5">
                      <mat-icon class="scale-50 text-medical-teal">history</mat-icon>
                      <span class="text-secondary-600 font-bold uppercase">{{ 'HOME.HERO.DOCTOR.EXP' | translate }}</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <mat-icon class="scale-50 text-medical-teal">location_on</mat-icon>
                      <span class="text-secondary-600 font-bold uppercase">{{ 'HOME.HERO.DOCTOR.LOC' | translate }}</span>
                    </div>
                  </div>
                </div>
             </div>

             <!-- Visiting Hours Card -->
             <div class="absolute -top-10 -right-4 z-20 bg-white p-6 rounded-[32px] shadow-2xl border border-slate-100 animate-bounce-subtle hidden lg:block">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-medical-teal/10 rounded-2xl flex items-center justify-center text-medical-teal">
                    <mat-icon>schedule</mat-icon>
                  </div>
                  <div>
                    <p class="text-[9px] font-black text-secondary-400 uppercase tracking-widest mb-0.5">{{ 'DOCTORS.DETAIL.WAIT_TIME' | translate }}</p>
                    <p class="text-sm font-black text-secondary-900 uppercase">{{ 'HOME.HERO.DOCTOR.HOURS' | translate }}</p>
                  </div>
                </div>
             </div>

             <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -z-10"></div>
          </div>
      </div>
    </div>

    <!-- Interaction Hint -->
    <div (click)="scrollToDiscover()" 
         class="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40 hover:opacity-100 transition-all duration-500 cursor-pointer group z-30">
        <span class="text-[10px] font-black uppercase tracking-[0.4em] text-secondary-900 group-hover:text-primary transition-colors text-center">{{ 'COMMON.SCROLL_DISCOVER' | translate }}</span>
        <div class="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center group-hover:border-primary transition-colors">
          <mat-icon class="text-primary">expand_more</mat-icon>
        </div>
      </div>
      
      <!-- Bottom Soft Transition -->
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20"></div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    @keyframes bounce-subtle {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .animate-bounce-subtle { animation: bounce-subtle 4s ease-in-out infinite; }
  `]
})
export class HeroComponent {
  scrollToDiscover() {
    const element = document.getElementById('discover');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
