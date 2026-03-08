import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDarkMode = signal(false);

  constructor() {
    const saved = localStorage.getItem('admin-theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }
  }

  toggleTheme() {
    this.isDarkMode() ? this.setLightTheme() : this.setDarkTheme();
  }

  private setDarkTheme() {
    document.documentElement.classList.add('dark', 'dark-theme');
    localStorage.setItem('admin-theme', 'dark');
    this.isDarkMode.set(true);
  }

  private setLightTheme() {
    document.documentElement.classList.remove('dark', 'dark-theme');
    localStorage.setItem('admin-theme', 'light');
    this.isDarkMode.set(false);
  }
}
