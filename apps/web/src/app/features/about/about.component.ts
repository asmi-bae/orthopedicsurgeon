import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatCardModule, TranslatePipe],
  template: `
    <div class="bg-white min-h-screen">
      <!-- Hero -->
      <section class="relative py-24 bg-secondary-900 overflow-hidden text-white">
        <div class="app-container relative z-10">
          <h1 class="text-xs font-black text-primary uppercase tracking-[0.5em] mb-4">{{ 'ABOUT.HERO.SUBTITLE' | translate }}</h1>
          <h2 class="text-6xl font-black tracking-tighter uppercase leading-none mb-8">
            {{ 'ABOUT.HERO.TITLE_PART1' | translate }} <br/><span class="text-primary tracking-normal">{{ 'ABOUT.HERO.TITLE_PART2' | translate }}</span>
          </h2>
          <p class="text-lg text-white/60 max-w-2xl font-medium leading-relaxed">
            {{ 'ABOUT.HERO.DESCRIPTION' | translate }}
          </p>
        </div>
      </section>

      <!-- Mission -->
      <section class="py-32 bg-white">
        <div class="app-container">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h3 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-6">{{ 'ABOUT.MISSION.SUBTITLE' | translate }}</h3>
              <h4 class="text-4xl font-black text-secondary-900 uppercase tracking-tight mb-8">{{ 'ABOUT.MISSION.TITLE_PART1' | translate }} <br/>{{ 'ABOUT.MISSION.TITLE_PART2' | translate }}</h4>
              <p class="text-lg text-secondary-600 font-medium leading-relaxed mb-10">
                {{ 'ABOUT.MISSION.DESCRIPTION' | translate }}
              </p>
              <div class="grid grid-cols-2 gap-8">
                 <div>
                    <p class="text-3xl font-black text-primary mb-2">98%</p>
                    <p class="text-[10px] font-black uppercase tracking-widest text-secondary-400">{{ 'ABOUT.MISSION.SUCCESS_RATE' | translate }}</p>
                 </div>
                 <div>
                    <p class="text-3xl font-black text-primary mb-2">15k+</p>
                    <p class="text-[10px] font-black uppercase tracking-widest text-secondary-400">{{ 'ABOUT.MISSION.PROCEDURES' | translate }}</p>
                 </div>
              </div>
            </div>
            <div class="relative">
               <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" class="rounded-[40px] shadow-2xl grayscale" />
               <div class="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Profile Details -->
      <section class="py-32 bg-gray-50 -mx-6 sm:-mx-10 lg:-mx-12 px-6 sm:px-10 lg:px-12">
        <div class="app-container">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Education -->
            <div class="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 border-b-4 border-b-primary hover:-translate-y-2 transition-transform duration-500">
              <div class="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8">
                <mat-icon class="scale-125">school</mat-icon>
              </div>
              <h5 class="text-2xl font-black text-secondary-900 uppercase tracking-tight mb-6">{{ 'ABOUT.PROFILE.EDUCATION.TITLE' | translate }}</h5>
              <ul class="space-y-4">
                <li *ngFor="let item of 'ABOUT.PROFILE.EDUCATION.ITEMS' | translate" class="flex gap-3 text-secondary-600 font-medium leading-relaxed">
                  <mat-icon class="text-primary/40 scale-75">arrow_forward</mat-icon>
                  <span>{{item}}</span>
                </li>
              </ul>
            </div>

            <!-- Experience -->
            <div class="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 border-b-4 border-b-primary-600 hover:-translate-y-2 transition-transform duration-500">
              <div class="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8">
                <mat-icon class="scale-125">work</mat-icon>
              </div>
              <h5 class="text-2xl font-black text-secondary-900 uppercase tracking-tight mb-6">{{ 'ABOUT.PROFILE.EXPERIENCE.TITLE' | translate }}</h5>
              <ul class="space-y-4">
                <li *ngFor="let item of 'ABOUT.PROFILE.EXPERIENCE.ITEMS' | translate" class="flex gap-3 text-secondary-600 font-medium leading-relaxed">
                  <mat-icon class="text-primary/40 scale-75">arrow_forward</mat-icon>
                  <span>{{item}}</span>
                </li>
              </ul>
            </div>

            <!-- Certifications -->
            <div class="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 border-b-4 border-b-primary-400 hover:-translate-y-2 transition-transform duration-500">
              <div class="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8">
                <mat-icon class="scale-125">verified</mat-icon>
              </div>
              <h5 class="text-2xl font-black text-secondary-900 uppercase tracking-tight mb-6">{{ 'ABOUT.PROFILE.CERTIFICATIONS.TITLE' | translate }}</h5>
              <ul class="space-y-4">
                <li *ngFor="let item of 'ABOUT.PROFILE.CERTIFICATIONS.ITEMS' | translate" class="flex gap-3 text-secondary-600 font-medium leading-relaxed">
                  <mat-icon class="text-primary/40 scale-75">arrow_forward</mat-icon>
                  <span>{{item}}</span>
                </li>
              </ul>
            </div>

            <!-- Achievements -->
            <div class="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 border-b-4 border-b-primary-700 hover:-translate-y-2 transition-transform duration-500">
              <div class="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8">
                <mat-icon class="scale-125">military_tech</mat-icon>
              </div>
              <h5 class="text-2xl font-black text-secondary-900 uppercase tracking-tight mb-6">{{ 'ABOUT.PROFILE.ACHIEVEMENTS.TITLE' | translate }}</h5>
              <ul class="space-y-4">
                <li *ngFor="let item of 'ABOUT.PROFILE.ACHIEVEMENTS.ITEMS' | translate" class="flex gap-3 text-secondary-600 font-medium leading-relaxed">
                  <mat-icon class="text-primary/40 scale-75">arrow_forward</mat-icon>
                  <span>{{item}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class AboutComponent {}
