import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="bg-white min-h-screen pt-24">
      <!-- Hero -->
      <section class="relative py-32 bg-secondary-900 overflow-hidden text-white -mx-6 sm:-mx-10 lg:-mx-12 px-6 sm:px-10 lg:px-12">
        <div class="app-container relative z-10 text-center">
          <h1 class="text-[10px] font-black text-primary uppercase tracking-[0.6em] mb-6 animate-in fade-in slide-in-from-bottom duration-700">{{ 'LEGAL.TERMS.SUBTITLE' | translate }}</h1>
          <h2 class="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-10 animate-in fade-in slide-in-from-bottom duration-1000">
            {{ 'LEGAL.TERMS.TITLE' | translate }}
          </h2>
          <p class="text-xl text-white/50 max-w-2xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
             {{ 'LEGAL.TERMS.LAST_UPDATED' | translate }}
          </p>
        </div>
        <div class="absolute -left-20 -bottom-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
      </section>

      <!-- Content -->
      <section class="py-32">
        <div class="app-container max-w-3xl">
          <div class="prose prose-2xl prose-slate">
            <h3 class="text-4xl font-black text-secondary-900 uppercase tracking-tighter mb-8">{{ 'LEGAL.TERMS.SECTION1' | translate }}</h3>
            <p class="text-xl text-secondary-500 font-medium leading-relaxed mb-16">
              {{ 'LEGAL.TERMS.TEXT1' | translate }}
            </p>

            <h3 class="text-4xl font-black text-secondary-900 uppercase tracking-tighter mb-8">{{ 'LEGAL.TERMS.SECTION2' | translate }}</h3>
            <div class="p-10 rounded-[40px] bg-red-50 border border-red-100 mb-16">
               <p class="text-xl text-red-900 font-bold leading-relaxed m-0">
                  {{ 'LEGAL.TERMS.TEXT2' | translate }}
               </p>
            </div>

            <h3 class="text-4xl font-black text-secondary-900 uppercase tracking-tighter mb-8">{{ 'LEGAL.TERMS.SECTION3' | translate }}</h3>
            <p class="text-xl text-secondary-500 font-medium leading-relaxed mb-16">
              {{ 'LEGAL.TERMS.TEXT3' | translate }}
            </p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class TermsOfServiceComponent {}
