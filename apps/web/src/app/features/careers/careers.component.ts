import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatCardModule, 
    MatIconModule, 
    MatDividerModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    MatChipsModule,
    TranslatePipe
  ],
  template: `
    <div class="bg-white min-h-screen">
      <!-- Hero -->
      <section class="relative py-24 bg-secondary-900 overflow-hidden text-white">
        <div class="app-container relative z-10">
          <h1 class="text-xs font-black uppercase tracking-[0.5em] mb-4 text-white/60">{{ 'CAREERS.HERO.SUBTITLE' | translate }}</h1>
          <h2 class="text-6xl font-black tracking-tighter uppercase mb-8">{{ 'CAREERS.HERO.TITLE_PART1' | translate }} <br/>{{ 'CAREERS.HERO.TITLE_PART2' | translate }}</h2>
          <p class="text-lg text-white/60 max-w-2xl font-medium leading-relaxed">
            {{ 'CAREERS.HERO.DESCRIPTION' | translate }}
          </p>
        </div>
      </section>

      <!-- Openings -->
      <section class="py-32 bg-white">
        <div class="app-container">
          <div class="text-center mb-20 text-balance">
            <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">{{ 'CAREERS.LIST.SUBTITLE' | translate }}</h2>
            <h3 class="text-5xl font-black text-secondary-900 tracking-tighter uppercase">{{ 'CAREERS.LIST.TITLE_PART1' | translate }} <br/>{{ 'CAREERS.LIST.TITLE_PART2' | translate }}</h3>
          </div>

          <div class="space-y-6">
            @for (job of vacancies; track job.titleKey) {
              <mat-card class="p-8 rounded-[32px] border border-gray-100 shadow-none hover:shadow-2xl transition-all duration-500 bg-gray-50/30 group">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div class="flex-1">
                    <div class="flex items-center gap-4 mb-4">
                      <mat-chip class="premium-badge">{{ job.departmentKey | translate }}</mat-chip>
                      <span class="text-[10px] font-black text-secondary-400 uppercase tracking-widest">{{ job.typeKey | translate }}</span>
                    </div>
                    <h4 class="text-2xl font-black text-secondary-900 uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{{ job.titleKey | translate }}</h4>
                    <div class="flex items-center gap-4 text-xs font-bold text-secondary-500 uppercase tracking-tight">
                      <div class="flex items-center gap-1">
                        <mat-icon class="scale-50">location_on</mat-icon>
                        <span>{{ job.locationKey | translate }}</span>
                      </div>
                      <div class="w-1 h-1 rounded-full bg-gray-300"></div>
                      <span>{{ 'CAREERS.LIST.COMPETITIVE' | translate }}</span>
                    </div>
                  </div>
                  <button mat-flat-button color="primary" class="h-14 px-10 rounded-xl font-bold uppercase shadow-xl shadow-primary/20">
                    {{ 'CAREERS.LIST.TRANSMIT' | translate }}
                  </button>
                </div>
              </mat-card>
            }
          </div>
        </div>
      </section>

      <!-- Application Form -->
      <section class="py-32 bg-secondary-900 text-white relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center mb-20">
            <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">{{ 'CAREERS.FORM.SUBTITLE' | translate }}</h2>
            <h3 class="text-5xl font-black tracking-tighter uppercase">{{ 'CAREERS.FORM.TITLE' | translate }}</h3>
          </div>

          <mat-card class="p-12 rounded-[40px] bg-white/5 border border-white/10 shadow-none">
            <form class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <mat-form-field appearance="outline" class="w-full white-field">
                <mat-label class="uppercase tracking-widest font-black text-[10px] text-white/40">{{ 'CAREERS.FORM.NAME' | translate }}</mat-label>
                <input matInput [placeholder]="'CAREERS.FORM.NAME' | translate" class="uppercase font-bold text-white">
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full white-field">
                <mat-label class="uppercase tracking-widest font-black text-[10px] text-white/40">{{ 'CAREERS.FORM.EMAIL' | translate }}</mat-label>
                <input matInput [placeholder]="'CAREERS.FORM.EMAIL' | translate" class="uppercase font-bold text-white">
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full white-field">
                <mat-label class="uppercase tracking-widest font-black text-[10px] text-white/40">{{ 'CAREERS.FORM.SPECIALIZATION' | translate }}</mat-label>
                <mat-select class="uppercase font-bold text-white">
                  <mat-option value="medical">{{ 'CAREERS.FORM.OPTIONS.MEDICAL' | translate }}</mat-option>
                  <mat-option value="nursing">{{ 'CAREERS.FORM.OPTIONS.NURSING' | translate }}</mat-option>
                  <mat-option value="admin">{{ 'CAREERS.FORM.OPTIONS.ADMIN' | translate }}</mat-option>
                  <mat-option value="tech">{{ 'CAREERS.FORM.OPTIONS.TECH' | translate }}</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full white-field">
                <mat-label class="uppercase tracking-widest font-black text-[10px] text-white/40">{{ 'CAREERS.FORM.EXP' | translate }}</mat-label>
                <input matInput placeholder="E.G. 5" class="uppercase font-bold text-white">
              </mat-form-field>

              <div class="md:col-span-2">
                 <p class="text-[10px] font-black uppercase tracking-widest text-primary mb-4">{{ 'CAREERS.FORM.BIO' | translate }}</p>
                 <mat-form-field appearance="outline" class="w-full white-field">
                   <textarea matInput rows="4" [placeholder]="'CAREERS.FORM.BIO_PLACEHOLDER' | translate" class="uppercase font-bold text-white"></textarea>
                 </mat-form-field>
              </div>

              <div class="md:col-span-2 text-center">
                <button mat-flat-button color="primary" class="h-16 px-16 rounded-2xl text-lg font-bold uppercase shadow-2xl shadow-primary/40">
                  {{ 'CAREERS.FORM.SUBMIT' | translate }}
                </button>
              </div>
            </form>
          </mat-card>
        </div>
        <div class="absolute -right-40 -top-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .premium-badge { background: #dcfce7 !important; color: #166534 !important; font-size: 8px !important; font-weight: 900 !important; text-transform: uppercase !important; letter-spacing: 0.1em !important; height: 26px !important; border: none !important; }
    .white-field ::ng-deep .mat-mdc-text-field-wrapper { background: rgba(255,255,255,0.05) !important; border-radius: 12px !important; }
  `]
})
export class CareersComponent {
  vacancies = [
    { titleKey: 'CAREERS.VACANCIES.SURGEON.TITLE', departmentKey: 'CAREERS.VACANCIES.SURGEON.DEPT', locationKey: 'HOME.PARTNERS.CI1.CITY', typeKey: 'BOOKING.TYPES.SURGERY_CONSULTATION' }, 
    { titleKey: 'CAREERS.VACANCIES.THERAPIST.TITLE', departmentKey: 'CAREERS.VACANCIES.THERAPIST.DEPT', locationKey: 'HOME.PARTNERS.CI2.CITY', typeKey: 'BOOKING.TYPES.FOLLOW_UP' },
    { titleKey: 'CAREERS.VACANCIES.ENGINEER.TITLE', departmentKey: 'CAREERS.VACANCIES.ENGINEER.DEPT', locationKey: 'HOME.PARTNERS.CI3.CITY', typeKey: 'BOOKING.TYPES.SURGERY_CONSULTATION' },
    { titleKey: 'CAREERS.VACANCIES.PEDIATRIC.TITLE', departmentKey: 'CAREERS.VACANCIES.PEDIATRIC.DEPT', locationKey: 'HOME.PARTNERS.CI4.CITY', typeKey: 'BOOKING.TYPES.EMERGENCY' },
  ];
}
