import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AdminApiService } from '@core/services/admin-api.service';

@Component({
  selector: 'app-hero-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  template: `
    <div class="space-y-10 animate-fade-in pb-24 px-2">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-white/5 pb-10">
        <div class="flex items-center gap-6">
          <div class="w-16 h-16 bg-primary-600/20 rounded-2xl flex items-center justify-center border border-primary-500/30 shadow-2xl shadow-primary-500/10">
            <mat-icon class="text-primary-400 scale-[1.5]">view_carousel</mat-icon>
          </div>
          <div>
            <h1 class="text-4xl font-black text-white tracking-tighter italic uppercase leading-tight">Hero Matrix</h1>
            <div class="flex items-center gap-3 mt-1.5">
              <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
              <p class="text-primary-500 font-black text-[10px] uppercase tracking-[0.4em]">Initialize and orchestrate landing page vision nodes</p>
            </div>
          </div>
        </div>
        <button mat-flat-button color="primary" class="rounded-2xl h-14 px-10 font-black uppercase tracking-tighter italic shadow-2xl shadow-primary-500/20 premium-border bg-primary-600 hover:bg-primary-500 transition-all shrink-0">
           Sync New Slide
        </button>
      </div>

      <mat-progress-bar *ngIf="loading()" mode="query" color="primary" class="h-1 rounded-full"></mat-progress-bar>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-10 animate-slide-up">
        <mat-card *ngFor="let slide of slides()" class="bg-white/[0.01] border border-white/5 rounded-[40px] overflow-hidden glass group hover:border-primary-500/30 transition-all duration-700 shadow-2xl">
           <div class="relative h-80 overflow-hidden">
              <img [src]="slide.imageUrl" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100" />
              <div class="absolute inset-0 bg-gradient-to-t from-secondary-950 via-secondary-950/40 to-transparent"></div>
              
              <div class="absolute top-8 left-8 flex items-center gap-3">
                 <span class="px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl text-[9px] font-black text-white uppercase tracking-[0.2em]">Matrix Pos: {{ slide.displayOrder }}</span>
                 <span [class]="slide.isActive ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-white/5 text-white/30 border-white/10'" 
                       class="px-4 py-1.5 backdrop-blur-xl border rounded-xl text-[9px] font-black uppercase tracking-[0.2em]">
                    {{ slide.isActive ? 'OPERATIONAL' : 'OFFLINE' }}
                 </span>
              </div>

              <div class="absolute top-8 right-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                 <button mat-icon-button class="w-12 h-12 bg-white/10 backdrop-blur-2xl border border-white/10 text-white hover:bg-primary-500/20 hover:text-primary-400 hover:border-primary-500/30 transition-all rounded-2xl">
                   <mat-icon class="scale-90">edit</mat-icon>
                 </button>
                 <button mat-icon-button (click)="deleteSlide(slide.id)" class="w-12 h-12 bg-white/10 backdrop-blur-2xl border border-white/10 text-white hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all rounded-2xl">
                   <mat-icon class="scale-90">delete</mat-icon>
                 </button>
              </div>

              <div class="absolute bottom-8 left-8 right-8">
                 <h3 class="text-3xl font-black text-white tracking-tighter italic uppercase leading-none drop-shadow-2xl">{{ slide.title }}</h3>
                 <p class="text-primary-400 font-black text-[10px] uppercase tracking-[0.4em] mt-3 italic drop-shadow-md">{{ slide.subtitle }}</p>
              </div>
           </div>
           
           <div class="p-10">
              <p class="text-sm text-white/40 leading-relaxed font-medium mb-8 group-hover:text-white/60 transition-colors">{{ slide.description }}</p>
              
              <div class="flex items-center justify-between border-t border-white/5 pt-8">
                 <div class="flex items-center gap-5">
                    <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                       <mat-icon class="text-white/20 scale-75">ads_click</mat-icon>
                    </div>
                    <div class="flex flex-col">
                       <span class="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Interactive Call</span>
                       <span class="text-xs font-black text-white uppercase italic tracking-tighter">{{ slide.buttonText }}</span>
                    </div>
                 </div>
                 <div class="w-12 h-12 rounded-2xl bg-primary-500/5 border border-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 group-hover:border-primary-500/30 transition-all">
                    <mat-icon class="text-primary-400 scale-75 group-hover:translate-x-0.5 transition-transform">arrow_forward_ios</mat-icon>
                 </div>
              </div>
           </div>
        </mat-card>

        <div *ngIf="slides().length === 0 && !loading()" class="xl:col-span-2 py-48 text-center bg-white/[0.01] border border-dashed border-white/10 rounded-[40px] animate-pulse">
           <mat-icon class="text-white/5 scale-[5] mb-14">view_carousel</mat-icon>
           <p class="text-white/20 font-black uppercase tracking-[0.6em] text-[10px]">No vision nodes detected in hero matrix</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .glass { backdrop-filter: blur(40px); }
  `]
})
export class HeroManagementComponent implements OnInit {
  private api = inject(AdminApiService);
  
  slides = signal<any[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.loadSlides();
  }

  loadSlides() {
    this.loading.set(true);
    this.api.getHeroSlides().subscribe({
      next: (res) => {
        this.slides.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load hero slides', err);
        this.loading.set(false);
      }
    });
  }

  deleteSlide(id: string) {
    if (confirm('Confirm vision node decommissioning?')) {
      this.api.deleteHeroSlide(id).subscribe(() => this.loadSlides());
    }
  }
}
