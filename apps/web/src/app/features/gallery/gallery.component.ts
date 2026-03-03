import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <div class="bg-white min-h-screen">
      <!-- Hero -->
      <section class="relative py-24 bg-secondary-900 overflow-hidden text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 class="text-xs font-black text-primary uppercase tracking-[0.5em] mb-4">Visual Tour</h1>
          <h2 class="text-6xl font-black tracking-tighter uppercase mb-8">Clinical Architecture <br/>& Facilities</h2>
          <p class="text-lg text-white/60 max-w-2xl font-medium leading-relaxed">
            A visual overview of our state-of-the-art diagnostic suites, surgical theaters, and patient recovery zones.
          </p>
        </div>
      </section>

      <!-- Grid -->
      <section class="py-32 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (item of galleryItems; track item.title) {
              <mat-card class="rounded-[40px] border border-gray-100 shadow-none overflow-hidden group bg-gray-50">
                 <div class="aspect-square relative overflow-hidden">
                   <img [src]="item.image" class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                   <div class="absolute inset-0 bg-secondary-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <div class="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                      <div class="bg-white/90 backdrop-blur px-6 py-3 rounded-2xl shadow-xl">
                         <p class="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{{item.category}}</p>
                         <p class="text-lg font-black text-secondary-900 uppercase tracking-tight">{{item.title}}</p>
                      </div>
                   </div>
                 </div>
              </mat-card>
            }
          </div>
        </div>
      </section>

      <!-- Virtual Tour CTA -->
      <section class="py-24 bg-secondary-900 flex items-center justify-center overflow-hidden relative text-center">
        <div class="text-center z-10">
          <h3 class="text-4xl font-black text-white tracking-tighter uppercase mb-10">Launch Full Virtual <br/>Facility Scan</h3>
          <button mat-flat-button color="primary" class="h-16 px-12 rounded-2xl text-lg font-bold uppercase shadow-2xl shadow-primary/30">
            Initialize Tour
          </button>
        </div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 rounded-full blur-[100px] -z-0"></div>
      </section>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class GalleryComponent {
  galleryItems = [
    { title: 'Robotic Surgery Suite', category: 'Surgical', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800' },
    { title: 'Advanced MRI Core', category: 'Diagnostics', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800' },
    { title: 'Post-Op Recovery Zone', category: 'Patient Care', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800' },
    { title: 'Rehab & Physio Lab', category: 'Rehabilitation', image: 'https://images.unsplash.com/photo-1571019623518-e71de96e28da?auto=format&fit=crop&q=80&w=800' },
    { title: 'Executive Patient Lounge', category: 'Hospitality', image: 'https://images.unsplash.com/photo-1517120026326-d87759a7b63b?auto=format&fit=crop&q=80&w=800' },
    { title: 'Clinical Testing Wing', category: 'Laboratory', image: 'https://images.unsplash.com/photo-1579154273821-ad99159a5966?auto=format&fit=crop&q=80&w=800' },
  ];
}
