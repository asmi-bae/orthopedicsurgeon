import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-home-gallery-preview',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe
  ],
  template: `
    <section class="py-24 bg-white overflow-hidden">
      <div class="app-container">
        <!-- Section Header -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div class="max-w-2xl animate-in fade-in slide-in-from-left duration-700">
            <div class="inline-flex items-center gap-3 mb-6">
              <div class="w-12 h-[1px] bg-primary"></div>
              <span class="text-[10px] font-black text-primary tracking-[0.4em] uppercase">{{ 'HOME.GALLERY_PREVIEW.SUBTITLE' | translate }}</span>
            </div>
            <h2 class="text-4xl md:text-5xl font-black text-secondary-900 tracking-tighter uppercase mb-6">
              {{ 'HOME.GALLERY_PREVIEW.TITLE' | translate }}
            </h2>
            <p class="text-secondary-500 font-medium leading-relaxed">
              {{ 'HOME.GALLERY_PREVIEW.DESCRIPTION' | translate }}
            </p>
          </div>
          <div class="animate-in fade-in slide-in-from-right duration-700">
            <a mat-stroked-button color="primary" routerLink="/gallery" class="h-14 px-8 rounded-2xl font-bold uppercase border-2">
              {{ 'HOME.GALLERY_PREVIEW.VIEW_ALL' | translate }}
              <mat-icon class="ml-2 scale-75">north_east</mat-icon>
            </a>
          </div>
        </div>

        <!-- Gallery Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let item of galleryItems; let i = index" 
               class="group relative aspect-[4/3] overflow-hidden rounded-[32px] bg-gray-100 animate-in fade-in zoom-in duration-700"
               [style.animation-delay]="i * 100 + 'ms'">
            <img [src]="item.image" [alt]="item.label | translate" 
                 class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
            
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <span class="text-[10px] font-black text-primary tracking-[0.3em] uppercase mb-2">{{ item.category | translate }}</span>
              <h4 class="text-xl font-bold text-white tracking-tight">{{ item.label | translate }}</h4>
            </div>

            <!-- Glass Badge (Always Visible Small) -->
            <div class="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl group-hover:opacity-0 transition-opacity duration-300">
               <span class="text-[9px] font-black text-white tracking-widest uppercase">{{ item.label | translate }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class GalleryPreviewComponent {
  galleryItems = [
    { 
      label: 'HOME.SERVICES.KNEE', 
      category: 'NAV.SERVICES',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118'
    },
    { 
      label: 'HOME.SERVICES.HIP', 
      category: 'NAV.SERVICES',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514'
    },
    { 
      label: 'HOME.SERVICES.FRACTURE', 
      category: 'NAV.SERVICES',
      image: 'https://images.unsplash.com/photo-1581056323862-99bd07728491'
    },
    { 
      label: 'HOME.SERVICES.ARTHROSCOPY', 
      category: 'NAV.SERVICES',
      image: 'https://images.unsplash.com/photo-1576091160550-2173be9997ad'
    },
    { 
      label: 'HOME.SERVICES.SPINE', 
      category: 'NAV.SERVICES',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc'
    },
    { 
      label: 'HOME.SERVICES.SPORTS', 
      category: 'NAV.SERVICES',
      image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8'
    }
  ];
}
