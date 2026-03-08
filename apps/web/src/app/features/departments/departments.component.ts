import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TranslatePipe } from '@core/pipes/translate.pipe';
import { TranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, TranslatePipe],
  template: `
    <div class="bg-gray-50 min-h-screen">
      <!-- Header -->
      <section class="relative py-24 bg-secondary-900 overflow-hidden text-white">
        <div class="app-container relative z-10">
          <h1 class="text-xs font-black text-primary uppercase tracking-[0.5em] mb-4">{{ 'DEPARTMENTS.HERO.SUBTITLE' | translate }}</h1>
          <h2 class="text-6xl font-black tracking-tighter uppercase leading-none mb-8">
            {{ 'DEPARTMENTS.HERO.TITLE' | translate | slice:0:11 }} <br/><span class="text-primary tracking-normal">{{ 'DEPARTMENTS.HERO.TITLE' | translate | slice:11 }}</span>
          </h2>
          <p class="text-lg text-white/60 max-w-2xl font-medium leading-relaxed">
            {{ 'DEPARTMENTS.HERO.DESCRIPTION' | translate }}
          </p>
        </div>
      </section>

      <div class="app-container py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          @for (dept of departments; track dept.nameKey) {
            <mat-card class="rounded-[40px] border border-gray-100 shadow-none overflow-hidden bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
              <div class="h-64 relative overflow-hidden bg-gray-100">
                 <img [src]="dept.image" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                 <div class="absolute inset-0 bg-secondary-900/10"></div>
                 <div class="absolute top-6 left-6">
                   <div class="w-14 h-14 rounded-2xl bg-white text-primary flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform">
                     <mat-icon class="scale-125">{{dept.icon}}</mat-icon>
                   </div>
                 </div>
              </div>

              <div class="p-10">
                <h3 class="text-2xl font-black text-secondary-900 uppercase tracking-tight mb-4">{{ dept.nameKey | translate }}</h3>
                <p class="text-secondary-600 text-sm leading-relaxed mb-8 font-medium">{{ dept.descKey | translate }}</p>

                <mat-divider class="mb-8 opacity-50"></mat-divider>

                <div class="flex flex-col gap-4">
                   @for (feat of dept.features; track feat) {
                     <div class="flex items-center gap-3 text-secondary-500">
                        <mat-icon class="text-primary scale-75">check_circle</mat-icon>
                        <span class="text-[10px] font-black uppercase tracking-widest">{{feat | translate}}</span>
                     </div>
                   }
                </div>

                <div class="mt-10">
                  <a mat-flat-button color="primary" routerLink="/doctors" [queryParams]="{ department: dept.nameKey | translate }" 
                          class="h-14 px-8 rounded-xl font-bold uppercase w-full shadow-xl shadow-primary/20">
                    {{ 'DEPARTMENTS.CARDS.BUTTON' | translate }}
                  </a>
                </div>
              </div>
            </mat-card>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class DepartmentsComponent {
  private translation = inject(TranslationService);

  departments = [
    { 
      nameKey: 'DEPARTMENTS.CARDS.JOINT.NAME', 
      icon: 'rebase_edit', 
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
      descKey: 'DEPARTMENTS.CARDS.JOINT.DESC',
      features: [
        'DEPARTMENTS.CARDS.JOINT.FEATURES.0', 
        'DEPARTMENTS.CARDS.JOINT.FEATURES.1', 
        'DEPARTMENTS.CARDS.JOINT.FEATURES.2'
      ]
    },
    { 
      nameKey: 'DEPARTMENTS.CARDS.SPORTS.NAME', 
      icon: 'sports_scores', 
      image: 'https://images.unsplash.com/photo-1571019623518-e71de96e28da?auto=format&fit=crop&q=80&w=800',
      descKey: 'DEPARTMENTS.CARDS.SPORTS.DESC',
      features: [
        'DEPARTMENTS.CARDS.SPORTS.FEATURES.0', 
        'DEPARTMENTS.CARDS.SPORTS.FEATURES.1', 
        'DEPARTMENTS.CARDS.SPORTS.FEATURES.2'
      ]
    },
    { 
      nameKey: 'DEPARTMENTS.CARDS.SPINE.NAME', 
      icon: 'accessibility', 
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      descKey: 'DEPARTMENTS.CARDS.SPINE.DESC',
      features: [
        'DEPARTMENTS.CARDS.SPINE.FEATURES.0', 
        'DEPARTMENTS.CARDS.SPINE.FEATURES.1', 
        'DEPARTMENTS.CARDS.SPINE.FEATURES.2'
      ]
    }
  ];
}
