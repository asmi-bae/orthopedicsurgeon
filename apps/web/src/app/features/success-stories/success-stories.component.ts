import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-success-stories',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule, TranslatePipe],
  template: `
    <div class="bg-white min-h-screen pt-24">
      <!-- Hero -->
      <section class="relative py-32 bg-secondary-900 overflow-hidden text-white -mx-6 sm:-mx-10 lg:-mx-12 px-6 sm:px-10 lg:px-12">
        <div class="app-container relative z-10 text-center">
          <h1 class="text-[10px] font-black text-primary uppercase tracking-[0.6em] mb-6 animate-in fade-in slide-in-from-bottom duration-700">{{ 'SUCCESS_STORIES.HERO.SUBTITLE' | translate }}</h1>
          <h2 class="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-10 animate-in fade-in slide-in-from-bottom duration-1000">
            {{ 'SUCCESS_STORIES.HERO.TITLE' | translate }}
          </h2>
          <p class="text-xl text-white/50 max-w-2xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
            {{ 'SUCCESS_STORIES.HERO.DESCRIPTION' | translate }}
          </p>
        </div>
        <div class="absolute -right-20 -top-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
      </section>

      <!-- Stories Grid -->
      <section class="py-32">
        <div class="app-container">
          <div class="space-y-32">
            @for (story of stories; track story.id; let i = $index) {
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center" [class.lg:flex-row-reverse]="i % 2 !== 0">
                <div class="relative group" [class.order-last]="i % 2 !== 0">
                  <div class="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl relative">
                    <img [src]="story.image" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
                    <div class="absolute inset-0 bg-secondary-900/10"></div>
                  </div>
                  <!-- Stats Overlay -->
                  <div class="absolute -bottom-10 -right-10 md:right-10 bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 animate-in zoom-in duration-1000 delay-500">
                     <p class="text-[10px] font-black text-primary uppercase tracking-widest mb-2">{{ 'SUCCESS_STORIES.CARD.RECOVERY' | translate }}</p>
                     <p class="text-4xl font-black text-secondary-900 tracking-tighter">{{ story.recoveryTime }}</p>
                  </div>
                </div>

                <div class="space-y-10 animate-in fade-in slide-in-from-bottom duration-1000">
                  <div class="space-y-4">
                    <h3 class="text-[10px] font-black text-primary uppercase tracking-[0.4em]">{{ story.typeKey | translate }}</h3>
                    <h4 class="text-5xl font-black text-secondary-900 uppercase tracking-tighter leading-none">{{ story.nameKey | translate }}</h4>
                  </div>
                  
                  <div class="relative">
                    <mat-icon class="absolute -left-12 -top-6 text-primary/20 scale-[3] rotate-180">format_quote</mat-icon>
                    <p class="text-2xl font-bold text-secondary-600 leading-relaxed italic">
                      {{ story.quoteKey | translate }}
                    </p>
                  </div>

                  <div class="prose prose-secondary max-w-none font-medium text-secondary-500">
                    <p>{{ story.descriptionKey | translate }}</p>
                  </div>

                  <mat-divider class="opacity-50"></mat-divider>

                  <div class="flex gap-12">
                     <div>
                        <p class="text-[10px] font-black text-secondary-400 uppercase tracking-widest mb-2">{{ 'SUCCESS_STORIES.CARD.PROCEDURE' | translate }}</p>
                        <p class="text-sm font-black text-secondary-900 uppercase">{{ story.procedureKey | translate }}</p>
                     </div>
                     <div>
                        <p class="text-[10px] font-black text-secondary-400 uppercase tracking-widest mb-2">{{ 'SUCCESS_STORIES.CARD.YEAR' | translate }}</p>
                        <p class="text-sm font-black text-secondary-900 uppercase">{{ story.year }}</p>
                     </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-32 bg-secondary-900 text-white text-center rounded-[80px] mb-12 mx-6 sm:mx-10 lg:mx-12 overflow-hidden relative">
         <div class="relative z-10 max-w-2xl mx-auto px-6">
           <h3 class="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">{{ 'SUCCESS_STORIES.CTA.TITLE' | translate }}</h3>
           <p class="text-white/40 mb-12 font-medium">{{ 'SUCCESS_STORIES.CTA.DESCRIPTION' | translate }}</p>
           <a mat-flat-button color="primary" routerLink="/appointment" class="h-20 px-16 rounded-[28px] font-black uppercase tracking-widest shadow-2xl shadow-primary/40">
             {{ 'SUCCESS_STORIES.CTA.ACTION' | translate }}
           </a>
         </div>
         <div class="absolute inset-0 bg-primary/5 blur-[120px]"></div>
      </section>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class SuccessStoriesComponent {
  stories = [
    {
      id: 1,
      idKey: 'SARAH',
      nameKey: 'SUCCESS_STORIES.STORIES.SARAH.NAME',
      typeKey: 'SUCCESS_STORIES.STORIES.SARAH.TYPE',
      procedureKey: 'SUCCESS_STORIES.STORIES.SARAH.PROCEDURE',
      quoteKey: 'SUCCESS_STORIES.STORIES.SARAH.QUOTE',
      descriptionKey: 'SUCCESS_STORIES.STORIES.SARAH.DESC',
      recoveryTime: '12 WEEKS',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1571019623518-e71de96e28da?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      idKey: 'JOHN',
      nameKey: 'SUCCESS_STORIES.STORIES.JOHN.NAME',
      typeKey: 'SUCCESS_STORIES.STORIES.JOHN.TYPE',
      procedureKey: 'SUCCESS_STORIES.STORIES.JOHN.PROCEDURE',
      quoteKey: 'SUCCESS_STORIES.STORIES.JOHN.QUOTE',
      descriptionKey: 'SUCCESS_STORIES.STORIES.JOHN.DESC',
      recoveryTime: '8 MONTHS',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
    }
  ];
}
