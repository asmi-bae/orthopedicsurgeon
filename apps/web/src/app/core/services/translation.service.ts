import { Injectable, signal, computed } from '@angular/core';
import { EN } from '../i18n/en';
import { BN } from '../i18n/bn';

export type Language = 'EN' | 'BN';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLanguage = signal<Language>(this.getInitialLanguage());
  
  private translations: Record<Language, any> = {
    EN,
    BN
  };

  private getInitialLanguage(): Language {
    const savedLang = this.getCookie('lang') as Language;
    return (savedLang === 'EN' || savedLang === 'BN') ? savedLang : 'EN';
  }

  translate(key: string): import('@angular/core').Signal<string> {
    return computed(() => {
      const keys = key.split('.');
      let result = this.translations[this.currentLanguage()];
      
      for (const k of keys) {
        if (result && result[k]) {
          result = result[k];
        } else {
          return key; // Fallback to key if not found
        }
      }
      
      return result;
    });
  }

  setLanguage(lang: Language) {
    this.currentLanguage.set(lang);
    this.setCookie('lang', lang, 365);
  }

  private setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
}
