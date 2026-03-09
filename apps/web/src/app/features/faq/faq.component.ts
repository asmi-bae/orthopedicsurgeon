import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule, MatButtonModule, TranslatePipe],
  template: `
    <div class="bg-white min-h-screen pt-24">
      <!-- Hero -->
      <section class="relative py-32 bg-secondary-900 overflow-hidden text-white -mx-6 sm:-mx-10 lg:-mx-12 px-6 sm:px-10 lg:px-12">
        <div class="app-container relative z-10 text-center">
          <h1 class="text-[10px] font-black text-primary uppercase tracking-[0.6em] mb-6 animate-in fade-in slide-in-from-bottom duration-700">{{ 'FAQ.HERO.SUBTITLE' | translate }}</h1>
          <h2 class="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-10 animate-in fade-in slide-in-from-bottom duration-1000">
            {{ 'FAQ.HERO.TITLE' | translate }}
          </h2>
          <p class="text-xl text-white/50 max-w-2xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
            {{ 'FAQ.HERO.DESCRIPTION' | translate }}
          </p>
        </div>
        <div class="absolute -left-20 -bottom-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
      </section>

      <!-- FAQ Content -->
      <section class="py-32">
        <div class="app-container max-w-4xl">
          <!-- Filter Categories (Visual only for now) -->
          <div class="flex flex-wrap gap-4 mb-20 justify-center">
            @for (cat of categories; track cat.key) {
              <button class="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300" 
                      [class.bg-secondary-900]="cat.key === 'GENERAL'" 
                      [class.text-white]="cat.key === 'GENERAL'"
                      [class.border-secondary-900]="cat.key === 'GENERAL'"
                      [class.border-gray-100]="cat.key !== 'GENERAL'"
                      [class.text-secondary-400]="cat.key !== 'GENERAL'"
                      [class.hover:bg-gray-50]="cat.key !== 'GENERAL'">
                {{ cat.labelKey | translate }}
              </button>
            }
          </div>

          <!-- Accordion -->
          <mat-accordion multi="true" class="premium-accordion">
            @for (item of faqs; track item.qKey) {
              <mat-expansion-panel class="mb-6 rounded-[32px] border border-gray-100 shadow-none overflow-hidden transition-all duration-300 hover:border-primary/30">
                <mat-expansion-panel-header class="h-24 px-10">
                  <mat-panel-title class="text-xl font-black text-secondary-900 uppercase tracking-tight">
                    {{ item.qKey | translate }}
                  </mat-panel-title>
                </mat-expansion-panel-header>
                <div class="px-10 pb-10">
                  <p class="text-lg text-secondary-500 font-medium leading-relaxed">
                    {{ item.aKey | translate }}
                  </p>
                </div>
              </mat-expansion-panel>
            }
          </mat-accordion>
          
          <!-- Still have questions? -->
          <div class="mt-32 p-16 rounded-[60px] bg-gray-50 border border-gray-100 text-center">
             <h4 class="text-3xl font-black text-secondary-900 uppercase tracking-tighter mb-6">Still have questions?</h4>
             <p class="text-secondary-500 font-medium mb-12 max-w-lg mx-auto">Our support team is active 24/7 for critical inquiries. Feel free to reach out via WhatsApp or our contact form.</p>
             <div class="flex flex-col sm:flex-row gap-6 justify-center">
                <a mat-flat-button color="primary" href="https://wa.me/8801711123456" class="h-16 px-12 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20">
                  WhatsApp Us
                </a>
                <a mat-stroked-button class="h-16 px-12 rounded-2xl font-black uppercase tracking-widest border-2 border-secondary-900" routerLink="/contact">
                  Contact Form
                </a>
             </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .premium-accordion ::ng-deep .mat-expansion-panel-header-title { color: #0f172a; }
    .premium-accordion ::ng-deep .mat-expansion-indicator::after { color: #3b82f6; border-width: 0 3px 3px 0; padding: 4px; }
    .premium-accordion ::ng-deep .mat-expansion-panel-body { padding: 0 !important; }
    .premium-accordion ::ng-deep .mat-expansion-panel { background: #fff !important; }
  `]
})
export class FaqComponent {
  categories = [
    { key: 'GENERAL', labelKey: 'FAQ.CATEGORIES.GENERAL' },
    { key: 'SURGERY', labelKey: 'FAQ.CATEGORIES.SURGERY' },
    { key: 'RECOVERY', labelKey: 'FAQ.CATEGORIES.RECOVERY' },
    { key: 'BILLING', labelKey: 'FAQ.CATEGORIES.BILLING' }
  ];

  faqs = [
    { qKey: 'FAQ.QUESTIONS.Q1', aKey: 'FAQ.QUESTIONS.A1' },
    { qKey: 'FAQ.QUESTIONS.Q2', aKey: 'FAQ.QUESTIONS.A2' },
    { qKey: 'FAQ.QUESTIONS.Q3', aKey: 'FAQ.QUESTIONS.A3' },
    { qKey: 'FAQ.QUESTIONS.Q4', aKey: 'FAQ.QUESTIONS.A4' },
    { qKey: 'FAQ.QUESTIONS.Q5', aKey: 'FAQ.QUESTIONS.A5' },
  ];
}
