import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-home-virtual-tour',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe
  ],
  template: `
    <section class="py-32 bg-secondary-900 relative overflow-hidden group text-center -mx-6 sm:-mx-10 lg:-mx-12">
        <!-- Background Image/Video Placeholder -->
        <div class="absolute inset-0 opacity-20 transition-transform duration-1000 group-hover:scale-110">
           <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" class="w-full h-full object-cover grayscale" />
        </div>

        <!-- Top/Bottom Soft Transitions -->
        <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10 opacity-10"></div>
        <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10 opacity-10"></div>
        
        <div class="app-container flex flex-col items-center relative z-20">
          <div class="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-8 border border-primary/30 animate-pulse cursor-pointer hover:scale-110 transition-transform" (click)="active.set(true)">
             <mat-icon class="text-primary scale-[2]">play_arrow</mat-icon>
          </div>
          <h2 class="text-xs font-black text-primary uppercase tracking-[0.5em] mb-6">{{ 'HOME.VIRTUAL_TOUR.SUBTITLE' | translate }}</h2>
          <h3 class="text-5xl font-black text-white tracking-tighter uppercase mb-10">{{ 'HOME.VIRTUAL_TOUR.TITLE' | translate }}</h3>
          <a mat-flat-button color="primary" routerLink="/gallery" class="h-16 px-12 rounded-2xl text-lg font-bold uppercase shadow-2xl shadow-primary/30">
            {{ 'HOME.VIRTUAL_TOUR.ACTION' | translate }}
          </a>
       </div>

       <!-- Virtual Tour Overlay Simulation -->
       <div *ngIf="active()" class="fixed inset-0 z-[100] bg-secondary-900 flex items-center justify-center animate-in fade-in zoom-in duration-500">
          <button (click)="active.set(false)" class="absolute top-10 right-10 text-white hover:text-primary transition-colors">
             <mat-icon class="scale-[2]">close</mat-icon>
          </button>
          <div class="text-center">
             <div class="max-w-4xl mx-auto rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/10 relative">
                <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1200" class="w-full" />
                <div class="absolute inset-0 bg-secondary-900/40 backdrop-blur-[2px] flex items-center justify-center">
                   <div class="bg-white/10 p-10 rounded-3xl border border-white/20">
                      <h4 class="text-white font-black uppercase text-2xl mb-4">Interactive protocol loading...</h4>
                      <p class="text-white/60 font-medium">Please visit our specialized facility for a complete immersive experience.</p>
                   </div>
                </div>
             </div>
          </div>
       </div>

       <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
       <div class="absolute -right-20 -top-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"></div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class VirtualTourComponent {
  active = signal(false);
}
