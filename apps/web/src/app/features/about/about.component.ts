import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="bg-white min-h-screen">
      <!-- Hero -->
      <section class="relative py-24 bg-secondary-900 overflow-hidden text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 class="text-xs font-black text-primary uppercase tracking-[0.5em] mb-4">Our Methodology</h1>
          <h2 class="text-6xl font-black tracking-tighter uppercase leading-none mb-8">
            Engineering <br/><span class="text-primary tracking-normal">Human Mobility</span>
          </h2>
          <p class="text-lg text-white/60 max-w-2xl font-medium leading-relaxed">
            OrthoSync is at the intersection of clinical excellence and technological innovation, redefined for the modern orthopedic patient.
          </p>
        </div>
      </section>

      <!-- Mission -->
      <section class="py-32 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h3 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-6">The Mission</h3>
              <h4 class="text-4xl font-black text-secondary-900 uppercase tracking-tight mb-8">Restoring Function <br/>Through Precision</h4>
              <p class="text-lg text-secondary-600 font-medium leading-relaxed mb-10">
                Our objective is simple: to provide a seamless, technologically advanced path from diagnosis to full functional restoration. We believe that every patient deserves a tailored recovery protocol backed by data and executed by specialists.
              </p>
              <div class="grid grid-cols-2 gap-8">
                 <div>
                    <p class="text-3xl font-black text-primary mb-2">98%</p>
                    <p class="text-[10px] font-black uppercase tracking-widest text-secondary-400">Success Rate</p>
                 </div>
                 <div>
                    <p class="text-3xl font-black text-primary mb-2">15k+</p>
                    <p class="text-[10px] font-black uppercase tracking-widest text-secondary-400">Procedures</p>
                 </div>
              </div>
            </div>
            <div class="relative">
               <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" class="rounded-[40px] shadow-2xl grayscale" />
               <div class="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class AboutComponent {}
