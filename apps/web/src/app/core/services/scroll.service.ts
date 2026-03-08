import { Injectable, signal } from '@angular/core';

export type ScrollDirection = 'up' | 'down' | 'none';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
  
  scrollDirection = signal<ScrollDirection>('none');
  currentScrollY = signal<number>(this.lastScrollY);

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        const currentY = window.scrollY;
        
        if (currentY > this.lastScrollY && currentY > 5) {
          this.scrollDirection.set('up');
        } else if (currentY < this.lastScrollY) {
          this.scrollDirection.set('down');
        } else if (currentY <= 0) {
          this.scrollDirection.set('none');
        }
        
        this.lastScrollY = currentY;
        this.currentScrollY.set(currentY);
      }, { passive: true });
    }
  }
}
