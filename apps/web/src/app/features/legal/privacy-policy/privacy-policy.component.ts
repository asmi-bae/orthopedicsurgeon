import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="bg-white min-h-screen pt-24">
      <!-- Hero -->
      <section class="relative py-32 bg-secondary-900 overflow-hidden text-white -mx-6 sm:-mx-10 lg:-mx-12 px-6 sm:px-10 lg:px-12">
        <div class="app-container relative z-10 text-center">
          <h1 class="text-[10px] font-black text-primary uppercase tracking-[0.6em] mb-6 animate-in fade-in slide-in-from-bottom duration-700">{{ 'LEGAL.PRIVACY.SUBTITLE' | translate }}</h1>
          <h2 class="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-10 animate-in fade-in slide-in-from-bottom duration-1000">
            {{ 'LEGAL.PRIVACY.TITLE' | translate }}
          </h2>
          <p class="text-xl text-white/50 max-w-2xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
             {{ 'LEGAL.PRIVACY.LAST_UPDATED' | translate }}
          </p>
        </div>
        <div class="absolute -right-20 -bottom-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
      </section>

      <!-- Content -->
      <section class="py-32">
        <div class="app-container max-w-3xl">
          <div class="prose prose-2xl prose-slate">
            <h3 class="text-4xl font-black text-secondary-900 uppercase tracking-tighter mb-8">{{ 'LEGAL.PRIVACY.SECTION1' | translate }}</h3>
            <p class="text-xl text-secondary-500 font-medium leading-relaxed mb-16 italic border-l-4 border-primary pl-8">
              {{ 'LEGAL.PRIVACY.TEXT1' | translate }}
            </p>

            <h3 class="text-4xl font-black text-secondary-900 uppercase tracking-tighter mb-8">{{ 'LEGAL.PRIVACY.SECTION2' | translate }}</h3>
            <ul class="space-y-6 mb-16">
              <li class="flex gap-4 items-start">
                <span class="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0"></span>
                <span class="text-xl text-secondary-500 font-medium leading-relaxed">{{ 'LEGAL.PRIVACY.TEXT2' | translate }}</span>
              </li>
            </ul>

            <h3 class="text-4xl font-black text-secondary-900 uppercase tracking-tighter mb-8">{{ 'LEGAL.PRIVACY.SECTION3' | translate }}</h3>
            <p class="text-xl text-secondary-500 font-medium leading-relaxed mb-16">
              {{ 'LEGAL.PRIVACY.TEXT3' | translate }}
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
export class PrivacyPolicyComponent {}
