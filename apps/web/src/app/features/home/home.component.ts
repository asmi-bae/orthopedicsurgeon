import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatButtonModule, 
    MatCardModule, 
    MatIconModule, 
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatChipsModule,
    MatExpansionModule,
    TranslatePipe
  ],
  template: `
    <div class="flex flex-col bg-white">
      <!-- Hero Section -->
      <section class="relative pt-20 pb-32 overflow-hidden bg-secondary-900">
        <div class="app-container relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="animate-in fade-in slide-in-from-left duration-1000">
               <mat-chip-set class="mb-8 font-typography">
                 <mat-chip class="premium-chip">{{ 'HOME.HERO.SUBTITLE' | translate }}</mat-chip>
               </mat-chip-set>
               
               <h1 class="text-6xl md:text-7xl font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase transition-all">
                 {{ 'HOME.HERO.TITLE_PART1' | translate }} <br/><span class="text-primary tracking-normal">{{ 'HOME.HERO.TITLE_PART2' | translate }}</span>
               </h1>
               
               <p class="text-xl text-white/60 mb-10 max-w-lg leading-relaxed font-medium">
                 {{ 'HOME.HERO.DESCRIPTION' | translate }}
               </p>
               
               <div class="flex flex-wrap gap-5">
                 <a mat-flat-button color="primary" routerLink="/auth/register" 
                         class="h-16 px-10 rounded-2xl text-lg font-bold uppercase shadow-2xl shadow-primary/30 hover:scale-105 transition-transform">
                   {{ 'COMMON.GET_STARTED' | translate }}
                 </a>
                 <a mat-tonal-button color="primary" routerLink="/about"
                         class="h-16 px-10 rounded-2xl text-lg font-bold uppercase transition-all">
                   {{ 'HOME.HERO.SUBTITLE' | translate }}
                 </a>
               </div>

               <div class="mt-16 flex items-center gap-10">
                 <div class="flex -space-x-4">
                    @for (i of [1,2,3,4,5]; track i) {
                      <img class="w-12 h-12 rounded-full border-4 border-secondary-900 shadow-lg" [src]="'https://i.pravatar.cc/150?img=' + (i+10)" />
                    }
                 </div>
                 <div class="flex flex-col">
                   <p class="text-sm font-black text-white uppercase tracking-widest leading-none mb-1">
                     {{ 'HOME.STATS.OPS' | translate }}
                   </p>
                   <p class="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{{ 'HOME.STATS.VERIFIED' | translate }}</p>
                 </div>
               </div>
            </div>

            <div class="relative animate-in fade-in slide-in-from-right duration-1000">
               <div class="relative z-10 rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border-[12px] border-white/5">
                  <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000" alt="Surgeon" class="w-full h-full object-cover grayscale transition-all duration-1000 brightness-75" />
               </div>
               <mat-card class="absolute -bottom-12 -left-12 z-20 w-80 p-6 rounded-[30px] shadow-2xl border-none bg-white/90 backdrop-blur-xl animate-bounce-subtle">
                  <div class="flex items-center gap-5">
                     <div class="w-14 h-14 bg-green-500/10 text-green-600 rounded-2xl flex items-center justify-center">
                       <mat-icon class="scale-125">verified_user</mat-icon>
                     </div>
                     <div>
                       <p class="text-[10px] text-secondary-400 font-black uppercase tracking-widest mb-1">{{ 'HOME.HERO.AVAILABILITY' | translate }}</p>
                       <p class="text-lg font-black text-secondary-900 tracking-tight leading-none uppercase">{{ 'HOME.HERO.SLOT' | translate }}</p>
                     </div>
                  </div>
               </mat-card>
               <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="bg-white py-32 relative overflow-hidden">
         <div class="app-container relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
               @for (stat of stats; track stat.label) {
                 <div class="flex flex-col group items-center">
                    <div class="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-primary mb-6 transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                      <mat-icon>{{stat.icon}}</mat-icon>
                    </div>
                    <h3 class="text-4xl font-black text-secondary-900 tracking-tighter uppercase mb-2">{{stat.value}}</h3>
                    <p class="text-xs font-black text-primary uppercase tracking-[0.3em] mb-2">{{ stat.label | translate }}</p>
                    <p class="text-sm text-secondary-400 font-medium leading-relaxed">{{ stat.description | translate }}</p>
                 </div>
               }
            </div>
         </div>
      </section>

      <!-- Services Section -->
      <section class="py-32 bg-gray-50">
         <div class="app-container">
          <div class="text-center mb-20 text-balance">
            <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">{{ 'HOME.SERVICES.SUBTITLE' | translate }}</h2>
            <h3 class="text-5xl font-black text-secondary-900 tracking-tighter uppercase">{{ 'HOME.SERVICES.TITLE' | translate }}</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (service of services; track service.title) {
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
      </section>

      <!-- Partner Hospitals Section -->
      <section class="py-32 bg-white relative overflow-hidden">
        <div class="app-container relative z-10">
          <div class="text-center mb-20">
            <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">{{ 'HOME.PARTNERS.SUBTITLE' | translate }}</h2>
            <h3 class="text-5xl font-black text-secondary-900 tracking-tighter uppercase mb-6">{{ 'HOME.PARTNERS.TITLE' | translate }}</h3>
            <p class="text-lg text-secondary-500 max-w-2xl mx-auto font-medium leading-relaxed">
              {{ 'HOME.PARTNERS.DESCRIPTION' | translate }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            @for (h of hospitals; track h.name) {
              <mat-card class="rounded-[32px] border border-gray-100 shadow-none overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div class="h-48 relative overflow-hidden">
                   <img [src]="h.image" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div class="p-6">
                   <h4 class="text-sm font-black text-secondary-900 uppercase tracking-tight mb-2">{{ h.name | translate }}</h4>
                   <div class="flex items-center gap-2 text-[9px] font-bold text-primary uppercase tracking-widest">
                      <mat-icon class="scale-50">location_on</mat-icon>
                      <span>{{ h.city | translate }}</span>
                   </div>
                </div>
              </mat-card>
            }
          </div>
          
          <div class="mt-20 text-center">
             <a mat-tonal-button color="primary" routerLink="/hospitals" class="h-14 px-10 rounded-xl font-bold uppercase tracking-widest text-[11px]">
                {{ 'HOME.PARTNERS.EXPLORE_ALL' | translate }}
             </a>
          </div>
        </div>
      </section>

      <!-- Virtual Tour Banner -->
      <section class="py-32 bg-secondary-900 relative overflow-hidden group text-center">
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

      <!-- Latest Intelligence (Blog) -->
      <section class="py-32 bg-white">
          <div class="app-container">
          <div class="flex justify-between items-end mb-20 text-balance">
            <div>
              <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">{{ 'HOME.BLOG.SUBTITLE' | translate }}</h2>
              <h3 class="text-5xl font-black text-secondary-900 tracking-tighter uppercase">{{ 'HOME.BLOG.TITLE' | translate }}</h3>
            </div>
            <a mat-button color="primary" class="font-black uppercase tracking-widest text-[11px]" routerLink="/blog">{{ 'HOME.BLOG.VIEW_ALL' | translate }} <mat-icon class="ml-2">arrow_forward</mat-icon></a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @for (news of newsStream; track news.slug) {
              <mat-card class="rounded-[32px] border border-gray-100 shadow-none overflow-hidden hover:shadow-lg transition-all">
                <div class="h-48 overflow-hidden">
                  <img [src]="news.image" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div class="p-8">
                  <p class="text-[9px] font-black text-primary uppercase tracking-widest mb-3">{{ news.date | translate }}</p>
                  <h4 class="text-lg font-black text-secondary-900 uppercase tracking-tight mb-4 transition-colors">{{ news.title | translate }}</h4>
                  <a mat-button color="primary" class="font-black uppercase text-[10px] p-0" [routerLink]="['/blog', news.slug]">{{ 'HOME.BLOG.ACCESS' | translate }}</a>
                </div>
              </mat-card>
            }
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="py-32 bg-gray-50 relative overflow-hidden">
        <div class="app-container relative z-10">
          <div class="text-center mb-20">
            <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">{{ 'HOME.TESTIMONIALS.SUBTITLE' | translate }}</h2>
            <h3 class="text-5xl font-black text-secondary-900 tracking-tighter uppercase">{{ 'HOME.TESTIMONIALS.TITLE' | translate }}</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @for (t of testimonials; track t.name) {
              <mat-card class="p-8 rounded-[32px] bg-white border border-gray-100 shadow-none">
                <div class="flex items-center gap-4 mb-8">
                  <img [src]="t.avatar" class="w-12 h-12 rounded-full border-2 border-primary/30" />
                  <div>
                    <p class="text-sm font-black text-secondary-900 uppercase tracking-tight">{{ t.name | translate }}</p>
                    <p class="text-[10px] font-bold text-primary uppercase tracking-widest">{{ t.role | translate }}</p>
                  </div>
                </div>
                <p class="text-secondary-600 text-sm leading-relaxed font-medium">"{{ t.content | translate }}"</p>
                <div class="mt-8 flex gap-1 text-primary">
                  @for (i of [1,2,3,4,5]; track i) {
                    <mat-icon class="text-sm">star</mat-icon>
                  }
                </div>
              </mat-card>
            }
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-32 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-20">
            <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">{{ 'HOME.FAQ.SUBTITLE' | translate }}</h2>
            <h3 class="text-5xl font-black text-secondary-900 tracking-tighter uppercase">{{ 'HOME.FAQ.TITLE' | translate }}</h3>
          </div>

          <mat-accordion class="premium-accordion">
             @for (faq of faqs; track faq.qKey) {
               <mat-expansion-panel class="mb-4 rounded-2xl border-none shadow-none bg-gray-50">
                 <mat-expansion-panel-header class="h-20 px-8">
                   <mat-panel-title class="text-sm font-black text-secondary-900 uppercase tracking-tight">
                     {{ faq.qKey | translate }}
                   </mat-panel-title>
                 </mat-expansion-panel-header>
                 <div class="px-8 pb-8">
                   <p class="text-secondary-600 text-sm leading-relaxed font-medium">{{ faq.aKey | translate }}</p>
                 </div>
               </mat-expansion-panel>
             }
          </mat-accordion>
        </div>
      </section>

      <!-- Newsletter Section -->
      <section class="py-32 bg-primary">
         <div class="app-container text-center text-white">
          <div class="max-w-2xl mx-auto">
            <h2 class="text-xs font-black uppercase tracking-[0.4em] mb-4 text-white/60">{{ 'HOME.NEWSLETTER.SUBTITLE' | translate }}</h2>
            <h3 class="text-5xl font-black tracking-tighter uppercase mb-10">{{ 'HOME.NEWSLETTER.TITLE' | translate }}</h3>
            
            <form class="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <mat-form-field appearance="outline" class="w-full sm:w-96 premium-form-field no-subscript-wrapper">
                <mat-label class="hidden">Email Address</mat-label>
                <input matInput [placeholder]="'HOME.NEWSLETTER.PLACEHOLDER' | translate" class="uppercase tracking-widest font-black text-[10px]">
                <mat-icon matSuffix class="text-white/40">mail</mat-icon>
              </mat-form-field>
              <button mat-flat-button class="h-[56px] px-10 rounded-xl bg-white text-primary font-bold uppercase text-lg shadow-2xl">
                {{ 'HOME.NEWSLETTER.ACTION' | translate }}
              </button>
            </form>
            <p class="mt-6 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{{ 'HOME.NEWSLETTER.SECURED' | translate }}</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .premium-chip { background: #3b82f6 !important; color: white !important; font-weight: 900 !important; text-transform: uppercase !important; letter-spacing: 0.15em !important; font-size: 10px !important; border: none !important; padding: 4px 12px !important; }
    @keyframes bounce-subtle {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .animate-bounce-subtle { animation: bounce-subtle 4s ease-in-out infinite; }
    
    .premium-accordion ::ng-deep .mat-expansion-panel { border-radius: 20px !important; overflow: hidden; margin-bottom: 16px; border: 1px solid #f1f5f9; }
    .premium-accordion ::ng-deep .mat-expansion-panel-header { background: transparent !important; }
    .premium-accordion ::ng-deep .mat-content { align-items: center; }

    .premium-form-field ::ng-deep .mat-mdc-text-field-wrapper { background: rgba(255,255,255,0.1) !important; border-radius: 12px !important; }
    .premium-form-field ::ng-deep .mdc-notched-outline__leading,
    .premium-form-field ::ng-deep .mdc-notched-outline__notch,
    .premium-form-field ::ng-deep .mdc-notched-outline__trailing { border-color: rgba(255,255,255,0.2) !important; }
    .premium-form-field ::ng-deep input { color: white !important; }
    .no-subscript-wrapper ::ng-deep .mat-mdc-form-field-subscript-wrapper { display: none; }
  `]
})
export class HomeComponent {
  stats = [
    { label: 'HOME.STATS.SPECIALISTS', value: '150+', description: 'HOME.STATS.DATA.DESC1', icon: 'groups' },
    { label: 'HOME.STATS.FACILITIES', value: '25', description: 'HOME.STATS.DATA.DESC2', icon: 'apartment' },
    { label: 'HOME.STATS.SATISFACTION', value: '4.9/5', description: 'HOME.STATS.DATA.DESC3', icon: 'auto_awesome' },
    { label: 'HOME.STATS.PRECISION', value: '98%', description: 'HOME.STATS.DATA.DESC4', icon: 'biotech' },
  ];

  services = [
    { title: 'HOME.SERVICES.JOINT', description: 'HOME.SERVICES.JOINT_DESC', icon: 'rebase_edit' },
    { title: 'HOME.SERVICES.SPORTS', description: 'HOME.SERVICES.SPORTS_DESC', icon: 'sports_scores' },
    { title: 'HOME.SERVICES.SPINE', description: 'HOME.SERVICES.SPINE_DESC', icon: 'accessibility' },
    { title: 'HOME.SERVICES.PEDIATRIC', description: 'HOME.SERVICES.PEDIATRIC_DESC', icon: 'child_care' },
    { title: 'HOME.SERVICES.TRAUMA', description: 'HOME.SERVICES.TRAUMA_DESC', icon: 'healing' },
    { title: 'HOME.SERVICES.PHYSIO', description: 'HOME.SERVICES.PHYSIO_DESC', icon: 'fitness_center' },
  ];

  testimonials = [
    { name: 'HOME.TESTIMONIALS.SARAH_NAME', role: 'HOME.TESTIMONIALS.SARAH_ROLE', content: 'HOME.TESTIMONIALS.SARAH_CONTENT', avatar: 'https://i.pravatar.cc/150?img=32' },
    { name: 'HOME.TESTIMONIALS.MICHAEL_NAME', role: 'HOME.TESTIMONIALS.MICHAEL_ROLE', content: 'HOME.TESTIMONIALS.MICHAEL_CONTENT', avatar: 'https://i.pravatar.cc/150?img=52' },
    { name: 'HOME.TESTIMONIALS.EMMA_NAME', role: 'HOME.TESTIMONIALS.EMMA_ROLE', content: 'HOME.TESTIMONIALS.EMMA_CONTENT', avatar: 'https://i.pravatar.cc/150?img=45' },
  ];

   faqs = [
     { qKey: 'HOME.FAQ.Q1', aKey: 'HOME.FAQ.A1' },
     { qKey: 'HOME.FAQ.Q2', aKey: 'HOME.FAQ.A2' },
     { qKey: 'HOME.FAQ.Q3', aKey: 'HOME.FAQ.A3' },
   ];
 
   newsStream = [
     { title: 'HOME.BLOG.NEWS1.TITLE', date: 'HOME.BLOG.NEWS1.DATE', slug: 'robotic-hip-replacement-innovations', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561' },
     { title: 'HOME.BLOG.NEWS2.TITLE', date: 'HOME.BLOG.NEWS2.DATE', slug: 'post-surgery-recovery-biometrics', image: 'https://images.unsplash.com/photo-1571019623518-e71de96e28da' },
     { title: 'HOME.BLOG.NEWS3.TITLE', date: 'HOME.BLOG.NEWS3.DATE', slug: 'future-regenerative-bone-therapy', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514' },
   ];
 
   hospitals = [
     { name: 'HOME.PARTNERS.CI1.NAME', city: 'HOME.PARTNERS.CI1.CITY', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d' },
     { name: 'HOME.PARTNERS.CI2.NAME', city: 'HOME.PARTNERS.CI2.CITY', image: 'https://images.unsplash.com/photo-1517120026326-d87759a7b63b' },
     { name: 'HOME.PARTNERS.CI3.NAME', city: 'HOME.PARTNERS.CI3.CITY', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3' },
     { name: 'HOME.PARTNERS.CI4.NAME', city: 'HOME.PARTNERS.CI4.CITY', image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6' },
   ];
}
