import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { PublicApiService } from '@core/services/public-api.service';
import { HospitalSummary } from '@repo/types';

@Component({
  selector: 'app-hospital-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule,
    MatDividerModule
  ],
  template: `
    <div class="bg-gray-50 min-h-screen">
      <!-- Header -->
      <section class="relative py-24 bg-secondary-900 overflow-hidden text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 class="text-xs font-black text-primary uppercase tracking-[0.5em] mb-4">Strategic Assets</h1>
          <h2 class="text-6xl font-black tracking-tighter uppercase leading-none mb-8">
            Partner <br/><span class="text-primary tracking-normal">Medical Facilities</span>
          </h2>
          <p class="text-lg text-white/60 max-w-2xl font-medium leading-relaxed">
            Explore our network of state-of-the-art clinical hubs and specialized hospitals designed for orthopedic excellence and patient restoration.
          </p>
        </div>
        <div class="absolute right-0 top-0 w-1/3 h-full bg-primary/5 -skew-x-12"></div>
      </section>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          @for (hospital of hospitals(); track hospital.id) {
            <mat-card class="rounded-[40px] border border-gray-100 shadow-none overflow-hidden hover:shadow-2xl transition-all duration-700 bg-white group">
              <div class="h-64 relative overflow-hidden bg-gray-200">
                 <img [src]="'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'" class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                 <div class="absolute inset-0 bg-secondary-900/10"></div>
                 <div class="absolute top-6 left-6">
                   <div class="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center shadow-lg">
                     <mat-icon>apartment</mat-icon>
                   </div>
                 </div>
              </div>

              <div class="p-10">
                <div class="flex justify-between items-start mb-6">
                  <div>
                    <h3 class="text-2xl font-black text-secondary-900 uppercase tracking-tight mb-2">{{ hospital.name }}</h3>
                    <div class="flex items-center gap-2 text-primary">
                      <mat-icon class="scale-75">location_on</mat-icon>
                      <span class="text-[10px] font-black uppercase tracking-widest">{{ hospital.city }}</span>
                    </div>
                  </div>
                  <mat-chip class="premium-badge">Active</mat-chip>
                </div>

                <p class="text-secondary-600 text-sm leading-relaxed mb-10 font-medium">Standard of excellence in patient care and clinical innovation across the orthopedic spectrum.</p>

                <div class="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between mb-10">
                   <div class="text-[9px] font-black uppercase tracking-widest text-secondary-400">Node Status</div>
                   <div class="flex items-center gap-2">
                      <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span class="text-xs font-black text-green-600 uppercase tracking-tighter">Open 24/7</span>
                   </div>
                </div>

                <div class="flex gap-4">
                  <a mat-flat-button color="primary" [routerLink]="['/doctors']" [queryParams]="{ hospitalId: hospital.id }" 
                     class="h-14 px-8 rounded-xl font-bold uppercase w-full shadow-xl shadow-primary/20">
                    Access Specialists
                  </a>
                </div>
              </div>
            </mat-card>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .premium-badge { background: #dcfce7 !important; color: #166534 !important; font-size: 8px !important; font-weight: 900 !important; text-transform: uppercase !important; letter-spacing: 0.1em !important; height: 28px !important; border: none !important; }
  `]
})
export class HospitalListComponent {
  private api = inject(PublicApiService);
  hospitals = signal<HospitalSummary[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.api.getHospitals().subscribe({
      next: (res) => {
        this.hospitals.set(res.data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
