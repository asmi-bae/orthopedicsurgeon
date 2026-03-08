import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslationService, Language } from '@core/services/translation.service';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-emergency-bar',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslatePipe],
  template: `
    <!-- Emergency Top Bar -->
    <div 
      class="h-10 bg-secondary-900 border-b border-white/5 text-white fixed top-0 left-0 right-0 z-[1001] flex items-center transition-transform duration-200"
      [class.-translate-y-full]="isHidden()">
      <div class="app-container flex items-center justify-between px-4 sm:px-8">
        <!-- Top Bar -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <mat-icon class="text-primary text-sm scale-75">error</mat-icon>
            <span class="text-[9px] font-black uppercase tracking-[0.2em]">{{ 'COMMON.EMERGENCY' | translate }}</span>
            <span class="text-[9px] font-black uppercase tracking-[0.2em] text-primary underline underline-offset-4">+1 (800) 911-ORTHO</span>
          </div>
          <div class="hidden md:flex items-center gap-2 border-l border-white/10 pl-6">
            <mat-icon class="text-white/40 text-sm scale-75">location_on</mat-icon>
            <span class="text-[9px] font-bold uppercase tracking-widest text-white/40">{{ 'COMMON.LOCATION_HUB' | translate }}</span>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button 
            (click)="setLanguage('EN')"
            [class.active-lang]="currentLang() === 'EN'"
            class="lang-btn text-[9px] font-black uppercase tracking-widest transition-all duration-300">
            EN
          </button>
          <div class="w-[1px] h-3 bg-white/10"></div>
          <button 
            (click)="setLanguage('BN')"
            [class.active-lang]="currentLang() === 'BN'"
            class="lang-btn text-[9px] font-black uppercase tracking-widest transition-all duration-300">
            BN
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    
    .lang-btn {
      color: rgba(255, 255, 255, 0.4);
    }
    
    .lang-btn:hover {
      color: var(--primary-color, #f97316);
      transform: translateY(-1px);
    }
    
    .active-lang {
      color: var(--primary-color, #f97316) !important;
      text-shadow: 0 0 12px rgba(249, 115, 22, 0.3);
    }
  `]
})
export class EmergencyBarComponent {
  private translationService = inject(TranslationService);
  
  isHidden = input<boolean>(false);
  currentLang = this.translationService.currentLanguage;

  setLanguage(lang: string) {
    this.translationService.setLanguage(lang as Language);
  }
}
