import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { TranslationService } from '@core/services/translation.service';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCard, 
    MatButton, 
    MatIcon, 
    MatDivider,
    TranslatePipe
  ],
  template: `
    <div class="min-h-screen bg-gray-50 pt-24 pb-20">
      <!-- Page Header -->
      <section class="relative py-32 bg-secondary-900 overflow-hidden -mx-6 sm:-mx-10 lg:-mx-12 px-6 sm:px-10 lg:px-12 text-white">
        <div class="app-container relative z-10 text-center max-w-4xl mx-auto">
            <h3 class="text-[10px] font-black text-primary uppercase tracking-[0.6em] mb-6 animate-in fade-in slide-in-from-bottom duration-700">{{ 'SERVICES.SUBTITLE' | translate }}</h3>
            <h1 class="text-5xl md:text-7xl font-black uppercase tracking-tight mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom duration-1000">
              {{ 'SERVICES.TITLE' | translate }}
            </h1>
            <p class="text-xl text-white/50 font-medium leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
              Providing cutting-edge musculoskeletal care with a focus on precision, technology, and patient recovery.
            </p>
        </div>
        
        <!-- Abstract Decoration -->
        <div class="absolute -right-20 -top-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
        <div class="absolute -left-20 bottom-0 w-80 h-80 bg-white/5 rounded-full blur-[100px]"></div>
      </section>

      <!-- Showcase Links Section -->
      <section class="relative -mt-20 z-20 pb-20">
        <div class="app-container">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Gallery Showcase -->
            <a routerLink="/gallery" class="group relative bg-white/10 backdrop-blur-3xl border border-white/20 p-12 rounded-[48px] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2">
               <div class="relative z-10">
                  <span class="text-[10px] font-black text-primary tracking-widest uppercase mb-4 block">{{ 'HOME.GALLERY_PREVIEW.TITLE' | translate }}</span>
                  <h2 class="text-3xl font-black text-white uppercase tracking-tighter mb-4">{{ 'HOME.GALLERY_PREVIEW.SUBTITLE' | translate }}</h2>
                  <p class="text-white/60 font-medium mb-8 max-w-sm">{{ 'HOME.GALLERY_PREVIEW.DESCRIPTION' | translate }}</p>
                  <span class="flex items-center gap-3 text-primary font-black uppercase text-xs tracking-widest group-hover:gap-6 transition-all duration-500">
                    Explore Gallery <mat-icon>east</mat-icon>
                  </span>
               </div>
               <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary-900/40 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            </a>

            <!-- Success Stories Showcase -->
            <a routerLink="/success-stories" class="group relative bg-white border border-gray-100 p-12 rounded-[48px] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2">
               <div class="relative z-10">
                  <span class="text-[10px] font-black text-secondary-400 tracking-widest uppercase mb-4 block">{{ 'HOME.BLOG.SUBTITLE' | translate }}</span>
                  <h2 class="text-3xl font-black text-secondary-900 uppercase tracking-tighter mb-4">Patient Success Stories</h2>
                  <p class="text-secondary-500 font-medium mb-8 max-w-sm">Documented clinical results demonstrating consistent excellence in recovery.</p>
                  <span class="flex items-center gap-3 text-primary font-black uppercase text-xs tracking-widest group-hover:gap-6 transition-all duration-500">
                    View Case Studies <mat-icon>east</mat-icon>
                  </span>
               </div>
               <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-soft-blue rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
            </a>
          </div>
        </div>
      </section>

      <!-- Services Grid -->
      <section class="py-12">
        <div class="app-container">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <mat-card *ngFor="let service of services" class="p-10 rounded-[44px] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div class="relative z-10 flex flex-col h-full">
                <div class="w-20 h-20 rounded-3xl bg-gray-50 text-secondary-900 flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <mat-icon class="scale-150">{{service.icon}}</mat-icon>
                </div>
                <h5 class="text-2xl font-black text-secondary-900 uppercase tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">{{service.name | translate}}</h5>
                <p class="text-secondary-500 text-lg font-medium leading-relaxed mb-12">
                  {{service.description | translate}}
                </p>
                <div class="mt-auto">
                  <mat-divider class="mb-8 opacity-40"></mat-divider>
                  <div class="flex items-center justify-between">
                    <a mat-button color="primary" class="font-black px-0 uppercase tracking-widest text-xs h-12">Consult Now</a>
                    <div class="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-secondary-300 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:border-primary">
                       <mat-icon class="text-base">add</mat-icon>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Background Accent -->
              <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </mat-card>
          </div>
        </div>
      </section>
      
      <!-- Call to Action -->
      <section class="py-24">
         <div class="app-container">
            <div class="bg-primary rounded-[60px] p-16 md:p-24 relative overflow-hidden text-center text-white shadow-2xl shadow-primary/40">
               <div class="relative z-10 max-w-3xl mx-auto">
                  <h2 class="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">Start your journey to recovery today</h2>
                  <p class="text-white/70 text-xl font-medium mb-12">Consult with Dr. Ab Rahman for specialized musculoskeletal care.</p>
                  <a mat-flat-button class="h-20 px-12 rounded-3xl text-xl font-black uppercase bg-white !text-primary shadow-xl hover:scale-105 transition-transform duration-300">
                    Book Appointment
                  </a>
               </div>
               <!-- Design Shapes -->
               <div class="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px]"></div>
               <div class="absolute bottom-0 left-0 w-64 h-64 bg-secondary-900/20 rounded-full blur-[80px]"></div>
            </div>
         </div>
      </section>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ServicesComponent {
  private translation = inject(TranslationService);

  services = [
    { name: 'HOME.SERVICES.KNEE', description: 'HOME.SERVICES.KNEE_DESC', icon: 'rebase_edit' },
    { name: 'HOME.SERVICES.HIP', description: 'HOME.SERVICES.HIP_DESC', icon: 'accessibility_new' },
    { name: 'HOME.SERVICES.SPORTS', description: 'HOME.SERVICES.SPORTS_DESC', icon: 'sports_scores' },
    { name: 'HOME.SERVICES.SPINE', description: 'HOME.SERVICES.SPINE_DESC', icon: 'accessibility' },
    { name: 'HOME.SERVICES.FRACTURE', description: 'HOME.SERVICES.FRACTURE_DESC', icon: 'healing' },
    { name: 'NAV.DROPDOWN.SERVICES.ARTHROSCOPY.LABEL', description: 'HOME.SERVICES.ARTHROSCOPY_DESC', icon: 'biotech' }
  ];
}
