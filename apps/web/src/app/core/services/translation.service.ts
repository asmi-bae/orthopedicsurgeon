import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
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

  translate(key: string): import('@angular/core').Signal<any> {
    return computed(() => {
      const keys = key.split('.');
      const currentLang = this.currentLanguage();
      const staticTranslations = this.translations[currentLang];
      const dynamicTranslations = this.dynamicTranslations()[currentLang] || {};
      
      let result: any = dynamicTranslations;
      let found = false;

      // Try dynamic first
      for (const k of keys) {
        if (result && result[k]) {
          result = result[k];
          found = true;
        } else {
          found = false;
          break;
        }
      }

      if (found) return result;

      // Fallback to static
      result = staticTranslations;
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

  private dynamicTranslations = signal<Record<Language, any>>({
    EN: {},
    BN: {}
  });

  async init(http: HttpClient) {
    const lang = this.currentLanguage();
    await this.loadTranslations(http, lang);
  }

  async loadTranslations(http: HttpClient, lang: Language) {
    try {
      const apiUrl = `${environment.apiUrl}/content/translations/${lang}`;
      const data = await firstValueFrom(http.get<Record<string, string>>(apiUrl));
      
      // Convert flat "KEY.SUBKEY" to nested object
      const nested: any = {};
      Object.keys(data).forEach(key => {
        const parts = key.split('.');
        let current = nested;
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          if (i === parts.length - 1) {
            current[part] = data[key];
          } else {
            current[part] = current[part] || {};
            current = current[part];
          }
        }
      });

      this.dynamicTranslations.update(prev => ({
        ...prev,
        [lang]: nested
      }));
    } catch (error) {
      console.error('Failed to load dynamic translations', error);
    }
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
